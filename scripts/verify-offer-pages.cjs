const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const pages = [
  ["Bumbum na Nuca 30 Dias", ".next/server/app/index.html"],
  ["Detalhes Bumbum na Nuca", ".next/server/app/desafios/bumbum-na-nuca.html"],
  ["Projeto Verão", "projeto-verao/.next/server/app/oferta.html"],
];

for (const [name, file] of pages) {
  const html = fs.readFileSync(path.join(workspace, file), "utf8");
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  assert.match(text, /De\s+R\$\s*397/, `${name}: preço original`);
  assert.match(text, /(?:R\$\s*97|por\s+97)/, `${name}: preço promocional`);
  assert.doesNotMatch(text, /R\$\s*(?:199,90|99,90|497\b|197\b)/, `${name}: sem preços antigos`);
  if (name === "Projeto Verão") {
    assert.doesNotMatch(html, /id="apresentacao"|href="#apresentacao"/);
    assert.doesNotMatch(html, /id="depoimentos-video"|Ouça de quem já fez/);
    assert.match(html, /id="depoimentos-texto"/);
    assert.equal((html.match(/class="pcard result-card"/g) || []).length, 4);
    assert.doesNotMatch(html, /registro-real-(?:01|03|05|06)\./);
    assert.match(html, /registro-real-08\.png/);
    assert.match(html, /registro-real-04-vestido\.png/);
    assert.match(html, /registro-real-04-academia\.png/);
    assert.match(html, /href="#investimento"/);
    assert.match(html, /id="investimento"/);
    assert.equal((html.match(/<details class="acc"/g) || []).length, 6);
    assert.match(html, /id="checkout"/);
  } else if (name === "Bumbum na Nuca 30 Dias") {
    assert.match(html, /<video\b/); // Only Projeto Verão loses its video section.
    assert.match(html, /aria-label="De 397 reais por 97 reais"/);
  }
  console.log(`PASS: ${name}: De R$ 397 por R$ 97`);
}

const landingHtml = fs.readFileSync(path.join(workspace, "projeto-verao/.next/server/app/index.html"), "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
assert.equal((landingHtml.match(/<h1\b/g) || []).length, 1, "Landing: um título principal");
assert.doesNotMatch(landingHtml, /<form\b|type="radio"|Responder ao quiz|Refazer o quiz|sete perguntas/i);
assert.match(landingHtml, /id="historias"/);
assert.match(landingHtml, /id="investimento"/);
assert.match(landingHtml, /href="https:\/\/payfast/);
console.log("PASS: página inicial é a landing completa, sem quiz ou análise intermediária.");

const analysisHtml = fs.readFileSync(path.join(workspace, "projeto-verao/.next/server/app/analise.html"), "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
const analysisMeta = JSON.parse(fs.readFileSync(path.join(workspace, "projeto-verao/.next/server/app/analise.meta"), "utf8"));
assert.equal(analysisMeta.status, 308);
assert.equal(analysisMeta.headers.location, "/");
assert.doesNotMatch(analysisHtml, /href="https:\/\/payfast/);
assert.doesNotMatch(analysisHtml, /<form\b|analysis-loading|analysis-cards/);
console.log("PASS: antiga análise redireciona diretamente à landing.");

const rootSourceFiles = [
  "app/desafios/[slug]/page.tsx",
  ...fs.readdirSync(path.join(workspace, "components"))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => `components/${file}`),
];
for (const file of rootSourceFiles) {
  assert.doesNotMatch(fs.readFileSync(path.join(workspace, file), "utf8"),
    /(?:offer_price:\s*99\.9|original_price:\s*199\.9)/,
    `${file}: preço antigo nos eventos`);
}
console.log("PASS: Projeto Verão: four records, paired photos, six FAQ items, offer navigation and event prices verified.");
