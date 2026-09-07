"use client";

import { useCallback, useEffect, useReducer, useRef, useState, type CSSProperties, type ReactNode } from "react";
import WorldCanvas from "./WorldCanvas";
import { CREATURES, GUIDE, GUARDIAN, HOME, INITIAL, maxHp, nearby, reducer, type Companion, type Direction } from "./game";
import "./mondra.css";

const SAVE_KEY = "mondra-vale-v1";
type Panel = "team" | "journal" | "bag" | "help" | null;
type IconName = "leaf" | "compass" | "book" | "bag" | "sound" | "mute" | "expand" | "arrow" | "spark" | "heart" | "close" | "sun" | "check" | "home" | "flag";
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    leaf: <><path d="M20 3C10 2 3 6 4 13c1 7 9 8 13 3 3-4 3-9 3-13Z"/><path d="m3 21 12-13M8 16v-5m0 5h5"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/></>,
    book: <><path d="M12 5C8 2 4 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-2-1-6-2-10 1Zm0 0v16"/></>,
    bag: <><rect x="5" y="7" width="14" height="15" rx="4"/><path d="M9 7V5a3 3 0 0 1 6 0v2M8 14h8v5H8v-5Z"/></>,
    sound: <><path d="m11 4-6 5H2v6h3l6 5V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></>,
    mute: <><path d="m11 4-6 5H2v6h3l6 5V4Zm5 5 6 6m0-6-6 6"/></>,
    expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    spark: <path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z"/>,
    heart: <path d="M20 5c-3-3-7-1-8 1-1-2-5-4-8-1s-1 7 8 15c9-8 11-12 8-15Z"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>,
    check: <path d="m5 12 4 4L20 5"/>,
    home: <><path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-8h6v8"/></>,
    flag: <><path d="M5 22V3m0 0c5-4 9 4 15 0v10c-6 4-10-4-15 0"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
function Sprite({ id, className = "", style }: { id: number; className?: string; style?: CSSProperties }) {
  return <span className={`mondra-sprite ${className}`} role="img" aria-label={CREATURES[id].name} style={{ backgroundPosition: `${(id % 3) * 50}% ${Math.floor(id / 3) * 100}%`, ...style }} />;
}
function Health({ creature, label = true }: { creature: Companion; label?: boolean }) {
  return <div className="mondra-health"><div className="mondra-health-track" role="progressbar" aria-label={`Vida de ${CREATURES[creature.id].name}`} aria-valuenow={creature.hp} aria-valuemin={0} aria-valuemax={maxHp(creature.level)}><span style={{ width: `${creature.hp / maxHp(creature.level) * 100}%`, background: creature.hp / maxHp(creature.level) < 0.3 ? "#f49986" : undefined }} /></div>{label && <span>PV <b>{creature.hp} / {maxHp(creature.level)}</b></span>}</div>;
}
function Modal({ title, subtitle, children, onClose }: { title: string; subtitle: string; children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => { dialog?.close(); }; }, []);
  return <dialog className="mondra-modal" ref={ref} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="mondra-modal-content"><header><div><span className="mondra-eyebrow">SEU CADERNO DE AVENTURAS</span><h2>{title}</h2><p>{subtitle}</p></div><button className="mondra-icon-button" onClick={onClose} aria-label="Fechar"><Icon name="close"/></button></header>{children}</div></dialog>;
}
export default function MondraGame() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [panel, setPanel] = useState<Panel>(null);
  const [sound, setSound] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [readyAssets, setReadyAssets] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const routeRef = useRef<Direction[]>([]);
  const heldRef = useRef<Direction | null>(null);
  const battle = state.battle;
  const companion = state.team[state.active];
  const creature = CREATURES[companion.id];
  const finished = !!battle && ["won", "caught", "lost", "escaped"].includes(battle.phase);
  const busy = !!battle && battle.phase !== "ready";
  const nearHome = nearby(state.position, HOME), nearGuide = nearby(state.position, GUIDE), nearGuardian = nearby(state.position, GUARDIAN);
  useEffect(() => {
    try { const raw = localStorage.getItem(SAVE_KEY); dispatch({ type: "LOAD", data: raw ? JSON.parse(raw) : null }); }
    catch { dispatch({ type: "LOAD", data: null }); dispatch({ type: "SAVE_ERROR" }); }
    const img = new Image(); img.src = "/game/creatures.png";
    img.decode().then(() => setReadyAssets(true)).catch(() => {});
    return () => { audioRef.current?.close(); };
  }, []);
  useEffect(() => {
    if (!state.loaded || state.battle) return;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
    catch { dispatch({ type: "SAVE_ERROR" }); }
  }, [state]);
  const play = useCallback((kind: string) => {
    if (!sound || !audioRef.current) return;
    const context = audioRef.current;
    void context.resume();
    const notes = kind === "caught" || kind === "won" ? [523, 659, 784, 1047] : kind === "capture" ? [640, 510, 420] : kind === "enemy" ? [220, 165] : [390, 580];
    notes.forEach((frequency, i) => {
      const oscillator = context.createOscillator(), gain = context.createGain();
      const start = context.currentTime + i * 0.1;
      oscillator.type = "triangle"; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(0.07, start + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(start); oscillator.stop(start + 0.16);
    });
  }, [sound]);
  useEffect(() => { if (battle?.phase) play(battle.phase); }, [battle?.phase, play]);
  useEffect(() => {
    if (!battle || !["attack", "capture", "enemy"].includes(battle.phase)) return;
    const timer = setTimeout(() => dispatch({ type: "RESOLVE", random: Math.random() }), battle.phase === "capture" ? 1650 : 1050);
    return () => clearTimeout(timer);
  }, [battle]);
  useEffect(() => {
    routeRef.current = []; heldRef.current = null;
    if (panel || battle || !state.loaded) return;
    const keys: Record<string, Direction> = { ArrowUp: "up", w: "up", ArrowDown: "down", s: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right" };
    const keydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || (event.target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (keys[key]) { event.preventDefault(); if (!event.repeat) { heldRef.current = keys[key]; routeRef.current = []; dispatch({ type: "MOVE", direction: keys[key], random: Math.random() }); } }
      if (key === "e" && !event.repeat) { event.preventDefault(); dispatch({ type: "INTERACT" }); }
      if (key === "b" && !event.repeat) setPanel("bag");
    };
    const keyup = (event: KeyboardEvent) => { if (keys[event.key] === heldRef.current || keys[event.key.toLowerCase()] === heldRef.current) heldRef.current = null; };
    const blur = () => { heldRef.current = null; routeRef.current = []; };
    const timer = setInterval(() => { if (document.hidden) { blur(); return; } const direction = heldRef.current ?? routeRef.current.shift(); if (direction) dispatch({ type: "MOVE", direction, random: Math.random() }); }, 160);
    window.addEventListener("keydown", keydown); window.addEventListener("keyup", keyup); window.addEventListener("blur", blur);
    return () => { clearInterval(timer); window.removeEventListener("keydown", keydown); window.removeEventListener("keyup", keyup); window.removeEventListener("blur", blur); heldRef.current = null; };
  }, [panel, battle, state.loaded]);
  const toggleSound = () => {
    if (!sound) {
      try { audioRef.current ??= new AudioContext(); void audioRef.current.resume(); }
      catch { dispatch({ type: "NOTICE", text: "O áudio não está disponível neste navegador." }); return; }
    }
    setSound(v => !v);
  };
  const fullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else if (rootRef.current?.requestFullscreen) await rootRef.current.requestFullscreen(); else dispatch({ type: "NOTICE", text: "Seu navegador não oferece tela cheia. Você pode jogar normalmente nesta janela." }); }
    catch { dispatch({ type: "NOTICE", text: "Não foi possível abrir a tela cheia neste navegador." }); }
  };
  const openPanel = (next: Panel) => { routeRef.current = []; heldRef.current = null; setPanel(next); };
  const objective = state.badge ? "Complete seu diário" : state.team.length >= 3 ? "O desafio do guardião" : "Novas amizades";
  return <div className="mondra" ref={rootRef}>
    <header className="mondra-header"><a href="/jogo" className="mondra-brand" aria-label="Mondra, início"><span className="mondra-brand-icon"><Icon name="leaf" size={24}/></span>mondra<span className="mondra-brand-dot">.</span><span className="mondra-edition">UM PEQUENO MUNDO. UMA GRANDE AVENTURA.</span></a><div className="mondra-status"><i/>{state.saveError ? "Progresso nesta sessão" : "Salvo neste dispositivo"}</div></header>
    <main className="mondra-main">
      <div className="mondra-heading"><div><div className="mondra-eyebrow"><span/> SUA AVENTURA COMEÇA AQUI</div><h1>Vale das Folhas<span>01</span></h1><p>Vá sem pressa. Há um novo amigo em cada caminho.</p></div><button className="mondra-help" onClick={() => openPanel("help")}><span>?</span> Como jogar</button></div>
      <nav className="mondra-nav" aria-label="Menu do jogo"><div className="mondra-tabs"><button className={!panel ? "active" : ""} onClick={() => openPanel(null)}><Icon name="compass"/>Explorar<span className="mondra-live-dot"/></button><button className={panel === "journal" ? "active" : ""} onClick={() => openPanel("journal")}><Icon name="book"/>Diário de criaturas<span className="mondra-count">{state.team.length}/6</span></button><button className={panel === "bag" ? "active" : ""} onClick={() => openPanel("bag")}><Icon name="bag"/>Mochila</button></div><div className="mondra-tools"><button className="mondra-icon-button" onClick={toggleSound} aria-label={sound ? "Desativar som" : "Ativar som"} aria-pressed={sound} title={sound ? "Desativar som" : "Ativar som"}><Icon name={sound ? "sound" : "mute"}/></button><button className="mondra-icon-button" onClick={fullscreen} aria-label="Alternar tela cheia" title="Tela cheia"><Icon name="expand"/></button></div></nav>
      <div className="mondra-game-layout"><section className="mondra-stage" aria-label={battle ? "Batalha por turnos" : "Exploração do vale"}>
        <div className="mondra-scene">
          {!battle ? <>
            <WorldCanvas state={state} onRoute={path => { routeRef.current = path; }} onInteract={() => dispatch({ type: "INTERACT" })}/>
            <div className="mondra-location"><span className="mondra-location-icon"><Icon name="compass" size={18}/></span><div><b>Vale das Folhas</b><span>{state.position.y >= 13 ? "Prado do sul" : state.position.x >= 14 && state.position.y < 9 ? "Margem do lago" : state.position.x > 18 ? "Clareira do leste" : "Vila Aurora"}</span></div></div>
            <div className="mondra-weather"><Icon name="sun" size={16}/><span>Uma bela manhã</span></div>
            <div className="mondra-map-caption"><span className="mondra-live-dot"/>MUNDO ABERTO <span>·</span> REGIÃO 01</div>
            {(nearHome || nearGuide || nearGuardian) && <button className="mondra-interact" onClick={() => dispatch({ type: "INTERACT" })}><kbd>E</kbd>{nearHome ? "Descansar e reabastecer" : nearGuide ? "Conversar com Lia" : "Desafiar guardião"}<Icon name="arrow" size={16}/></button>}
          </> : <div className={`mondra-battle mondra-battle-${battle.phase}`}>
            <div className="mondra-battle-heading"><span className="mondra-eyebrow">{battle.boss ? "DESAFIO DO GUARDIÃO" : "ENCONTRO NA GRAMA ALTA"}</span><span className="mondra-battle-tag">{battle.boss ? "GUARDIÃO" : "SELVAGEM"}</span></div>
            <div className="mondra-foe-stats"><div><h3>{CREATURES[battle.foe.id].name}</h3><span>NV. {battle.foe.level}</span></div><span className="mondra-type" style={{ color: CREATURES[battle.foe.id].color }}>{CREATURES[battle.foe.id].element}</span><Health creature={battle.foe}/></div>
            <div className="mondra-battle-field"><div className="mondra-platform mondra-platform-foe"/><div className="mondra-platform mondra-platform-player"/><Sprite id={battle.foe.id} className={`mondra-foe ${battle.effect === "strike" || battle.effect === "special" ? "mondra-hit" : ""} ${battle.phase === "caught" ? "mondra-captured" : ""}`}/><Sprite id={companion.id} className={`mondra-player ${battle.effect === "enemy" ? "mondra-hit" : ""} ${battle.effect === "strike" || battle.effect === "special" ? "mondra-lunge" : ""}`}/>{battle.effect === "special" && <div className="mondra-attack-flash" style={{ color: creature.color }}><Icon name="spark" size={85}/></div>}{battle.effect === "capture" && <span className="mondra-orb mondra-thrown-orb"/>}{battle.effect === "heal" && <span className="mondra-heal-effect">+35 <Icon name="heart"/></span>}{battle.phase === "won" && <div className="mondra-win-label">{battle.boss ? "★ INSÍGNIA DO VALE" : "VITÓRIA!"}</div>}{battle.phase === "caught" && <div className="mondra-win-label">UM NOVO AMIGO!</div>}</div>
            <div className="mondra-player-stats"><div><h3>{creature.name}</h3><span>NV. {companion.level}</span></div><Health creature={companion}/></div>
          </div>}
          {!readyAssets && !battle && <div className="mondra-loading"><Icon name="leaf" size={36}/><p>Preparando o vale…</p></div>}
        </div>
        <div className={`mondra-message ${battle ? "mondra-message-battle" : ""}`}><span className="mondra-message-icon"><Icon name={battle ? "spark" : "leaf"}/></span><p role="status" aria-live="polite">{battle ? battle.text : state.notice}</p>{!battle && <span className="mondra-message-dots">···</span>}</div>
        {battle ? <div className="mondra-battle-actions">{finished ? <button className="mondra-primary mondra-continue" onClick={() => dispatch({ type: "CLOSE_BATTLE" })}>Continuar aventura<Icon name="arrow"/></button> : <><button disabled={busy} onClick={() => dispatch({ type: "ATTACK", special: false, random: Math.random() })}><Icon name="spark"/><span>Investida<small>ATAQUE NORMAL</small></span></button><button disabled={busy} className="mondra-special-action" onClick={() => dispatch({ type: "ATTACK", special: true, random: Math.random() })}><Icon name="leaf"/><span>{creature.move}<small>{creature.element.toUpperCase()}</small></span></button><button disabled={busy || !state.orbs || battle.boss} onClick={() => dispatch({ type: "CAPTURE", random: Math.random() })}><span className="mondra-orb"/><span>Capturar<small>{battle.boss ? "GUARDIÃO NÃO CAPTURÁVEL" : `${state.orbs} CÁPSULAS`}</small></span></button><button disabled={busy} onClick={() => dispatch({ type: "RUN" })}><Icon name="arrow"/><span>Fugir<small>VOLTAR À TRILHA</small></span></button></>}</div> : <div className="mondra-controls"><div><span className="mondra-key-group"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span><span>ou setas para mover</span></div><div><kbd>E</kbd><span>interagir</span></div><span className="mondra-click-hint">Você também pode clicar no mapa</span></div>}
      {!battle && <div className="mondra-touch-controls" aria-label="Controles de toque"><div className="mondra-dpad">{(["up", "left", "down", "right"] as Direction[]).map(dir => <button key={dir} className={`mondra-dir-${dir}`} aria-label={`Mover para ${ { up: "cima", left: "esquerda", down: "baixo", right: "direita" }[dir]}`} onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); heldRef.current = dir; routeRef.current = []; dispatch({ type: "MOVE", direction: dir, random: Math.random() }); }} onPointerUp={() => { heldRef.current = null; }} onPointerCancel={() => { heldRef.current = null; }} onLostPointerCapture={() => { heldRef.current = null; }}><Icon name="arrow"/></button>)}</div><button className="mondra-touch-interact" onClick={() => dispatch({ type: "INTERACT" })}>E<span>Interagir</span></button></div>}
      </section>
      <aside className="mondra-sidebar"><section className="mondra-companion-card"><div className="mondra-card-heading"><span className="mondra-eyebrow">SEU COMPANHEIRO</span><span className="mondra-live-dot"/></div><div className="mondra-companion-art"><span className="mondra-orbit mondra-orbit-one"/><span className="mondra-orbit mondra-orbit-two"/><span className="mondra-art-spark">✦</span><Sprite id={companion.id} className="mondra-idle"/><span className="mondra-art-no">Nº 00{companion.id + 1}</span></div><div className="mondra-companion-name"><h2>{creature.name}</h2><span>NV. {companion.level}</span></div><span className="mondra-type" style={{ color: creature.color }}><Icon name="leaf" size={13}/>{creature.element}</span><Health creature={companion}/><div className="mondra-exp"><span style={{ width: `${companion.xp / 70 * 100}%` }}/></div><div className="mondra-exp-label">EXP<span>{companion.xp} / 70</span></div><button className="mondra-outline" onClick={() => openPanel("team")}>Ver minha equipe<span>{state.team.length}</span><Icon name="arrow" size={17}/></button></section>
        <section className="mondra-quest"><div className="mondra-quest-icon"><Icon name={state.badge ? "book" : "flag"}/></div><span className="mondra-eyebrow">PRÓXIMO PASSO</span><h3>{objective}</h3><p>{state.badge ? "Encontre as seis espécies que vivem no vale." : state.team.length >= 3 ? "Encontre o guardião a sudeste e conquiste a Insígnia do Vale." : "Explore a grama alta e reúna 3 espécies na sua equipe."}</p><div className="mondra-quest-progress"><span style={{ width: `${state.badge ? state.team.length / 6 * 100 : Math.min(100, state.team.length / 3 * 100)}%` }}/></div><div className="mondra-quest-bottom"><span>{state.badge ? "Diário de criaturas" : state.team.length >= 3 ? "Desafio liberado" : "Espécies encontradas"}</span><b>{state.badge ? `${state.team.length}/6` : state.team.length >= 3 ? "→" : `${state.team.length}/3`}</b></div></section>
        <div className="mondra-pocket"><div><span className="mondra-orb"/><b>{state.orbs}</b><span>Cápsulas</span></div><div><span className="mondra-potion"><Icon name="heart" size={17}/></span><b>{state.potions}</b><span>Poções</span></div></div>
      </aside></div>
      <footer className="mondra-footer"><span><Icon name="leaf" size={15}/>Toda grande amizade começa com um encontro.</span><span>MONDRA <i/> AVENTURA 01</span></footer>
    </main>
    {panel && <Modal title={{ team: "Sua pequena equipe", journal: "Diário de criaturas", bag: "Dentro da mochila", help: "O vale espera por você" }[panel]} subtitle={{ team: "Escolha quem vai acompanhar você na próxima descoberta.", journal: `${state.team.length} de 6 espécies descobertas. Cada uma tem sua história.`, bag: "Um pouco de preparo para muitos caminhos.", help: "Explore, faça amigos e conquiste a Insígnia do Vale." }[panel]} onClose={() => { setPanel(null); setResetConfirm(false); }}>
      {panel === "team" && <div className="mondra-team-list">{state.team.map((c, index) => <button key={c.id} className={state.active === index ? "selected" : ""} disabled={busy || !c.hp} onClick={() => { dispatch({ type: "SWITCH", index }); setPanel(null); }}><Sprite id={c.id}/><div><h3>{CREATURES[c.id].name} <small>NV. {c.level}</small></h3><Health creature={c}/></div>{index === state.active ? <Icon name="check"/> : <Icon name="arrow"/>}</button>)}{battle && <p className="mondra-modal-note">Trocar de companheiro usa um turno.</p>}</div>}
      {panel === "journal" && <div className="mondra-journal-grid">{CREATURES.map(c => { const found = state.team.some(t => t.id === c.id); return <article key={c.id} className={found ? "found" : "undiscovered"}><div className="mondra-journal-top"><span>Nº 00{c.id + 1}</span>{found && <Icon name="check" size={15}/>}</div><Sprite id={c.id}/><h3>{found ? c.name : "???"}</h3><span className="mondra-type" style={{ color: c.color }}>{found ? c.element : "Não descoberto"}</span><p>{found ? c.description : `Procure na região: ${c.habitat.toLowerCase()}.`}</p></article>; })}</div>}
      {panel === "bag" && <div className="mondra-bag-list"><article><span className="mondra-orb"/><div><h3>Cápsula de vínculo <b>×{state.orbs}</b></h3><p>Capture criaturas selvagens. Quanto menos PV, maior a chance.</p></div><button disabled={!battle || busy || !state.orbs || battle.boss} onClick={() => { dispatch({ type: "CAPTURE", random: Math.random() }); setPanel(null); }}>Usar</button></article><article><span className="mondra-potion"><Icon name="heart"/></span><div><h3>Poção de folhas <b>×{state.potions}</b></h3><p>Recupera até 35 PV de {creature.name}. Em batalha, usa um turno.</p></div><button disabled={busy || !state.potions || companion.hp >= maxHp(companion.level)} onClick={() => { dispatch({ type: "HEAL" }); setPanel(null); }}>Usar</button></article><p className="mondra-modal-note"><Icon name="home" size={17}/>A casa de apoio recupera a equipe e repõe seus itens gratuitamente.</p></div>}
      {panel === "help" && <div className="mondra-help-content"><ol><li><span>01</span><div><h3>Encontre seu caminho</h3><p>Use WASD, as setas ou clique no mapa. No celular, use os botões de direção. Pressione E perto da casa e dos exploradores.</p></div></li><li><span>02</span><div><h3>Faça novas amizades</h3><p>Caminhe nos três gramados para encontrar espécies diferentes. Ataque para reduzir os PV e lance uma cápsula antes que a criatura desmaie.</p></div></li><li><span>03</span><div><h3>Conquiste o vale</h3><p>Reúna 3 espécies e converse com o guardião a sudeste. Vença o desafio para ganhar uma insígnia. Complete o diário encontrando os 6 amigos!</p></div></li></ol><p className="mondra-modal-note">Folha vence Água; Água vence Fogo; Fogo vence Folha. Seu progresso é salvo automaticamente neste navegador.</p><button className="mondra-reset" onClick={() => { if (resetConfirm) { dispatch({ type: "RESET" }); setPanel(null); setResetConfirm(false); } else setResetConfirm(true); }}>{resetConfirm ? "Confirmar: apagar progresso e recomeçar" : "Começar uma nova aventura"}</button></div>}
    </Modal>}
  </div>;
}
