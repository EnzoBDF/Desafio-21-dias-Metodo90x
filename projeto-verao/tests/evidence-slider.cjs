// Component logic tests with simulated hooks and timers, not browser/gesture QA.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const filename = path.join(__dirname, "../components/SummerEvidenceSlider.tsx");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

let cursor = 0;
let now = 0;
let reducedMotion = false;
let observerCallback;
let effects = [];
let cleanups = [];
const slots = [];
const timers = new Map();
const calls = [];
let timerId = 0;
const documentMock = { hidden: false };
const reactMock = {
  useId: () => "test-slider",
  useRef: (initial) => {
    const index = cursor++;
    slots[index] ??= { current: initial };
    return slots[index];
  },
  useState: (initial) => {
    const index = cursor++;
    if (!(index in slots)) slots[index] = initial;
    return [slots[index], (next) => {
      slots[index] = typeof next === "function" ? next(slots[index]) : next;
    }];
  },
  useCallback: (fn) => fn,
  useEffect: (fn) => effects.push(fn),
  useSyncExternalStore: () => reducedMotion,
};
const jsx = (type, props) => ({ type, props });
const exportsMock = {};
class ObserverMock {
  constructor(callback) { observerCallback = callback; }
  observe() { observerCallback([{ isIntersecting: true, intersectionRatio: 1 }]); }
  disconnect() {}
}
class DateMock extends Date { static now() { return now; } }
vm.runInNewContext(compiled, {
  exports: exportsMock,
  require: (name) => {
    if (name === "react") return reactMock;
    if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
    if (name === "next/image") return { default: "img" };
    if (name === "./SummerIcon") return { SummerIcon: "svg" };
    throw new Error(`Unexpected dependency: ${name}`);
  },
  window: {
    IntersectionObserver: ObserverMock,
    setInterval: (fn) => { timers.set(++timerId, fn); return timerId; },
    clearInterval: (id) => timers.delete(id),
  },
  IntersectionObserver: ObserverMock,
  document: documentMock,
  Date: DateMock,
});

const photos = [1, 2, 3, 4].map((index) => ({ src: `photo-${index}`, alt: `Photo ${index}` }));
const trackMock = {
  clientWidth: 340,
  scrollLeft: 0,
  scrollTo: (options) => {
    trackMock.scrollLeft = options.left;
    calls.push({ left: options.left, behavior: options.behavior });
  },
};
let root;
let track;
function flatten(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(flatten);
  return [node, ...flatten(node.props?.children)];
}
function render() {
  cleanups.forEach((cleanup) => cleanup?.());
  cursor = 0;
  effects = [];
  root = exportsMock.SummerEvidenceSlider({ photos });
  track = flatten(root).find((node) => node.props?.className === "evidence-slider-track");
  root.props.ref.current = {};
  track.props.ref.current = trackMock;
  cleanups = effects.map((effect) => effect());
}
function tick(milliseconds = 5000) {
  now += milliseconds;
  [...timers.values()].forEach((timer) => timer());
}
function expectNoAdvance(action) {
  const count = calls.length;
  action();
  assert.equal(calls.length, count);
}

render();
assert.equal(flatten(root).filter((node) => node.props?.className === "evidence-photo").length, 4);
tick(); assert.equal(trackMock.scrollLeft, 340);
tick(); assert.equal(trackMock.scrollLeft, 680);
tick(); assert.equal(trackMock.scrollLeft, 1020);
tick(); assert.equal(trackMock.scrollLeft, 680); // Smooth one-slide return.

track.props.onTouchStart();
expectNoAdvance(() => tick(15000)); // Held touch never loses priority.
track.props.onTouchEnd();
expectNoAdvance(() => tick());
tick(); assert.equal(trackMock.scrollLeft, 340);

trackMock.scrollLeft = 1020;
track.props.onScroll(); // A finger swipe selects the slide used by autoplay.
tick(); assert.equal(trackMock.scrollLeft, 680);

root.props.onPointerEnter({ pointerType: "mouse" });
expectNoAdvance(() => tick());
root.props.onPointerLeave({ pointerType: "mouse" });
root.props.onPointerEnter({ pointerType: "touch" });
tick(); assert.equal(trackMock.scrollLeft, 340); // Touch cannot cause sticky hover.

root.props.onFocusCapture();
expectNoAdvance(() => tick());
root.props.onBlurCapture({ currentTarget: { contains: () => false }, relatedTarget: null });
expectNoAdvance(() => tick());
tick(); assert.equal(trackMock.scrollLeft, 0);

observerCallback([{ isIntersecting: false, intersectionRatio: 0 }]);
expectNoAdvance(() => tick());
observerCallback([{ isIntersecting: true, intersectionRatio: 1 }]);
documentMock.hidden = true;
expectNoAdvance(() => tick());
documentMock.hidden = false;

let prevented = false;
track.props.onKeyDown({ key: "ArrowRight", preventDefault: () => { prevented = true; } });
assert.equal(prevented, true);
assert.equal(trackMock.scrollLeft, 340);
expectNoAdvance(() => tick());

flatten(root).find((node) => node.props?.className === "slider-autoplay").props.onClick();
render(); assert.equal(timers.size, 0); // Explicit pause stops the timer.
flatten(root).find((node) => node.props?.className === "slider-autoplay").props.onClick();
render(); assert.equal(timers.size, 1);
reducedMotion = true;
render(); assert.equal(timers.size, 0);
assert.equal(flatten(root).find((node) => node.props?.className === "slider-autoplay").props.disabled, true);
track.props.onKeyDown({ key: "ArrowLeft", preventDefault() {} });
assert.equal(calls.at(-1).behavior, "auto");
cleanups.forEach((cleanup) => cleanup?.());
assert.equal(timers.size, 0);

photos.push(...[5, 6, 7].map((index) => ({ src: `photo-${index}`, alt: `Photo ${index}` })));
reducedMotion = false;
render();
assert.equal(flatten(root).filter((node) => node.props?.className === "evidence-photo").length, 7);
assert.equal(flatten(root).filter((node) => node.props?.["aria-label"]?.startsWith("Ver registro ") && !node.props.className).length, 7);
flatten(root).find((node) => node.props?.["aria-label"] === "Ver registro 1 de 7").props.onClick();
expectNoAdvance(() => tick());
tick(); assert.equal(trackMock.scrollLeft, 340);
for (let index = 2; index < 7; index++) {
  tick(); assert.equal(trackMock.scrollLeft, index * 340);
}
tick(); assert.equal(trackMock.scrollLeft, 5 * 340);
const nextButton = flatten(root).find((node) => node.props?.["aria-label"] === "Ver próximo registro");
nextButton.props.onClick(); assert.equal(trackMock.scrollLeft, 6 * 340);
nextButton.props.onClick(); assert.equal(trackMock.scrollLeft, 0);
flatten(root).find((node) => node.props?.["aria-label"] === "Ver registro anterior").props.onClick();
assert.equal(trackMock.scrollLeft, 6 * 340);
cleanups.forEach((cleanup) => cleanup?.());
assert.equal(timers.size, 0);
console.log("PASS: four and seven slides, autoplay, bounce, swipe sync, touch priority, cooldown, pointer hover, focus, visibility, keyboard, pause/resume, reduced motion, indicators, navigation wrap, cleanup.");
