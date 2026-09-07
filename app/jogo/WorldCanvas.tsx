"use client";

import { useEffect, useRef, useState } from "react";
import { CREATURES, findPath, GUARDIAN, GUIDE, HEIGHT, HOME, isGrass, isPath, isWater, TILE, TREES, WIDTH, type Direction, type GameState } from "./game";

type Props = { state: GameState; onRoute: (path: Direction[]) => void; onInteract: () => void };
function atlas(ctx: CanvasRenderingContext2D, image: HTMLImageElement, index: number, cols: number, rows: number, x: number, y: number, w: number, h: number) {
  const sw = image.width / cols, sh = image.height / rows;
  ctx.drawImage(image, (index % cols) * sw, Math.floor(index / cols) * sh, sw, sh, Math.round(x - w / 2), Math.round(y - h), w, h);
}
export default function WorldCanvas({ state, onRoute, onInteract }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const [assetError, setAssetError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => { stateRef.current = state; }, [state]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let stopped = false, frame = 0;
    const terrain = new Image();
    const creatures = new Image();
    terrain.src = "/game/terrain.png";
    creatures.src = "/game/creatures.png";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const position = { x: stateRef.current.position.x * TILE + TILE / 2, y: stateRef.current.position.y * TILE + TILE / 2 };
    Promise.all([terrain.decode(), creatures.decode()]).then(() => {
      if (stopped) return;
      const ground = document.createElement("canvas");
      ground.width = WIDTH * TILE; ground.height = HEIGHT * TILE;
      const g = ground.getContext("2d")!;
      g.imageSmoothingEnabled = false;
      g.fillStyle = "#83b873"; g.fillRect(0, 0, ground.width, ground.height);
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const seed = (x * 7919 + y * 104729) % 101;
        g.fillStyle = ["#86ba76", "#88bc78", "#80b570", "#84b874"][seed % 4];
        g.fillRect(x * TILE, y * TILE, TILE, TILE);
        if (isWater(x, y)) {
          g.fillStyle = "#659971"; g.fillRect(x * TILE - 5, y * TILE - 5, TILE + 10, TILE + 10);
        }
        if (isPath(x, y) && !isGrass(x, y)) {
          g.fillStyle = "#bbae79"; g.fillRect(x * TILE, y * TILE, TILE, TILE);
          g.fillStyle = "#e0ce99"; g.fillRect(x * TILE, y * TILE, TILE - 1, TILE - 1);
          g.fillStyle = "#c8b984"; g.fillRect(x * TILE + seed % 25, y * TILE + seed % 23, 3, 2);
        } else if (!isWater(x, y) && !isGrass(x, y)) {
          g.fillStyle = "#a1c889"; g.fillRect(x * TILE + seed % 24, y * TILE + seed % 25, 3, 3);
          g.fillStyle = "#72a663"; g.fillRect(x * TILE + (seed * 3) % 24, y * TILE + 12, 2, 4);
        }
      }
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        if (isWater(x, y)) { g.fillStyle = (x + y) % 3 ? "#4c9fa0" : "#50a3a2"; g.fillRect(x * TILE, y * TILE, TILE, TILE); }
        if (isGrass(x, y)) { g.fillStyle = "#609c60"; g.fillRect(x * TILE, y * TILE, TILE, TILE); atlas(g, terrain, 2, 4, 2, x * TILE + 16, y * TILE + 40, 50, 54); }
      }
      // A tile-aligned footpath and stepping stones make the collision boundaries visible.
      g.fillStyle = "#cbbb8e"; g.fillRect(5 * TILE, 7 * TILE, 4 * TILE, TILE);
      atlas(g, terrain, 1, 4, 2, 7 * TILE, 8 * TILE + 16, 224, 224);
      for (const rock of [{ x: 4, y: 10 }, { x: 26, y: 8 }, { x: 18, y: 14 }, { x: 6, y: 17 }]) atlas(g, terrain, 3, 4, 2, rock.x * TILE, rock.y * TILE, 55, 58);
      const label = (text: string, x: number, y: number) => {
        g.font = "bold 11px monospace";
        const w = g.measureText(text).width + 18;
        g.fillStyle = "#315b49d9"; g.fillRect(x - w / 2, y - 15, w, 23);
        g.fillStyle = "#f3efd5"; g.fillText(text, x - w / 2 + 9, y);
      };
      label("CASA DE APOIO", HOME.x * TILE - 25, 7 * TILE - 50);
      label("LAGO SERENO", 21 * TILE + 16, 3 * TILE);
      label("PRADO DO SUL", 10 * TILE + 16, 18 * TILE + 4);
      let lastTime = 0;
      const render = (time: number) => {
        if (stopped) return;
        const dt = Math.min((time - lastTime) / 1000, 0.05); lastTime = time;
        const s = stateRef.current;
        const targetX = s.position.x * TILE + TILE / 2, targetY = s.position.y * TILE + TILE / 2;
        const moving = Math.abs(position.x - targetX) + Math.abs(position.y - targetY) > 1;
        const blend = reducedMotion.matches ? 1 : Math.min(1, dt * 18);
        position.x += (targetX - position.x) * blend; position.y += (targetY - position.y) * blend;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(ground, 0, 0);
        const t = reducedMotion.matches ? 0 : time;
        for (let i = 0; i < 18; i++) {
          const x = (18.4 + ((i * 1.7 + t / 11000) % 6)) * TILE;
          const y = (3 + (i * 1.3) % 4.6) * TILE;
          ctx.fillStyle = "#b0e0c74d"; ctx.fillRect(x, y, 9 + i % 5, 2);
        }
        const actors = TREES.map(p => ({ y: p.y * TILE + 24, draw: () => atlas(ctx, terrain, 0, 4, 2, p.x * TILE + 16, p.y * TILE + 38, 110, 130) }));
        for (const npc of [GUIDE, GUARDIAN]) actors.push({ y: npc.y * TILE + 16, draw: () => {
          ctx.filter = npc === GUARDIAN ? "hue-rotate(150deg)" : "hue-rotate(295deg)";
          atlas(ctx, terrain, 4, 4, 2, npc.x * TILE + 16, npc.y * TILE + 37, 58, 76); ctx.filter = "none";
          ctx.fillStyle = "#fff3bc"; ctx.font = "bold 18px monospace"; ctx.fillText(npc === GUIDE ? "!" : "★", npc.x * TILE + 11, npc.y * TILE - 18 + Math.sin(t / 400) * 2);
        } });
        actors.push({ y: position.y, draw: () => {
          ctx.fillStyle = "#355e4255"; ctx.beginPath(); ctx.ellipse(position.x, position.y + 11, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
          atlas(ctx, terrain, { down: 4, up: 5, left: 6, right: 7 }[s.facing], 4, 2, position.x, position.y + 25 + (moving ? Math.sin(t / 65) * 2 : 0), 62, 82);
        } });
        actors.push({ y: position.y + 15, draw: () => atlas(ctx, creatures, s.team[s.active].id, 3, 2, position.x - 27, position.y + 25 + Math.sin(t / 220) * 2, 38, 38) });
        actors.sort((a, b) => a.y - b.y).forEach(actor => actor.draw());
        for (let i = 0; i < 10; i++) {
          const x = (i * 97 + t / 45) % 960, y = (i * 137 + Math.sin(t / 1900 + i) * 20) % 640;
          ctx.fillStyle = "#f4edb582"; ctx.fillRect(x, y, 3, 3);
        }
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
    }).catch(() => { if (!stopped) setAssetError(true); });
    return () => { stopped = true; cancelAnimationFrame(frame); };
  }, [retry]);
  return <div className="mondra-world">
    <canvas ref={canvasRef} width={WIDTH * TILE} height={HEIGHT * TILE} aria-label={`Mapa do Vale das Folhas. Você está na posição ${state.position.x}, ${state.position.y}, acompanhado de ${CREATURES[state.team[state.active].id].name}. Use as setas ou clique no mapa para caminhar.`} onClick={event => {
      const box = event.currentTarget.getBoundingClientRect();
      const target = { x: Math.floor((event.clientX - box.left) / box.width * WIDTH), y: Math.floor((event.clientY - box.top) / box.height * HEIGHT) };
      if ([HOME, GUIDE, GUARDIAN].some(p => p.x === target.x && p.y === target.y)) { onInteract(); return; }
      onRoute(findPath(state.position, target));
    }} />
    {assetError && <div className="mondra-asset-error"><p>Não foi possível carregar o mapa.</p><button onClick={() => { setAssetError(false); setRetry(v => v + 1); }}>Tentar novamente</button></div>}
  </div>;
}
