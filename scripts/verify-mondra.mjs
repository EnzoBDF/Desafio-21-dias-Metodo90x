import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = fs.readFileSync(new URL("../app/jogo/game.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { INITIAL, reducer, findPath, canWalk, isWater, isGrass, maxHp, CREATURES, HOME, GUARDIAN, DELTAS } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const start = () => reducer(INITIAL, { type: "LOAD", data: null });
function go(state, point) {
  for (const direction of findPath(state.position, point)) state = reducer(state, { type: "MOVE", direction, random: 1 });
  assert.deepEqual(state.position, point);
  return state;
}
function wild(state, id) {
  const target = id === 0 || id === 3 ? { x: 8, y: 14 } : id === 1 || id === 4 ? { x: 21, y: 11 } : { x: 15, y: 6 };
  state = go(state, target);
  for (let i = 0; i < 30; i++) {
    const desiredParity = [0, 1, 2].includes(id) ? 0 : 1;
    state = reducer(state, { type: "MOVE", direction: i % 2 ? "left" : "right", random: (state.steps + 1) % 2 === desiredParity ? 0 : 1 });
    if (state.battle?.foe.id === id) return state;
    if (state.battle) { state = reducer(state, { type: "RUN" }); state = reducer(state, { type: "CLOSE_BATTLE" }); }
  }
  throw new Error(`Could not encounter species ${id}`);
}

test("all habitat patches, support house, and guardian can be reached without crossing walls or water", () => {
  for (const point of [{ x: 8, y: 14 }, { x: 21, y: 11 }, { x: 15, y: 6 }, HOME, { x: GUARDIAN.x - 1, y: GUARDIAN.y }]) {
    const path = findPath(INITIAL.position, point);
    assert.ok(path.length);
    let p = INITIAL.position;
    for (const dir of path) { p = { x: p.x + DELTAS[dir].x, y: p.y + DELTAS[dir].y }; assert.ok(canWalk(p.x, p.y)); assert.ok(!isWater(p.x, p.y)); }
    assert.deepEqual(p, point);
  }
  assert.deepEqual(findPath(INITIAL.position, { x: 20, y: 5 }), []);
  assert.deepEqual(findPath(INITIAL.position, { x: -1, y: 8 }), []);
});

test("complete adventure: discover all six species, win the guardian badge, and restore saved progress", () => {
  let s = start();
  for (const id of [3, 1, 4, 2, 5]) {
    s = wild(s, id);
    const orbs = s.orbs;
    s = reducer(s, { type: "CAPTURE", random: 0 });
    assert.equal(s.orbs, orbs - 1);
    s = reducer(s, { type: "RESOLVE", random: 0 });
    assert.equal(s.battle.phase, "caught");
    s = reducer(s, { type: "CLOSE_BATTLE" });
  }
  assert.equal(s.team.length, CREATURES.length);
  s = go(s, { x: GUARDIAN.x - 1, y: GUARDIAN.y });
  s = reducer(s, { type: "INTERACT" });
  assert.equal(s.battle.boss, true);
  assert.equal(reducer(s, { type: "CAPTURE", random: 0 }), s);
  for (let i = 0; i < 50 && s.battle.phase !== "won"; i++) {
    s = reducer(s, { type: "ATTACK", special: true, random: 0.5 });
    s = reducer(s, { type: "RESOLVE", random: 0.1 });
    s = reducer(s, { type: "RESOLVE", random: 0.1 });
  }
  assert.equal(s.battle.phase, "won"); assert.equal(s.badge, true);
  s = reducer(s, { type: "CLOSE_BATTLE" });
  const restored = reducer(INITIAL, { type: "LOAD", data: JSON.parse(JSON.stringify(s)) });
  assert.equal(restored.team.length, 6); assert.equal(restored.badge, true); assert.equal(restored.orbs, s.orbs);
});

test("capture chance increases when weakened; failed capture permits exactly one enemy turn", () => {
  let s = wild(start(), 3);
  s = reducer(s, { type: "CAPTURE", random: 0.7 });
  assert.equal(s.battle.captureSuccess, false);
  const duringCapture = s;
  assert.equal(reducer(s, { type: "CAPTURE", random: 0 }), duringCapture);
  assert.equal(reducer(s, { type: "ATTACK", special: false, random: 0 }), duringCapture);
  s = reducer(s, { type: "RESOLVE", random: 0.1 });
  const hp = s.team[s.active].hp;
  s = reducer(s, { type: "RESOLVE", random: 0.1 });
  assert.equal(s.battle.phase, "ready"); assert.equal(s.team[s.active].hp, hp);
  s = { ...s, battle: { ...s.battle, foe: { ...s.battle.foe, hp: 1 } } };
  s = reducer(s, { type: "CAPTURE", random: 0.7 });
  s = reducer(s, { type: "RESOLVE", random: 0.1 });
  assert.equal(s.battle.phase, "caught");
});

test("knockout awards experience and cannot become a capture or repeated reward", () => {
  let s = wild(start(), 3);
  s = { ...s, battle: { ...s.battle, foe: { ...s.battle.foe, hp: 1 } } };
  s = reducer(s, { type: "ATTACK", special: false, random: 0 });
  s = reducer(s, { type: "RESOLVE", random: 0 });
  assert.equal(s.battle.phase, "won"); assert.equal(s.team.length, 1); assert.equal(s.team[0].xp, 35);
  assert.equal(reducer(s, { type: "RESOLVE", random: 0 }), s);
  assert.equal(reducer(s, { type: "CAPTURE", random: 0 }), s);
});

test("defeat recovers the party; support house refills consumables; healing never exceeds max HP", () => {
  let s = wild(start(), 3);
  s = { ...s, team: [{ ...s.team[0], hp: 1 }] };
  s = reducer(s, { type: "ATTACK", special: false, random: 0 });
  s = reducer(s, { type: "RESOLVE", random: 0.9 });
  s = reducer(s, { type: "RESOLVE", random: 0 });
  assert.equal(s.battle.phase, "lost");
  s = reducer(s, { type: "CLOSE_BATTLE" });
  assert.deepEqual(s.position, HOME); assert.equal(s.team[0].hp, maxHp(s.team[0].level));
  s = { ...s, orbs: 0, potions: 0 };
  s = reducer(s, { type: "INTERACT" });
  assert.equal(s.orbs, 12); assert.equal(s.potions, 4);
  assert.equal(reducer(s, { type: "HEAL" }), s);
  s = { ...s, team: [{ ...s.team[0], hp: s.team[0].hp - 3 }] };
  s = reducer(s, { type: "HEAL" });
  assert.equal(s.potions, 3); assert.equal(s.team[0].hp, maxHp(s.team[0].level));
});

test("invalid or tampered saves recover safely and storage errors are idempotent", () => {
  for (const data of [null, "broken", {}, { ...INITIAL, team: [{ id: 80 }] }, { ...INITIAL, orbs: -1 }, { ...INITIAL, active: 50 }]) assert.deepEqual(reducer(INITIAL, { type: "LOAD", data }).team, INITIAL.team);
  const s = reducer(start(), { type: "SAVE_ERROR" });
  assert.equal(s.saveError, true); assert.equal(reducer(s, { type: "SAVE_ERROR" }), s);
  const p = reducer(INITIAL, { type: "LOAD", data: { ...INITIAL, position: { x: 20, y: 5 } } });
  assert.ok(canWalk(p.position.x, p.position.y));
});

test("encounters only happen in grass; exploration is locked during combat", () => {
  let s = start();
  s = go(s, { x: 17, y: 10 });
  assert.equal(s.battle, null); assert.equal(isGrass(s.position.x, s.position.y), false);
  s = wild(s, 1);
  assert.equal(reducer(s, { type: "MOVE", direction: "down", random: 0 }), s);
  assert.equal(reducer(s, { type: "INTERACT" }), s);
});
