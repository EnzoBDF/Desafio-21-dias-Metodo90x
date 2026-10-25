const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const pages = [
  ["Desafio 21", ".next/server/app/index.html"],
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
    assert.doesNotMatch(html, /<video\b|id="apresentacao"|href="#apresentacao"/);
    assert.equal((html.match(/class="pcard result-card"/g) || []).length, 7);
    assert.match(html, /href="#investimento"/);
    assert.match(html, /id="investimento"/);
    assert.equal((html.match(/<details class="acc"/g) || []).length, 6);
    assert.match(html, /id="checkout"/);
  } else if (name === "Desafio 21") {
    assert.match(html, /<video\b/); // Only Projeto Verão loses its video section.
    assert.match(html, /aria-label="De 397 reais por 97 reais"/);
  }
  console.log(`PASS: ${name}: De R$ 397 por R$ 97`);
}

const quizHtml = fs.readFileSync(path.join(workspace, "projeto-verao/.next/server/app/index.html"), "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
assert.equal((quizHtml.match(/<h1\b/g) || []).length, 1, "Quiz: uma pergunta visível");
assert.equal((quizHtml.match(/type="radio"/g) || []).length, 4, "Quiz: quatro opções iniciais");
assert.match(quizHtml, /href="\/oferta"/);
assert.doesNotMatch(quizHtml, /href="https:\/\/payfast/);
console.log("PASS: quiz inicial separado da oferta, sem checkout antecipado.");

const analysisHtml = fs.readFileSync(path.join(workspace, "projeto-verao/.next/server/app/analise.html"), "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
assert.match(analysisHtml, /href="\/oferta"/);
assert.doesNotMatch(analysisHtml, /href="https:\/\/payfast/);
assert.match(analysisHtml, /noindex/);
console.log("PASS: análise intermediária gerada, com saída para a oferta e sem checkout antecipado.");

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
console.log("PASS: Projeto Verão: seven records, six FAQ items, offer navigation and event prices verified.");
