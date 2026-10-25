# Projeto Verão: Magra e Definida

Cópia independente da base Next.js do Desafio 21 Dias, com um quiz e uma página de oferta próprios. Os arquivos da landing original não foram alterados. Esta pasta tem configurações, dependências, imagens e execução próprias; também pode ser movida para outro local ou repositório.

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

## Oferta adaptada à referência — 25/10/2026

Depoimentos: `/oferta#depoimentos-video` mantém cinco espaços verticais aguardando arquivos; `/oferta#depoimentos-texto` contém os cinco prints fornecidos, inteiros, em duas colunas no desktop e uma no celular. Espaços de texto sem conteúdo e o grupo vazio são omitidos. Conteúdo centralizado em `lib/testimonials.ts`, renderização em `components/SummerTestimonials.tsx`, com suporte a vídeo com capa/legendas, relato escrito ou print. Veja `DEPOIMENTOS.md` para preencher. As fotos existentes permanecem nas seções próprias.

Refinamento visual aprovado: abertura em duas colunas no desktop com a foto de praia existente, marca maior e composição empilhada no celular. A foto foi movida dos benefícios para a abertura. Galeria com proporções naturais, três colunas no desktop, duas no tablet e uma no celular; dimensões originais registradas em `lib/media.ts`. Título encurtado para “Resultados de alunas”. Cartão de oferta com preço anterior tachado, R$ 97 em destaque, parcelas, cinco benefícios e garantia junto à inscrição. Textos móveis ampliados e espaçamento superior reduzido. WhatsApp passa para o cabeçalho nas telas pequenas, liberando os textos. Evidências em `reference/refinements/`.

Atualização de identidade: a estrutura da referência agora usa novamente DM Sans e Cormorant Garamond, paleta coral/areia/pêssego e textos azul profundo. A abertura tem entrada em sequência; 49 blocos aparecem uma única vez ao entrar na tela. Botões, fotos de comunidade e FAQ têm transições suaves. Sem bibliotecas extras, parallax ou rolagem controlada por JavaScript. O conteúdo é visível sem JavaScript; a preferência por movimento reduzido desativa os efeitos. Esta atualização substitui as cores e fontes da referência descritas no histórico abaixo.

A rota `/oferta` segue a estrutura de https://rebueno.com.br/analisepaginabatista/: fundo preto, Inter e Plus Jakarta Sans, títulos centralizados, botões com borda em degradê, provas sociais, público, método, apresentação, benefícios e bônus, preço, garantia, FAQ e fechamento. Esta revisão substitui o layout anterior da oferta descrito abaixo; quiz e análise mantêm a identidade coral/areia.

O conteúdo fica em `components/SummerReferenceOffer.tsx`. Os estilos da referência estão isolados em `app/oferta/offer.css`; os ajustes para a marca e as imagens existentes ficam em `app/oferta/adaptations.css`. Os sete registros aparecem inteiros, em grade, sem slider. As quatro fotos de comunidade já existentes no repositório foram copiadas para `public/images/comunidade/`. A praia continua identificada como imagem de campanha. Não foram criados vídeos, depoimentos, números de alunas ou dados profissionais fictícios para preencher os marcadores da referência.

Os nove botões de inscrição, incluindo os dois blocos de depoimentos, usam o checkout centralizado em `lib/links.ts`; WhatsApp, Instagram e reinício do quiz permanecem disponíveis. A oferta usa a chamada fixa da referência. As respostas do quiz continuam disponíveis na análise, mas não personalizam mais o título da oferta.

Validação: build/TypeScript, ESLint de `app`, `components`, `lib` e script de preparação; testes de checkout, quiz e paleta. Conferência no navegador em 320, 390, 768 e 1440 px, FAQ, links e imagens. Evidências e comparação visual em `reference/`; relatório em `design-qa.md`. `npm run lint` ainda acusa o uso de CommonJS nos testes `.cjs` preexistentes.

## Identidade anterior e quiz

- Paleta atual: turquesa `#17CDB8`, laranja `#FF6A13`, amarelo-sol `#FFD44F` e texto verde-petróleo `#083E45`.
- Superfícies claras e verde-água; profissionais sobre preto `#000000`, combinando com a foto. Botões usam texto mais escuro `#052F34` para contraste sobre o laranja. Oferta, quiz e análise compartilham a identidade. WhatsApp mantém o verde de identificação. Esta paleta substitui as cores descritas no histórico acima.
- DM Sans para leitura e títulos; Cormorant Garamond em itálico para os destaques editoriais.
- Estrutura editorial preservada: tipografia com serifas no hero, bordas finas e composição fotográfica assimétrica, agora com a identidade solar coral + areia.
- Refinamento premium: tipografia editorial, moldura fotográfica, cantos suaves e sombras discretas. Quiz com ícones, seis segmentos de progresso, destaque coral da resposta e feedback curto por etapa. Privacidade disponível em um painel expansível, sem alterar o fluxo.
- Teste `node tests/palette.cjs`: valida as cores, sintaxe dos estilos, contraste dos principais textos e botões, seleção e favicon. Nomes antigos de variáveis de cor são mantidos como aliases para compatibilidade dos estilos compartilhados.
- Entrada `/`: quiz com seis perguntas, uma por vez, seleção única, progresso, avanço explícito e retorno com respostas preservadas.
- Ao concluir, navega para `/analise`: apresentação animada de 5 segundos, seguida do resumo das seis escolhas em foco, ritmo e apoio. O visitante pode pular com “Ver resumo agora”. Os textos indicam organização das respostas, não processamento por IA, diagnóstico, prescrição ou pontuação de saúde.
- Da análise, segue para `/oferta`: hero contextualizado, sete registros reais no slider e checkout de R$ 397 por R$ 97 com os cinco benefícios.
- A oferta também aceita acesso direto, com chamada genérica. Vídeo e seções longas da antiga landing não fazem parte do novo fluxo.
- Rolagem livre; animações respeitam movimento reduzido. O quiz precisa de JavaScript; sem ele, há um link para a oferta, cujo conteúdo principal é renderizado no servidor.
- Usabilidade no celular: entrada diretamente na pergunta, textos mais curtos, opções e ações maiores, progresso visível ao avançar e retorno com a escolha anterior preservada. No desktop, a composição editorial continua presente.
- “Ver investimento” e “Ver o que está incluído” levam ao cartão com preço, benefícios e inscrição. “Refazer o quiz” limpa o resultado concluído anterior antes de reiniciar.

## Fluxo do quiz

As perguntas abordam objetivo, momento atual, local de treino, frequência desejada, dificuldade de rotina e prioridade de apoio. Não são solicitados nome, contato, peso ou informações clínicas. Não há diagnóstico, plano calculado, promessa de resultado ou carregamento fictício.

As respostas completas e validadas ficam em `sessionStorage`, na chave versionada `projeto-verao:quiz:v1`, para compor o resumo e contextualizar o hero nesta aba. Não são incluídas na URL nem enviadas ao checkout. Sem respostas válidas ou com armazenamento bloqueado, a análise oferece saídas para responder ao quiz ou conhecer a oferta genérica. A proposta comercial e o programa não mudam com as respostas.

As escolhas em andamento são preservadas ao usar Voltar dentro do formulário, não ao recarregar a página. Não há salvamento de rascunho. A revisão visual atual percorreu as seis perguntas e a oferta em navegador, com teclado e telas de 320, 390 e 1440 px; gesto físico de toque e compra não foram testados.

Testes de lógica e componentes com hooks simulados (não substituem teste em navegador): `node tests/quiz.cjs`. Após `npm run build`, execute `node tests/checkout-links.cjs` para conferir os três links de compra e o WhatsApp no HTML da oferta.

## Onde editar

- Entrada do quiz: `app/page.tsx`; perguntas e transições: `lib/quiz.ts`; formulário: `components/SummerQuiz.tsx`.
- Página de oferta e benefícios: `app/oferta/page.tsx`; resumo: `components/SummerOfferIntro.tsx`.
- Análise intermediária: `app/analise/page.tsx`, `app/analise/analysis.css`, `components/SummerQuizAnalysis.tsx`; leitura compartilhada das respostas: `lib/useQuizAnswers.ts`.
- Abertura animada: `components/SummerAnalysisLoading.tsx`; duração e mensagens: `lib/analysisPresentation.ts`. Animações decorativas são desativadas com preferência de movimento reduzido; foco vai ao título quando o resumo é revelado. Temporizadores são cancelados ao sair ou pular.
- Cores e estilos compartilhados: `app/globals.css`; quiz e ajustes da oferta: `app/quiz.css`.
- Importação das fontes e informações para buscadores: `app/layout.tsx`.
- Checkout e convite do grupo de WhatsApp: `lib/links.ts`.
- Observação das seções da oferta: `components/SummerExperience.tsx`.
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

Os três CTAs de inscrição da oferta abrem `https://payfast.greenn.com.br/195687/offer/1Zhmro?ch_id=144371`. O botão flutuante da oferta abre `https://chat.whatsapp.com/DsGosxOC3WTLmz5tUBKzXI`. No quiz, Continuar avança e o último botão leva à análise. O botão da análise leva à oferta, não ao checkout. Os destinos externos estão centralizados em `lib/links.ts`.

## Analytics opcional

Nenhuma credencial do projeto original foi copiada. Para ativar o PostHog, crie um `.env.local` a partir de `.env.example`, preferencialmente com um projeto separado. Os eventos identificam `product: projeto_verao_magra_e_definida` e registram `checkout_link_clicked` por posição do CTA, `whatsapp_group_link_clicked` no botão flutuante, seções vistas e dúvidas abertas. Um clique não confirma compra, entrada no grupo ou mensagem enviada.

## Imagem de campanha

A foto é ilustrativa, gerada com a skill `imagegen` e a ferramenta integrada de geração de imagens. Não representa uma aluna nem comprova resultados. O original está em `public/images/verao-praia-original.png`; a página usa uma versão WebP de aproximadamente 141 KB. O prompt completo está em `ASSETS.md`.

## Validação e publicação

Execute os testes e a compilação antes de publicar. O projeto Vercel do Projeto Verão usa Root Directory `projeto-verao`; a landing Desafio 21 permanece na raiz. Alterações locais não são publicadas sem commit/push ou nova publicação. Veja `VALIDACAO.md` para os testes efetivamente realizados e seus limites.

Na auditoria de dependências, o alerta crítico de runtime foi corrigido na cópia. Permanecem cinco alertas altos na cadeia de ferramentas de lint (`braces` → `micromatch` → `fast-glob` → plugin/config do ESLint). O reparo automático sugerido faz downgrade incompatível do ESLint do Next.js; por isso não foi forçado. As dependências da landing original não foram atualizadas.
