const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

for (const page of ["index", "oferta"]) {
const html = fs.readFileSync(
  path.resolve(__dirname, `../.next/server/app/${page}.html`),
  "utf8",
);
const checkoutHrefs = [...html.matchAll(/href="(https:\/\/payfast\.greenn\.com\.br\/[^\"]+)"/g)]
  .map((match) => match[1]);
assert.equal(checkoutHrefs.length, 9, "Os nove CTAs, incluindo os dois blocos de depoimentos, devem estar presentes");
for (const href of checkoutHrefs) {
  assert.equal(href, "https://payfast.greenn.com.br/195687/offer/1Zhmro?ch_id=144371");
}
assert.doesNotMatch(html, /5juz3g3|EZNgz9/);
assert.match(html, /href="#investimento"/);
assert.match(html, /id="investimento"/);
assert.equal(
  (html.match(/href="https:\/\/chat\.whatsapp\.com\/DsGosxOC3WTLmz5tUBKzXI"/g) || []).length,
  1,
  "O botão flutuante de WhatsApp deve ser preservado",
);
assert.doesNotMatch(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""), /Responder ao quiz|Refazer o quiz|<form\b|type="radio"/i);
console.log(`PASS: ${page}: nove CTAs com o checkout correto, WhatsApp preservado e sem formulário.`);
}
