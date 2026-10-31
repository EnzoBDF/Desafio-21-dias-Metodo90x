const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read(".next/server/app/index.html").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.ok(html.indexOf('aria-labelledby="social-proof-title"') < html.indexOf('aria-labelledby="pain-title"'), "Real proof follows the hero");
for (const title of ["hero-title", "social-proof-title", "pain-title", "how-title", "message-title", "included-title", "routine-title", "support-title", "community-title", "pricing-title", "guarantee-title", "faq-title", "closing-title"]) {
  assert.match(html, new RegExp(`id="${title}"`), `Section preserved/added: ${title}`);
}
for (const phrase of ["não acompanham o seu esforço", "5 treinos por semana", "1h15 por sessão", "24 horas", "imediatamente após a confirmação", "dieta básica como recomendação", "E-book Bumbum na Nuca", "Pagamento único pelo desafio de 30 dias", "Garantia de 7 dias"]) {
  assert.ok(text.includes(phrase), phrase);
}
assert.doesNotMatch(text, /\b21\s+dias\b|casa ou academia|\bXXXX?\b|\[Nome da aluna\]/i);
assert.doesNotMatch(html, /\/images\/(?:Bumbum[23]?|Desafio21Logo)\.png|\/Capa%20Video\.webp|url=\/logo\.png/i);
assert.equal((text.match(/Por trás de cada resultado/g) || []).length, 1, "No duplicated proof introduction");
assert.equal((text.match(/Assista à apresentação do desafio/g) || []).length, 1, "No duplicated video introduction");
for (const image of ["bumbum-na-nuca-campanha-20261025.jpeg", "desafio-30-dias-logo-20261025.jpeg"]) {
  assert.ok(html.includes(image));
  assert.ok(fs.statSync(path.join(root, "public/images", image)).size > 0);
}
const checkout = [...html.matchAll(/href="(https:\/\/(?:pay\.hotmart\.com|payfast\.greenn\.com\.br)\/[^\"]+)"/g)].map(match => match[1]);
assert.ok(checkout.length >= 10);
assert.ok(checkout.every(href => href === "https://payfast.greenn.com.br/rgv6ce5/offer/Y51w9m?ch_id=144903"), "All purchase CTAs use the new checkout");
for (let index = 0; index < 10; index++) assert.match(html, new RegExp(`id="faq-answer-${index}"`));
const details = read(".next/server/app/desafios/bumbum-na-nuca.html").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
assert.doesNotMatch(details.replace(/<[^>]+>/g, " "), /\b21\s+dias\b|casa ou academia/i);
assert.ok(details.includes("bumbum-na-nuca-campanha-20261025.jpeg"));
console.log("PASS: 30-day academy-only copy, 13 sections, 8 inclusions, 10 FAQs, confirmed routine/support, original assets and checkout.");
