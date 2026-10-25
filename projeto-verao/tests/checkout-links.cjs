const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(
  path.resolve(__dirname, "../.next/server/app/oferta.html"),
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
console.log("PASS: nove CTAs da oferta com o checkout correto e WhatsApp preservado.");
