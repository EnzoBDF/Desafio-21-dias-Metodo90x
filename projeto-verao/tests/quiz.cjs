// Component/reducer tests with simulated hooks. Not a browser or gesture test.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function load(relativePath, dependencies = {}, globals = {}) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected import: ${name}`);
    },
    ...globals,
  }, { filename });
  return exports;
}

const quiz = load("lib/quiz.ts");
const { QUIZ_QUESTIONS: questions, INITIAL_QUIZ_STATE: initial, quizReducer: reduce } = quiz;
assert.equal(questions.length, 6);
assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
for (const question of questions) {
  assert.ok(question.title.length <= 45, "Question headings remain concise");
  assert.equal(question.options.length, 4);
  assert.equal(new Set(question.options.map((option) => option.id)).size, 4);
}
assert.equal(reduce(initial, { type: "next" }), initial, "Cannot skip unanswered question");
assert.equal(reduce(initial, { type: "back" }), initial, "First question is the lower bound");
assert.equal(reduce(initial, { type: "select", option: "invalid" }), initial);

let current = initial;
let pending = false;
let storageBlocked = false;
let stored = null;
let serverRender = false;
let presentationState = { step: 2, complete: true };
let captureEffects = false;
let capturedEffects = [];
let nextTimer = 0;
const timers = new Map();
const navigations = [];
const jsx = (type, props) => ({ type, props });
const windowMock = {
  setTimeout(callback, delay) { const id = ++nextTimer; timers.set(id, { callback, delay }); return id; },
  clearTimeout(id) { timers.delete(id); },
  sessionStorage: {
    setItem(key, value) {
      if (storageBlocked) throw new Error("Storage disabled");
      assert.equal(key, quiz.QUIZ_STORAGE_KEY);
      stored = value;
    },
    getItem() {
      if (storageBlocked) throw new Error("Storage disabled");
      return stored;
    },
    removeItem() {
      if (storageBlocked) throw new Error("Storage disabled");
      stored = null;
    },
  },
  dispatchEvent() {},
};
const react = {
  useReducer() { return [current, (action) => { current = reduce(current, action); }]; },
  useTransition() { return [pending, (callback) => callback()]; },
  useRef(initialValue) { return { current: initialValue }; },
  useState() { return [presentationState, (next) => { presentationState = next; }]; },
  useEffect(effect) { if (captureEffects) capturedEffects.push(effect); },
  useSyncExternalStore(_subscribe, getSnapshot, getServerSnapshot) { return serverRender ? getServerSnapshot() : getSnapshot(); },
};
const dependencies = {
  "react": react,
  "react/jsx-runtime": { jsx, jsxs: jsx },
  "next/navigation": { useRouter: () => ({ push: (href) => navigations.push(href) }) },
  "next/link": { default: "a" },
  "../lib/quiz": quiz,
  "./SummerIcon": { SummerIcon: "svg" },
};
const globals = { window: windowMock, Event: class { constructor(type) { this.type = type; } } };
const answerStore = load("lib/useQuizAnswers.ts", { react, "./quiz": quiz }, globals);
dependencies["../lib/useQuizAnswers"] = answerStore;
const presentation = load("lib/analysisPresentation.ts");
dependencies["../lib/analysisPresentation"] = presentation;
const { SummerAnalysisLoading } = load("components/SummerAnalysisLoading.tsx", dependencies, globals);
dependencies["./SummerAnalysisLoading"] = { SummerAnalysisLoading };
const { SummerQuiz } = load("components/SummerQuiz.tsx", dependencies, globals);
const { SummerOfferIntro, SummerRestartQuiz } = load("components/SummerOfferIntro.tsx", dependencies, globals);
const { SummerQuizAnalysis } = load("components/SummerQuizAnalysis.tsx", { ...dependencies, "./SummerOfferIntro": { SummerRestartQuiz } }, globals);

function flatten(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(flatten);
  return [node, ...flatten(node.props?.children)];
}
function render() { return flatten(SummerQuiz()); }
function submit(nodes) { nodes.find((node) => node.type === "form").props.onSubmit({ preventDefault() {} }); }
function inputNodes(nodes) { return nodes.filter((node) => node.type === "input"); }
function button(nodes, type) { return nodes.find((node) => node.type === "button" && node.props.type === type); }

let nodes = render();
assert.equal(nodes.find((node) => node.props?.className === "quiz-actions").props["data-first-step"], true);
assert.equal(button(nodes, "submit").props.disabled, true);
assert.equal(button(nodes, "button").props.disabled, true);
submit(nodes);
assert.equal(current.step, 0);
assert.equal(navigations.length, 0);

for (let step = 0; step < questions.length; step++) {
  nodes = render();
  assert.equal(nodes.filter((node) => node.type === "h1").length, 1);
  assert.equal(nodes.find((node) => node.type === "h1").props.children, questions[step].title);
  assert.equal(inputNodes(nodes).length, 4);
  const progress = nodes.find((node) => node.props?.role === "progressbar");
  assert.equal(progress.props.children.length, questions.length, "Progress has six segments");
  assert.equal(progress.props["aria-valuenow"], Object.keys(current.answers).length);
  assert.ok(nodes.some((node) => node.props?.className === "quiz-option-icon"), "Options use decorative icons");
  assert.ok(inputNodes(nodes).every((node) => node.props.name === questions[step].id));
  inputNodes(nodes)[step % 4].props.onChange();
  nodes = render();
  assert.equal(inputNodes(nodes).filter((node) => node.props.checked).length, 1);
  assert.equal(button(nodes, "submit").props.disabled, false);
  assert.equal(nodes.find((node) => node.props?.className === "quiz-actions").props["data-first-step"], step === 0);
  assert.equal(nodes.filter((node) => node.props?.className?.includes("quiz-option--selected")).length, 1);
  assert.ok(nodes.some((node) => node.props?.className?.includes("quiz-hint--ready")), "Selection shows continuation feedback");
  if (step === 2) {
    button(nodes, "button").props.onClick();
    assert.equal(current.step, 1);
    let previous = render();
    assert.equal(inputNodes(previous)[1].props.checked, true, "Back preserves answer");
    inputNodes(previous)[2].props.onChange();
    submit(render());
    assert.equal(current.step, 2);
    nodes = render();
    assert.equal(inputNodes(nodes)[2].props.checked, true, "Forward preserves next answer");
  }
  submit(nodes);
  if (step < questions.length - 1) {
    assert.equal(current.step, step + 1);
    assert.equal(navigations.length, 0, "No navigation until the last answer");
  }
}
assert.equal(current.step, 5);
assert.equal(reduce(current, { type: "next" }), current, "Last question is the upper bound");
assert.equal(quiz.isCompleteQuiz(current.answers), true);
assert.equal(navigations.at(-1), "/analise", "Completion opens the analysis before the offer");
assert.equal(quiz.parseQuizAnswers(stored).momento, questions[1].options[2].id);
assert.equal(JSON.stringify(quiz.parseQuizAnswers(stored)), JSON.stringify(current.answers));

let intro = flatten(SummerOfferIntro());
assert.ok(intro.some((node) => node.props?.className?.includes("offer-quiz-summary")));
assert.equal(intro.find((node) => node.type === "h1").props.children[0], quiz.getOfferHeadline(current.answers).title);
for (const goal of questions[0].options) {
  assert.ok(quiz.getOfferHeadline({ objetivo: goal.id }).title);
}
const summaryKeys = ["objective", "moment", "location", "frequency", "challenge", "priority"];
for (let index = 0; index < questions.length; index++) {
  const question = questions[index];
  for (const option of question.options) {
    const summary = quiz.getQuizAnalysis({ ...current.answers, [question.id]: option.id });
    assert.equal(summary[summaryKeys[index]], option.label, "Analysis reflects each allowed answer");
    assert.ok(summary.routineNote.length > 30);
    assert.ok(summary.challengeNote.length > 30);
  }
}
let analysis = flatten(SummerQuizAnalysis());
assert.equal(analysis.filter((node) => node.type === "article").length, 3);
assert.equal(analysis.filter((node) => node.type === "h1").length, 1);
assert.ok(analysis.some((node) => node.props?.href === "/oferta"), "Analysis continues to the offer");
assert.ok(analysis.some((node) => node.props?.["aria-current"] === "step"));
assert.ok(!analysis.some((node) => node.props?.href?.startsWith("https://payfast")), "No premature checkout on analysis");
assert.equal(presentation.ANALYSIS_PRESENTATION_DURATION, 5000);
presentationState = { step: 0, complete: false };
captureEffects = true;
capturedEffects = [];
const loadingNode = SummerQuizAnalysis();
assert.equal(loadingNode.type, SummerAnalysisLoading);
const disposePresentation = capturedEffects[0]();
captureEffects = false;
assert.equal(timers.size, 3, "Two message changes and one reveal are scheduled");
for (const [id, timer] of [...timers]) {
  if (timer.delay < 5000) { timers.delete(id); timer.callback(); }
}
assert.equal(presentationState.step, 2);
assert.equal(presentationState.complete, false, "Summary is not revealed before five seconds");
for (const [id, timer] of [...timers]) { timers.delete(id); timer.callback(); }
assert.equal(presentationState.complete, true, "Summary is revealed at five seconds");
disposePresentation();
assert.equal(timers.size, 0);
for (let step = 0; step < 3; step++) {
  const loading = flatten(SummerAnalysisLoading({ step, onSkip() {} }));
  assert.equal(loading.find((node) => node.props?.role === "progressbar").props["aria-valuenow"], step + 1);
  assert.equal(loading.filter((node) => node.props?.role === "status").length, 1);
  assert.equal(loading.filter((node) => node.type === "h1").length, 1);
}
presentationState = { step: 0, complete: false };
capturedEffects = [];
captureEffects = true;
const skipNode = SummerQuizAnalysis();
const disposeSkipped = capturedEffects[0]();
captureEffects = false;
skipNode.props.onSkip();
assert.equal(presentationState.complete, true, "Visitor can skip the presentation");
disposeSkipped();
assert.equal(timers.size, 0, "Skip/unmount cancels all pending presentation timers");
serverRender = true;
analysis = flatten(SummerQuizAnalysis());
assert.ok(analysis.some((node) => node.props?.role === "status"));
assert.equal(analysis.filter((node) => node.type === "article").length, 0, "No fabricated results before reading storage");
serverRender = false;
for (const raw of [null, "not json", "{}", "[]", JSON.stringify({ ...current.answers, objetivo: "<script>" })]) {
  assert.equal(quiz.parseQuizAnswers(raw), null);
}
const extra = quiz.parseQuizAnswers(JSON.stringify({ ...current.answers, email: "should-not-be-retained" }));
assert.equal("email" in extra, false);

pending = true;
nodes = render();
assert.equal(button(nodes, "submit").props.disabled, true);
const count = navigations.length;
submit(nodes);
assert.equal(navigations.length, count);
pending = false;
storageBlocked = true;
submit(render());
assert.equal(navigations.length, count + 1, "Blocked storage does not block the offer");
intro = flatten(SummerOfferIntro());
assert.ok(!intro.some((node) => node.props?.className?.includes("offer-quiz-summary")));
assert.equal(intro.find((node) => node.type === "h1").props.children[0], quiz.getOfferHeadline(null).title);
analysis = flatten(SummerQuizAnalysis());
assert.equal(analysis.filter((node) => node.type === "article").length, 0);
assert.ok(analysis.some((node) => node.props?.href === "/"));
assert.ok(analysis.some((node) => node.props?.href === "/oferta"), "Unavailable storage does not trap the visitor");
storageBlocked = false;
SummerRestartQuiz().props.onClick();
assert.equal(stored, null, "Starting a new quiz clears the previous offer preferences");
analysis = flatten(SummerQuizAnalysis());
assert.equal(analysis.filter((node) => node.type === "article").length, 0, "Direct analysis access does not invent answers");
storageBlocked = true;
assert.doesNotThrow(() => SummerRestartQuiz().props.onClick());
console.log("PASS: quiz, analysis, five-second reveal, progress messages, skip, timer cleanup, hydration, reset and storage fallback.");
