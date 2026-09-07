export type Element = "Folha" | "Fogo" | "Água" | "Luz" | "Pedra" | "Raio";
export type Direction = "up" | "down" | "left" | "right";
export type Point = { x: number; y: number };
export type Creature = { id: number; name: string; element: Element; color: string; move: string; description: string; habitat: string };
export const CREATURES: Creature[] = [
  { id: 0, name: "Folhito", element: "Folha", color: "#a1d88b", move: "Folha cortante", description: "Suas orelhas se abrem ao sol. Onde ele cochila, pequenas folhas começam a brotar.", habitat: "Prado do sul" },
  { id: 1, name: "Fagulha", element: "Fogo", color: "#ffa473", move: "Brasa viva", description: "Guarda uma pequena chama na cauda e adora aquecer os viajantes nas noites frias.", habitat: "Clareira do leste" },
  { id: 2, name: "Marolim", element: "Água", color: "#89d8eb", move: "Jato de água", description: "Segue o som dos riachos. Suas pequenas nadadeiras percebem até a chuva mais distante.", habitat: "Margem do lago" },
  { id: 3, name: "Lumina", element: "Luz", color: "#c5a0f0", move: "Pó de estrelas", description: "Uma mariposa que coleciona a luz do dia para iluminar os caminhos ao anoitecer.", habitat: "Prado do sul" },
  { id: 4, name: "Cascalho", element: "Pedra", color: "#d9bc91", move: "Rolamento", description: "Parece uma pedrinha quando se enrola. É tímido, mas nunca abandona um amigo.", habitat: "Clareira do leste" },
  { id: 5, name: "Voltico", element: "Raio", color: "#f2d976", move: "Faísca", description: "Bate as asinhas para criar eletricidade. Seus espirros acendem os vaga-lumes do vale.", habitat: "Margem do lago" },
];
export const WIDTH = 30;
export const HEIGHT = 20;
export const TILE = 32;
export const HOME = { x: 8, y: 9 };
export const GUIDE = { x: 12, y: 9 };
export const GUARDIAN = { x: 25, y: 15 };
export const TREES: Point[] = [
  ...Array.from({ length: 15 }, (_, i) => ({ x: i * 2, y: 1 })),
  ...Array.from({ length: 15 }, (_, i) => ({ x: i * 2, y: 19 })),
  ...Array.from({ length: 8 }, (_, i) => ({ x: 0, y: i * 2 + 3 })),
  ...Array.from({ length: 8 }, (_, i) => ({ x: 29, y: i * 2 + 3 })),
  { x: 3, y: 5 }, { x: 5, y: 4 }, { x: 13, y: 4 }, { x: 15, y: 3 },
  { x: 3, y: 13 }, { x: 4, y: 16 }, { x: 16, y: 16 }, { x: 17, y: 18 },
  { x: 26, y: 4 }, { x: 27, y: 6 }, { x: 26, y: 11 }, { x: 28, y: 12 },
];
export function isWater(x: number, y: number) {
  return x >= 18 && x <= 24 && y >= 2 && y <= 8 && !(x === 18 && y === 8) && !(x === 24 && y === 2);
}
export function isGrass(x: number, y: number) {
  return (x >= 7 && x <= 13 && y >= 13 && y <= 17) || (x >= 20 && x <= 25 && y >= 10 && y <= 12) || (x >= 14 && x <= 17 && y >= 5 && y <= 7);
}
export function isPath(x: number, y: number) {
  return (y >= 9 && y <= 10 && x >= 5 && x <= 26) || (x >= 9 && x <= 10 && y >= 7 && y <= 18) || (x >= 23 && x <= 24 && y >= 9 && y <= 16);
}
export function canWalk(x: number, y: number) {
  return x > 1 && x < 28 && y > 2 && y < 19 && !isWater(x, y) && !TREES.some(t => Math.abs(t.x - x) < 1 && Math.abs(t.y - y) < 1) && !(x >= 5 && x <= 8 && y >= 5 && y <= 7) && !(x === GUIDE.x && y === GUIDE.y) && !(x === GUARDIAN.x && y === GUARDIAN.y);
}
export function nearby(a: Point, b: Point) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) <= 2; }
export const DELTAS: Record<Direction, Point> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
export function findPath(start: Point, target: Point): Direction[] {
  if (!canWalk(target.x, target.y)) return [];
  const queue: { point: Point; path: Direction[] }[] = [{ point: start, path: [] }];
  const seen = new Set([`${start.x},${start.y}`]);
  for (let i = 0; i < queue.length; i++) {
    const { point, path } = queue[i];
    if (point.x === target.x && point.y === target.y) return path;
    for (const dir of Object.keys(DELTAS) as Direction[]) {
      const p = { x: point.x + DELTAS[dir].x, y: point.y + DELTAS[dir].y };
      const key = `${p.x},${p.y}`;
      if (!seen.has(key) && canWalk(p.x, p.y)) { seen.add(key); queue.push({ point: p, path: [...path, dir] }); }
    }
  }
  return [];
}
export type Companion = { id: number; hp: number; level: number; xp: number };
export const maxHp = (level: number) => 38 + level * 6;
export type Battle = { foe: Companion; maxHp: number; boss: boolean; phase: "ready" | "attack" | "capture" | "enemy" | "won" | "caught" | "lost" | "escaped"; text: string; effect: string; captureSuccess?: boolean };
export type GameState = { position: Point; facing: Direction; steps: number; team: Companion[]; active: number; orbs: number; potions: number; wins: number; badge: boolean; battle: Battle | null; notice: string; loaded: boolean; saveError: boolean };
export const INITIAL: GameState = { position: { x: 10, y: 10 }, facing: "down", steps: 0, team: [{ id: 0, hp: maxHp(5), level: 5, xp: 0 }], active: 0, orbs: 12, potions: 4, wins: 0, badge: false, battle: null, notice: "Bem-vindo ao vale! Explore a grama alta para encontrar criaturas.", loaded: false, saveError: false };
export type Action = { type: "LOAD"; data: unknown } | { type: "SAVE_ERROR" } | { type: "MOVE"; direction: Direction; random: number } | { type: "INTERACT" } | { type: "ATTACK"; special: boolean; random: number } | { type: "CAPTURE"; random: number } | { type: "RESOLVE"; random: number } | { type: "RUN" } | { type: "CLOSE_BATTLE" } | { type: "HEAL" } | { type: "SWITCH"; index: number } | { type: "NOTICE"; text: string } | { type: "RESET" };
const updateActive = (state: GameState, fn: (c: Companion) => Companion) => state.team.map((c, i) => i === state.active ? fn(c) : c);
export function effectiveness(attack: Element, defense: Element) {
  const strong: Partial<Record<Element, Element[]>> = { Folha: ["Água", "Pedra"], Fogo: ["Folha", "Luz"], Água: ["Fogo", "Pedra"], Pedra: ["Raio"], Raio: ["Água", "Luz"], Luz: ["Pedra"] };
  return strong[attack]?.includes(defense) ? 1.5 : strong[defense]?.includes(attack) ? 0.75 : 1;
}
function encounter(state: GameState, id: number, boss = false): GameState {
  const level = boss ? 9 : 3 + ((state.steps + id) % 4);
  return { ...state, battle: { foe: { id, hp: maxHp(level), level, xp: 0 }, maxHp: maxHp(level), boss, phase: "ready", text: boss ? "O guardião do vale desafia você!" : `Um ${CREATURES[id].name} selvagem apareceu!`, effect: "" } };
}
function reward(state: GameState, caught: boolean): GameState {
  const battle = state.battle!;
  let team = updateActive(state, c => { const xp = c.xp + (battle.boss ? 75 : 35); const level = Math.min(100, c.level + Math.floor(xp / 70)); return { ...c, xp: xp % 70, level, hp: Math.min(maxHp(level), c.hp + (level > c.level ? 16 : 0)) }; });
  const isNew = caught && !team.some(c => c.id === battle.foe.id);
  if (isNew) team = [...team, { ...battle.foe, hp: battle.maxHp }];
  const completed = team.length === 6;
  const text = caught ? `${CREATURES[battle.foe.id].name} capturado! ${isNew ? "Um novo amigo para sua equipe." : "Seu amigo já estava no diário. +2 cápsulas de pesquisa."}${completed ? " Você encontrou todas as criaturas do vale!" : ""}` : battle.boss ? "Você conquistou a Insígnia do Vale! A aventura continua." : "Vitória! +35 EXP e +2 cápsulas. Continue explorando!";
  return { ...state, team, wins: state.wins + 1, orbs: state.orbs + (caught && isNew ? 0 : 2), badge: state.badge || battle.boss, battle: { ...battle, phase: caught ? "caught" : "won", text, effect: "" } };
}
function validSave(data: unknown): Partial<GameState> | null {
  if (!data || typeof data !== "object") return null;
  const s = data as GameState;
  if (!Array.isArray(s.team) || !s.team.length || s.team.length > 6 || !s.team.every(c => c && Number.isInteger(c.id) && c.id >= 0 && c.id < 6 && Number.isInteger(c.level) && c.level >= 1 && c.level <= 100 && Number.isFinite(c.hp) && c.hp >= 0 && c.hp <= maxHp(c.level) && Number.isFinite(c.xp) && c.xp >= 0 && c.xp < 70) || new Set(s.team.map(c => c.id)).size !== s.team.length) return null;
  if (![s.orbs, s.potions, s.wins, s.steps, s.active].every(n => Number.isSafeInteger(n) && n >= 0) || s.active >= s.team.length || typeof s.badge !== "boolean") return null;
  const position = s.position && Number.isInteger(s.position.x) && Number.isInteger(s.position.y) && canWalk(s.position.x, s.position.y) ? s.position : INITIAL.position;
  const conscious = s.team.findIndex(c => c.hp > 0);
  const team = conscious === -1 ? s.team.map(c => ({ ...c, hp: maxHp(c.level) })) : s.team;
  return { team, active: s.team[s.active].hp > 0 || conscious === -1 ? s.active : conscious, position: conscious === -1 ? HOME : position, orbs: s.orbs, potions: s.potions, wins: s.wins, steps: s.steps, badge: s.badge };
}
export function reducer(state: GameState, action: Action): GameState {
  const battle = state.battle;
  const active = state.team[state.active];
  switch (action.type) {
    case "LOAD": return { ...INITIAL, ...validSave(action.data), loaded: true };
    case "SAVE_ERROR": return state.saveError ? state : { ...state, saveError: true };
    case "RESET": return { ...INITIAL, loaded: true };
    case "NOTICE": return { ...state, notice: action.text };
    case "MOVE": {
      if (battle || !state.loaded) return state;
      const d = DELTAS[action.direction];
      const position = { x: state.position.x + d.x, y: state.position.y + d.y };
      if (!canWalk(position.x, position.y)) return { ...state, facing: action.direction };
      const moved = { ...state, position, facing: action.direction, steps: state.steps + 1 };
      if (isGrass(position.x, position.y) && moved.steps > 3 && action.random < 0.19) {
        const ids = position.y >= 13 ? [0, 3] : position.x >= 20 ? [1, 4] : [2, 5];
        return encounter(moved, ids[moved.steps % 2]);
      }
      return moved;
    }
    case "INTERACT": {
      if (battle) return state;
      if (nearby(state.position, HOME)) return { ...state, team: state.team.map(c => ({ ...c, hp: maxHp(c.level) })), orbs: Math.max(12, state.orbs), potions: Math.max(4, state.potions), notice: "Equipe recuperada! A casa de apoio reabasteceu suas cápsulas e poções." };
      if (nearby(state.position, GUIDE)) return { ...state, notice: "Lia: encontre criaturas diferentes nos três gramados. Enfraqueça antes de capturar! Com 3 amigos, desafie o guardião a sudeste." };
      if (nearby(state.position, GUARDIAN)) return state.team.length < 3 ? { ...state, notice: "Guardião: faça amizade com 3 espécies do vale e volte para o nosso desafio!" } : encounter(state, 5, true);
      return { ...state, notice: "Entre na grama alta para encontrar criaturas. Aproxime-se da casa ou de um explorador e pressione E." };
    }
    case "ATTACK": {
      if (!battle || battle.phase !== "ready") return state;
      const multiplier = action.special ? effectiveness(CREATURES[active.id].element, CREATURES[battle.foe.id].element) : 1;
      const damage = Math.max(4, Math.round((action.special ? 12 : 9) + active.level * 1.1 + action.random * 5 - battle.foe.level * 0.5) * multiplier);
      return { ...state, battle: { ...battle, foe: { ...battle.foe, hp: Math.max(0, Math.round(battle.foe.hp - damage)) }, phase: "attack", effect: action.special ? "special" : "strike", text: `${CREATURES[active.id].name} usou ${action.special ? CREATURES[active.id].move : "Investida"}!${multiplier > 1 ? " Super eficaz!" : multiplier < 1 ? " Pouco eficaz…" : ""}` } };
    }
    case "CAPTURE": {
      if (!battle || battle.phase !== "ready" || state.orbs < 1 || battle.boss) return state;
      const chance = 0.2 + (1 - battle.foe.hp / battle.maxHp) * 0.75;
      return { ...state, orbs: state.orbs - 1, battle: { ...battle, phase: "capture", effect: "capture", captureSuccess: action.random < chance, text: "Cápsula lançada… Será que conseguimos?" } };
    }
    case "RESOLVE": {
      if (!battle) return state;
      if (battle.phase === "capture" && battle.captureSuccess) return reward(state, true);
      if (battle.phase === "attack" && battle.foe.hp <= 0) return reward(state, false);
      if (battle.phase === "attack" || battle.phase === "capture") {
        const damage = Math.max(5, Math.round(8 + battle.foe.level * 0.8 + action.random * 4 - active.level * 0.4));
        return { ...state, team: updateActive(state, c => ({ ...c, hp: Math.max(0, c.hp - damage) })), battle: { ...battle, phase: "enemy", effect: "enemy", text: `${battle.phase === "capture" ? "Escapou da cápsula! " : ""}${CREATURES[battle.foe.id].name} usou ${CREATURES[battle.foe.id].move}! −${damage} PV.` } };
      }
      if (battle.phase === "enemy") {
        if (active.hp <= 0) {
          const next = state.team.findIndex(c => c.hp > 0);
          if (next >= 0) return { ...state, active: next, battle: { ...battle, phase: "ready", effect: "", text: `${CREATURES[active.id].name} precisa descansar. Vai, ${CREATURES[state.team[next].id].name}!` } };
          return { ...state, battle: { ...battle, phase: "lost", effect: "", text: "Sua equipe precisa descansar. Lia vai acompanhar você até a casa de apoio." } };
        }
        return { ...state, battle: { ...battle, phase: "ready", effect: "", text: `O que ${CREATURES[active.id].name} vai fazer?` } };
      }
      return state;
    }
    case "RUN": return battle?.phase === "ready" ? { ...state, battle: { ...battle, phase: "escaped", effect: "", text: "Você voltou em segurança para a trilha." } } : state;
    case "CLOSE_BATTLE": {
      if (!battle || !["won", "caught", "lost", "escaped"].includes(battle.phase)) return state;
      return { ...state, battle: null, steps: 0, ...(battle.phase === "lost" ? { position: HOME, team: state.team.map(c => ({ ...c, hp: maxHp(c.level) })) } : {}), notice: battle.phase === "lost" ? "Todos recuperados! Continue a aventura." : battle.text };
    }
    case "HEAL": {
      if ((battle && battle.phase !== "ready") || state.potions < 1 || active.hp >= maxHp(active.level) || active.hp <= 0) return state;
      return { ...state, potions: state.potions - 1, team: updateActive(state, c => ({ ...c, hp: Math.min(maxHp(c.level), c.hp + 35) })), notice: `${CREATURES[active.id].name} recuperou até 35 PV.`, battle: battle ? { ...battle, phase: "attack", effect: "heal", text: `${CREATURES[active.id].name} recuperou até 35 PV!` } : null };
    }
    case "SWITCH": {
      if ((battle && battle.phase !== "ready") || action.index === state.active || !state.team[action.index] || state.team[action.index].hp <= 0) return state;
      return { ...state, active: action.index, battle: battle ? { ...battle, phase: "attack", effect: "", text: `Vai, ${CREATURES[state.team[action.index].id].name}!` } : null };
    }
  }
}
