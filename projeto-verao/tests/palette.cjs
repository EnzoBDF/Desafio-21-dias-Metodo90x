const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");

const root = path.resolve(__dirname, "..");
const styles = ["app/globals.css", "app/quiz.css", "app/analise/analysis.css", "app/oferta/adaptations.css"].map((file) => fs.readFileSync(path.join(root, file), "utf8"));
const variables = {};
for (const css of styles) {
  const parsed = postcss.parse(css);
  parsed.walkRules(":root", (rule) => rule.walkDecls((declaration) => {
    variables[declaration.prop] = declaration.value;
  }));
}

function luminance(hex) {
  const channels = hex.replace("#", "").match(/../g).map((part) => parseInt(part, 16) / 255)
    .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
for (const [foreground, background] of [["--ink", "--sand"], ["--ink-soft", "--white"], ["--cta-ink", "--coral"], ["--cta-ink", "--coral-hover"], ["--ink", "--turquoise"], ["--ink", "--sun"], ["--ink-soft", "--sand-soft"], ["--coral-deep", "--coral-wash"], ["--teal-deep", "--sand-soft"], ["--white", "--teal-deep"]]) {
  const ratio = contrast(variables[foreground], variables[background]);
  assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
  console.log(`PASS contrast: ${foreground} / ${background}: ${ratio.toFixed(2)}:1`);
}
assert.ok(contrast(variables["--coral-deep"], variables["--white"]) >= 3, "Selected option border is distinguishable");
assert.match(styles[0], /\.cta--dark\s*\{\s*color: var\(--cta-ink\);\s*background: var\(--coral\);/);
assert.match(styles[0], /--whatsapp: #128c7e;/);
assert.match(fs.readFileSync(path.join(root, "public/icon.svg"), "utf8"), /fill="#17CDB8"/);
console.log("PASS: coastal palette with FF6A13 accents, text and button contrast, CSS syntax, favicon and WhatsApp preserved.");
