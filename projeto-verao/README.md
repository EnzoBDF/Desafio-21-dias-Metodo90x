# Projeto Verão: Magra e Definida

Cópia independente da base Next.js do Desafio 21 Dias, com uma landing completamente redesenhada. Os arquivos da landing original não foram alterados. Esta pasta tem configurações, dependências, imagens e execução próprias; também pode ser movida para outro local ou repositório.

## Abrir o projeto

Abra um terminal **nesta pasta** e execute:

```sh
npm install
npm run dev
```

Acesse http://localhost:3002. A porta 3002 permite visualizar o novo produto sem parar o site original. O servidor local aceita apenas conexões da própria máquina.

Para a versão de produção local:

```sh
npm run build
npm start
```

Para revisar o código: `npm run lint`.

## Identidade

- Paleta original restaurada: turquesa `#a9e5e2`; azul-oceano `#073e44`.
- Amarelo-sol: `#ffe36e`; coral: `#f58268`; branco: `#fffef9`.
- DM Sans para leitura e títulos; Cormorant Garamond em itálico para os destaques editoriais.
- Estrutura editorial preservada: tipografia com serifas no hero, bordas finas e composição fotográfica assimétrica, agora com as cores originais de verão.
- Hero com fotografia de praia, cinco benefícios em grade, registros reais, manifesto de bem-estar, passos de participação, oferta de R$ 397 por R$ 97 e FAQ. Seção de vídeo removida.
- Rolagem livre; animações sutis respeitam a preferência de movimento reduzido. Conteúdo permanece visível sem JavaScript.

## Onde editar

- Textos, seções e pilares: `app/page.tsx`.
- Cores, fontes aplicadas e responsividade: `app/globals.css`.
- Importação das fontes e informações para buscadores: `app/layout.tsx`.
- Checkout e convite do grupo de WhatsApp: `lib/links.ts`.
- Perguntas frequentes e menu: `components/SummerExperience.tsx`.
- Foto otimizada: `public/images/verao-praia.webp`.
- Marca/favicon: `public/icon.svg`.
- Fotos reais: `lib/media.ts`.

## Fotos reais

A seção de vídeo foi removida. A seção de registros reais contém sete montagens fotográficas enviadas pelo responsável pelo projeto, sem cortes nem alterações nas imagens. Nenhuma imagem de campanha é usada como prova social.

1. Coloque as fotos autorizadas em `public/images/evidencias/`. Acrescente cada uma em `EVIDENCE_PHOTOS` com `src` e `alt`, por exemplo `{ src: "/images/evidencias/registro-01.webp", alt: "Descrição fiel do registro autorizado" }`. A galeria substitui automaticamente os espaços reservados, sem legendas comerciais, mantendo a foto inteira, sem cortar o conteúdo.
2. Publicar apenas evidências reais e autorizadas relacionadas ao novo produto. Não colocar dados pessoais no `alt`. Não usar material ilustrativo como resultado, nem inventar nomes, prazos, números ou depoimentos.

Os registros usam `components/SummerEvidenceSlider.tsx`: avanço automático a cada 5 segundos quando o slider está visível, com ida e volta sem duplicar fotos. O toque usa rolagem horizontal nativa, sem bloquear a rolagem vertical da página. Interações manuais adiam o avanço, que também pausa durante toque, hover de mouse, foco de teclado ou aba oculta. Há setas, indicadores e controle de pausa. A preferência de movimento reduzido desativa o automático e a rolagem animada. As imagens continuam inteiras, sem cortes.

Teste de lógica do slider (sem simular um navegador real): `node tests/evidence-slider.cjs`.

Para atualizar uma versão de produção local, gere o build novamente e reinicie o servidor. No modo de desenvolvimento, as alterações aparecem automaticamente.

Todos os CTAs de inscrição abrem o checkout informado: `https://payfast.greenn.com.br/5juz3g3/offer/EZNgz9?ch_id=144371`. A única exceção é o botão flutuante no canto inferior direito, com símbolo do WhatsApp, que abre `https://chat.whatsapp.com/DsGosxOC3WTLmz5tUBKzXI`. Menu, FAQ e links de navegação continuam com suas funções. Os destinos estão centralizados em `lib/links.ts`. Não há preços inventados, promessas de prazo nem depoimentos reaproveitados.

## Analytics opcional

Nenhuma credencial do projeto original foi copiada. Para ativar o PostHog, crie um `.env.local` a partir de `.env.example`, preferencialmente com um projeto separado. Os eventos identificam `product: projeto_verao_magra_e_definida` e registram `checkout_link_clicked` por posição do CTA, `whatsapp_group_link_clicked` no botão flutuante, seções vistas e dúvidas abertas. Um clique não confirma compra, entrada no grupo ou mensagem enviada.

## Imagem de campanha

A foto é ilustrativa, gerada com a skill `imagegen` e a ferramenta integrada de geração de imagens. Não representa uma aluna nem comprova resultados. O original está em `public/images/verao-praia-original.png`; a página usa uma versão WebP de aproximadamente 141 KB. O prompt completo está em `ASSETS.md`.

## Validação e publicação

Build, lint e revisão de tamanhos de tela fazem parte da entrega. A cópia não foi publicada e não altera qualquer domínio ou hospedagem existente. A versão do Next.js foi atualizada apenas nesta pasta para corrigir alertas herdados da base.

Na auditoria de dependências, o alerta crítico de runtime foi corrigido na cópia. Permanecem cinco alertas altos na cadeia de ferramentas de lint (`braces` → `micromatch` → `fast-glob` → plugin/config do ESLint). O reparo automático sugerido faz downgrade incompatível do ESLint do Next.js; por isso não foi forçado. As dependências da landing original não foram atualizadas.
