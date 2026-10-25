// Server-rendering checks; configured media fixtures do not load network resources.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(file, dependencies = {}) {
  const filename = path.resolve(__dirname, "..", file);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) { return name in dependencies ? dependencies[name] : require(name); },
  }, { filename });
  return exports;
}
const data = load("lib/testimonials.ts");
const icons = load("components/SummerIcon.tsx");
const components = load("components/SummerTestimonials.tsx", {
  "../lib/testimonials": data,
  "./SummerIcon": icons,
});
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
const emptyVideos = render(components.SummerVideoTestimonials);
const filledText = render(components.SummerTextTestimonials);
assert.equal((emptyVideos.match(/<figure/g) || []).length, 5);
assert.equal((filledText.match(/<figure/g) || []).length, 5);
assert.equal((filledText.match(/<img/g) || []).length, 5);
assert.doesNotMatch(emptyVideos, /<(?:video|img|iframe|button)\b|src=""/);
assert.match(emptyVideos, /Em breve/);
assert.doesNotMatch(filledText, /Em breve|Depoimento em breve|Mensagens da comunidade|testimonial-placeholder/);
for (const testimonial of data.TEXT_TESTIMONIALS) {
  const content = testimonial.content;
  assert.equal(content.kind, "image");
  const file = fs.readFileSync(path.join(__dirname, "../public", content.src));
  assert.equal(file.readUInt32BE(16), content.width, "Configured PNG width matches original");
  assert.equal(file.readUInt32BE(20), content.height, "Configured PNG height matches original");
}
const emptyComponents = load("components/SummerTestimonials.tsx", {
  "../lib/testimonials": { ...data, TEXT_TESTIMONIALS: [{ id: "empty", label: "Unused" }], GROUP_TESTIMONIALS: [] },
  "./SummerIcon": icons,
});
assert.equal(render(emptyComponents.SummerTextTestimonials), "", "Unused text slots and the empty group heading are omitted");

const configuredVideo = render(components.VideoTestimonialCard, { testimonial: {
  id: "fixture", label: "Vídeo de teste",
  video: { src: "/fixtures/video.mp4", poster: "/fixtures/poster.webp", captions: "/fixtures/captions.vtt" },
} });
assert.match(configuredVideo, /<video/);
assert.match(configuredVideo, /controls=""/);
assert.match(configuredVideo, /playsInline=""/i);
assert.match(configuredVideo, /preload="none"/);
assert.match(configuredVideo, /kind="captions"/);
assert.doesNotMatch(configuredVideo, /autoPlay|testimonial-placeholder/);

const quote = render(components.TextTestimonialCard, { testimonial: {
  id: "quote-fixture", label: "Relato de teste",
  content: { kind: "quote", text: "Texto <script>original</script>", author: "Nome de teste" },
} });
assert.match(quote, /<blockquote/);
assert.match(quote, /&lt;script&gt;original&lt;\/script&gt;/);
assert.match(quote, /<footer>Nome de teste<\/footer>/);
assert.doesNotMatch(quote, /<script|<img|testimonial-placeholder/);

const screenshot = render(components.TextTestimonialCard, { testimonial: {
  id: "image-fixture", label: "Print de teste",
  content: { kind: "image", src: "/fixtures/message.webp", alt: "Mensagem autorizada", width: 720, height: 1280 },
} });
assert.match(screenshot, /<img/);
assert.match(screenshot, /alt="Mensagem autorizada"/);
assert.match(screenshot, /width="720" height="1280"/);
assert.doesNotMatch(screenshot, /testimonial-placeholder/);
console.log("PASS: five original prints with correct dimensions; unused text slots hidden; video, captions and escaped quote rendering preserved. Playback requires real video files.");
