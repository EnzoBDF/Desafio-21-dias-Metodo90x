# Verificação da cópia

## Etapas, profissionais e bônus — 25/10/2026

- Método com três cartões numerados e ícones existentes; profissionais sobre fundo azul-marinho, foto e apresentação lado a lado no computador; quatro bônus em cartões individuais, separados do programa principal.
- Celular com os blocos em uma coluna. Foto fornecida preservada inteira; fontes, paleta e pulsos dos CTAs mantidos.
- Conferência visual comparativa com a versão anterior em 488 × 884; composição desktop em 1440 × 1000. Também verificadas larguras 320 e 768 px. Sem rolagem horizontal; FAQ funcionando e console sem erros/avisos.
- Build/TypeScript, ESLint de app/components/lib, verificação compartilhada das ofertas e testes de checkout/paleta passaram. Sete links de compra e WhatsApp preservados.
- Capturas, medidas e comparações em `reference/aesthetic-update/`; avaliação em `design-qa.md`. Prévia local atualizada, sem publicação.

## Pulsos leves nos CTAs — 25/10/2026

- Sete botões de inscrição recebem um halo coral discreto com ciclo de 4,8 segundos e intervalo entre pulsos. A animação usa apenas opacidade e transformação de uma camada sem eventos de ponteiro; texto, posição e área de clique permanecem estáveis.
- Pausa ao passar o mouse, focar pelo teclado ou pressionar. Efeito habilitado apenas sem preferência de movimento reduzido. WhatsApp mantém seu comportamento atual.
- Build/TypeScript passou. Navegador confirmou a animação nos sete CTAs e a pausa no foco; sem rolagem horizontal em 390px. Captura: `reference/cta-pulse.png`.

## Profissionais do Método 90X — 25/10/2026

- Foto do grupo substituída pela imagem anexada de Israel Correia e Batista em `public/images/equipe-metodo-90x.jpeg`, com SHA-256 idêntico ao original. Imagem inteira, proporção quadrada e nomes no texto alternativo.
- Bloco passa a “Os profissionais do Método 90X”, com apresentação conjunta de Israel Correia e Batista e link da equipe. Nenhuma formação, função individual específica, registro profissional ou experiência não informada foi acrescentada.
- Navegador em 390/1440px: imagem carregada, sem rolagem horizontal; 520 × 520px no desktop, sem cortes. Console sem erros/avisos. Capturas em `reference/team/`.
- Build/TypeScript, lint do componente e teste dos sete links de inscrição passaram. Sem publicação.

## Cabeçalho e WhatsApp — 25/10/2026

- Cabeçalho “Projeto Verão” removido da oferta. WhatsApp fixo no canto inferior direito em desktop e celular, com margem móvel de 16px e respeito à área segura do aparelho.
- Conferência no navegador em 390 e 1440px: nenhum header; botão com posição fixa e margem inferior de 16/22px, respectivamente. Sem rolagem horizontal no celular.
- Build/TypeScript, lint do componente e teste dos links de compra passaram. Evidência: `reference/mobile-background/mobile-no-header.png` e comparação correspondente.

## Imagem de fundo na abertura móvel — 25/10/2026

- Até 734px, a foto de praia existente cobre toda a primeira seção, com camada clara em degradê e texto azul profundo. Botão acima da imagem, camada visual sem interceptar cliques e identificação de campanha ao pé da seção. Sem nova imagem ou repetição da foto abaixo do texto.
- Navegador em 390px confirmou dimensões da imagem iguais às da seção e botão com eventos ativos. Em 320/390px, sem rolagem horizontal; desktop conferido com imagem lateral. Console sem erros/avisos.
- Build/TypeScript, lint do componente e sete links de inscrição passaram. Comparação visual em `reference/mobile-background/comparison.jpg`; capturas móvel e desktop na mesma pasta.

## Quatro refinamentos aprovados — 25/10/2026

- Abertura com foto existente de praia à direita no desktop, composição empilhada no celular e marca ampliada.
- Comparativos com largura/altura originais, sem recorte; cartões em colunas adaptadas às proporções, com título curto. Verificação no navegador dos sete registros: diferença de razão de aspecto menor que 0,001; nenhuma imagem quebrada.
- Oferta com R$ 97 em destaque, preço original tachado, parcelas em apoio, cinco benefícios e garantia próximos ao botão. Mesmo checkout.
- Celular com menos espaço acima da chamada, condições e garantia em 14px e WhatsApp no cabeçalho, sem sobrepor o texto. Em 320px, marca termina em x=178,6 e botão começa em x=245; sem colisão. Sem rolagem horizontal em 320/390/768/1440px.
- Build/TypeScript e ESLint da aplicação passaram. Testes existentes de quiz, paleta, checkout e verificação compartilhada das ofertas passaram. FAQ aberto/fechado e foco dos botões conferidos. Console sem erros/avisos. Animações e preferência de movimento reduzido preservadas.
- Prévia local atualizada, inclusive a aba já aberta pelo usuário. Sem publicação. Capturas antes/depois em `reference/refinements/`.

## Identidade de verão e animações — 25/10/2026

- Estrutura, imagens e destinos mantidos. Oferta volta a usar DM Sans/Cormorant Garamond e variáveis originais coral, areia, pêssego, azul e amarelo. Importações de Inter/Plus Jakarta Sans removidas, sem baixar fontes duplicadas.
- Abertura em sequência; revelação de 49 blocos por IntersectionObserver, com opacidade e deslocamento curtos. Blocos permanecem visíveis após entrar. Transições em botões, fotos de comunidade e abertura do FAQ. Conteúdo do servidor permanece visível sem JavaScript; CSS e observador respeitam movimento reduzido, incluindo mudança de preferência durante a sessão.
- Navegador: famílias e cores computadas conferidas; página inteira percorrida no desktop e celular, com 49 blocos visíveis e nenhum pendente ao fim. Telas de 320, 390 e 1440 px sem rolagem horizontal. Nenhuma imagem quebrada; FAQ aberto e fechado. Console sem erros ou avisos.
- Build/TypeScript, ESLint da aplicação e testes de quiz, paleta e sete links de checkout passaram. Preferência de movimento reduzido revisada no código, sem alteração nas configurações do computador.
- Capturas em `reference/summer/`. Mudanças locais, sem publicação.

## Adaptação à referência Rebueno — 25/10/2026

- `/oferta` reconstruída com estrutura, tokens, tipografia, espaçamentos e responsividade extraídos da referência fornecida. Marca do Projeto Verão mantida. Quiz e análise preservados.
- Sete registros completos distribuídos em grade e destaque; quatro fotos existentes da comunidade substituem os espaços de vídeo. Foto de campanha mantida nos benefícios. Nenhuma nova imagem ou mídia fictícia criada.
- Sete links de inscrição com o checkout existente, WhatsApp, Instagram, reinício do quiz e âncora de investimento preservados. FAQ nativo com seis perguntas e primeira aberta.
- Build de produção e TypeScript passaram. ESLint de código da aplicação passou; lint global ainda aponta `require()` nos testes CommonJS anteriores. Testes de quiz, paleta e sete links de compra passaram.
- Referência e implementação capturadas em 1440 × 1000 e 390 × 844, com comparações lado a lado. Telas adicionais de 320 × 740 e 768 × 1024 sem rolagem horizontal. Imagens carregadas sem falhas; console sem erros ou avisos. Abertura e fechamento das seis perguntas e âncora de investimento testados.
- Apenas alteração local, sem publicação ou compra. Capturas em `reference/`; revisão visual em `design-qa.md`.

## Apresentação animada da análise — 19/10/2026

- Adicionada abertura de 5 segundos antes do resumo, com sol, anéis e ícones animados; mensagens em três etapas (objetivo, rotina, apoio). Identidade coral/areia preservada. Não há alegação de algoritmo, IA ou avaliação clínica; a interface descreve organização das escolhas.
- Tempo de apresentação centralizado em `ANALYSIS_PRESENTATION_DURATION = 5000`, com mensagens em 0, 1600 e 3300 ms. Teste com relógio simulado confirma que o resumo não aparece antes de 5000 ms e aparece ao término. “Ver resumo agora” permite pular; unmount/skip limpam temporizadores.
- Preferência de movimento reduzido mantém mensagens e resumo sem animações decorativas. Quando o resumo aparece, o foco vai ao título e a rolagem mostra o início do conteúdo. Não há navegação automática ao checkout.
- Navegador: abertura observada e capturada em 390 × 844; etapa intermediária e revelação automática do resumo conferidas, com foco em `analysis-title`. Em 320 × 740, apresentação sem rolagem horizontal, e botão de pular testado com Enter, revelando o resumo. Viewport restaurado; respostas existentes preservadas. Não houve teste completo de leitor de tela nem em dispositivo físico.
- Compilação de produção com Webpack/TypeScript, ESLint dos componentes envolvidos e testes de quiz, paleta, slider, checkout e ofertas geradas passaram. Revisão React orientou dependências estáveis, temporizadores com limpeza, estado local e foco acessível.
- Capturas: `.artifacts/ux-audit/23-analise-carregamento.png`, `24-analise-revelada.png` e `25-carregamento-320.png`.
- Apenas mudanças locais, sem commit, push ou publicação. Esta abertura opcional substitui a ausência de espera documentada na revisão anterior abaixo.

## Página de análise intermediária — 19/10/2026

- Novo percurso: `/` → `/analise` → `/oferta`. Último botão do quiz agora é “Ver minha análise”; sem redirecionamento automático nem espera artificial. Acesso direto à oferta permanece possível.
- Análise agrupa as seis escolhas em três cards: foco, ritmo e apoio. Comentários variam com momento de treino e dificuldade declarada. Não calcula plano, diagnóstico, pontuação ou estimativa de resultado. Oferta e preço não mudam conforme respostas.
- Leitura compartilhada de `sessionStorage` com snapshot de servidor estável e assinaturas com limpeza. Não há nova API, cadastro, respostas na URL ou envio ao checkout. Sem respostas válidas, existem saídas para quiz e oferta; sem JavaScript, link direto para oferta.
- Testes de quiz ampliados passaram: destino intermediário, todas as opções refletidas no resumo, carregamento inicial sem resultado inventado, falta de dados, armazenamento bloqueado, reinício e oferta contextualizada. Testes de paleta (incluindo novo CSS), slider, checkout e ofertas geradas passaram.
- Build de produção com Webpack e TypeScript passou, incluindo `/analise` estática. ESLint dos componentes e biblioteca envolvidos sem erros.
- Navegador: seis perguntas respondidas por teclado em aba de teste separada, chegada à análise com as seis escolhas e continuidade à oferta conferidas. Respostas já existentes na aba do usuário preservadas. Layout conferido em 320, 390 e 1440 px; sem elementos de controle/títulos extrapolando horizontalmente no ponto de 320 px. Três colunas no desktop, uma no celular. Viewports temporários restaurados e abas auxiliares fechadas.
- Capturas de viewport em `.artifacts/ux-audit/20-analise-celular.png`, `21-analise-proximo-passo.png` e `22-analise-desktop-final.png`. Não houve compra, teste físico de toque ou auditoria completa de leitor de tela.
- Revisão React orientou a separação entre rota de servidor e resumo cliente, derivação das informações sem efeitos ou temporizadores, snapshot estável e validação das escolhas antes de exibir conteúdo.
- Sem commit, push ou publicação. Desafio 21 preservado.

## Usabilidade e percurso completo — 19/10/2026

- Auditoria visual antes e depois realizada no navegador integrado, com capturas locais em `.artifacts/ux-audit/`. Relatório: `.artifacts/ux-audit/auditoria.md`. Esta revisão atualiza as limitações visuais registradas nas revisões históricas abaixo.
- Entrada móvel simplificada para mostrar pergunta, quatro escolhas e Continuar no viewport de 390 × 844. Textos mais curtos e legíveis, áreas de ação maiores e título editorial sem palavras coladas. Composição desktop e paleta coral + areia preservadas.
- Seis etapas percorridas até `/oferta`. Seleção com Espaço, avanço com Enter, foco na pergunta, progresso visível e retorno mantendo resposta conferidos em navegador. Sem avanço automático nem bloqueio de rolagem.
- Resumo contextualizado conferido após a conclusão; Refazer limpa o resultado anterior e permite acesso direto à oferta genérica. Nenhuma nova coleta de dados ou persistência de rascunho adicionada.
- Links internos de investimento agora chegam ao cartão: preço, cinco benefícios e botão aparecem juntos no viewport de 390 × 844. Preço R$ 397 por R$ 97 e três destinos de checkout preservados. Navegação manual do slider conferida (1/7 → 2/7).
- Layout observado em 320 × 740, 390 × 844 e 1440 × 1000. Sem controles extrapolando horizontalmente nos pontos medidos. Viewport temporário restaurado ao terminar. Console sem erros capturados no percurso.
- Compilação de produção com TypeScript passou via `node node_modules/next/dist/bin/next build --webpack`. Testes de quiz, contraste/paleta, slider, checkout e ofertas geradas passaram; `git diff --check` sem erros de espaçamento.
- Limites: não houve teste físico de toque, leitor de tela completo, compra na Greenn ou mensuração de aumento de conversão. Testes de lógica de autoplay/movimento reduzido não substituem teste no aparelho. Screenshot de página inteira falhou; capturas de viewport foram salvas e inspecionadas.
- Somente alterações locais, sem commit, push ou publicação. Site original do Desafio 21 e arquivos não relacionados preservados.

## Paleta coral + areia — 19/10/2026

- Aplicada ao quiz, oferta, estados de seleção, botões, detalhes e favicon. Coral `#E98673`, areia `#FFF6EA`, azul profundo `#21364B` e amarelo `#F6D577`. Verde preservado apenas na identificação do WhatsApp; fotografias não alteradas.
- Cores centralizadas em variáveis; aliases antigos mantêm compatibilidade dos estilos existentes. Preço, destinos, perguntas, fotos reais e estrutura não alterados.
- `node tests/palette.cjs` passou: sintaxe CSS, identidade, remoção de cores verdes/teal antigas e contraste dos pares principais. Azul/areia: 11,58:1; texto secundário/branco quente: 6,08:1; azul/coral dos botões: 4,79:1.
- Build de produção com TypeScript passou usando o compilador Webpack. Testes do quiz e do checkout passaram.
- Servidor local: quiz e oferta responderam HTTP 200; folha de estilos entregue contém coral, areia e azul profundo. Não equivale a conferência visual no navegador.
- Mudança local, sem commit, push ou publicação. Landing Desafio 21 preservada.

## Refinamento premium do quiz — 19/10/2026

- Identidade de verão mantida em uma composição editorial: marfim, azul-oceano, turquesa suave, detalhes solares, tipografia com serifas e fotografia de campanha com moldura.
- Formulário com seis segmentos de progresso real, ícones decorativos nas opções, seleção com borda/fundo/check e feedback curto de continuidade. Um único item continua aparecendo por etapa. Sem avanço automático, tempo fictício ou nova coleta de dados.
- Privacidade em `details` nativo; radios, foco da pergunta, retorno, tratamento de armazenamento indisponível e movimento reduzido preservados. Mesma linguagem aplicada à oferta, sem mudar preço, checkout ou evidências.
- `node tests/quiz.cjs` passou, agora incluindo progresso segmentado, ícones e estado selecionado. Testes do slider, checkout e ofertas geradas também passaram.
- Compilação com TypeScript passou via `node node_modules/next/dist/bin/next build --webpack`. O compilador padrão Turbopack falhou ao conectar a um processo auxiliar de CSS, inclusive fora do sandbox; não houve alteração de dependências ou da configuração padrão para contornar isso.
- Conferência visual em navegador não realizada. A checagem HTTP da prévia não foi executada porque a revisão automática da permissão ficou indisponível por limite de uso; não foi tentado contornar essa restrição.
- Sem commit, push ou publicação nesta revisão. Alterações anteriores e arquivos não relacionados preservados.

## Atualização de 19/10/2026 — quiz e oferta

História: responder a seis perguntas, uma por tela, guardar apenas escolhas validadas nesta aba e navegar para `/oferta`, com hero contextualizado, evidências reais e checkout.

| Parte do fluxo | Evidência |
| --- | --- |
| Entrada e oferta | `/` e `/oferta` responderam HTTP 200 no servidor local da porta 3002. Primeira pergunta, destino do checkout e sétima imagem conferidos na resposta. |
| Interação | `node tests/quiz.cjs` passou: uma pergunta e quatro opções por etapa, bloqueio sem resposta, retorno/edição, preservação das escolhas e navegação apenas ao concluir. Teste com hooks simulados, não navegador. |
| Preferências → apresentação | Testes validam resumo, quatro chamadas por objetivo, descarte de conteúdo inválido e de campos não previstos. Armazenamento bloqueado mantém a navegação e a oferta genérica. Não há API ou envio das respostas ao checkout. |
| Evidências | Sete fotos existentes preservadas. Teste de lógica do slider passou; teste dos HTMLs confirma sete slides na oferta. |
| Oferta → checkout | `node tests/checkout-links.cjs` passou: três CTAs apontam para `https://payfast.greenn.com.br/195687/offer/1Zhmro?ch_id=144371`, preservando o único WhatsApp flutuante da oferta. Nenhuma compra foi realizada. |
| Produção | `npm run build` passou com TypeScript e rotas estáticas `/` e `/oferta`. `node scripts/verify-offer-pages.cjs`, na raiz, passou para as ofertas existentes e a nova entrada do quiz. |

- Paleta, fontes, preço de R$ 397 por R$ 97 e cinco benefícios preservados. Sem vídeo, contagem regressiva, diagnóstico, depoimentos inventados ou promessa de plano individual calculado pelo quiz.
- Revisão React: formulário isolado no cliente com reducer puro; navegação para rota fixa; escolhas enumeradas; foco acompanha a pergunta; radios nativos; progresso acessível; assinaturas de armazenamento com limpeza; estrutura da oferta mantida no servidor.
- Navegação por teclado, layout em tamanhos reais de tela, gesto de toque e hidratação em navegador não foram verificados nesta sessão. Os testes de componentes e as respostas HTTP não substituem essa conferência visual.
- Sem commit, push ou nova publicação nesta etapa. Código da landing Desafio 21 preservado; apenas o teste compartilhado de ofertas passou a apontar para a nova rota do Projeto Verão.

## Atualização de 18/10/2026 — checkout

- Checkout dos oito CTAs de inscrição atualizado para `https://payfast.greenn.com.br/195687/offer/EZNgz9`, sem os parâmetros do link anterior.
- Botão flutuante de WhatsApp e landing original do Desafio 21 preservados.
- Build de produção com TypeScript passou. Teste `node projeto-verao/tests/checkout-links.cjs` confere todos os destinos no HTML gerado; teste de preços e seções também passou.
- Nenhuma compra realizada; publicação na Vercel depende do processamento do push pela integração Git.

## Atualização de 15/10/2026 — vídeo e preços

- Seção e componente de vídeo removidos do Projeto Verão. Menu aponta para a oferta em vez de uma seção de apresentação inexistente. Sete registros e navegação do slider preservados.
- Projeto Verão e Desafio 21: oferta de R$ 397 por R$ 97. No Desafio, atualização também no hero, comparativo e detalhes do Bumbum na Nuca, incluindo rótulos acessíveis e propriedades de preço nos eventos.
- Economia do Projeto Verão permanece R$ 300. Links de checkout não modificados; valores cobrados na Greenn/Hotmart não foram alterados por esta edição.
- Compilação de produção com TypeScript dos dois projetos: passou. Teste `node scripts/verify-offer-pages.cjs`: passou nos três HTMLs gerados. Teste de lógica do slider: passou.
- Revisão React: nenhuma dependência, efeito ou estado novo; componentes existentes preservados, sem link de menu quebrado nem seção vazia.
- Publicação direta não realizada: a conexão com a Vercel não retornou equipes acessíveis. Pacotes de fonte atualizados ficam em `.artifacts/`, sem dependências, caches ou credenciais. O arquivo ZIP anterior é histórico e não contém esta alteração.
- Conferência visual em navegador não realizada nesta sessão.

## Slider ampliado para sete registros

- Três novas imagens copiadas dos anexos `Lúcia.png`, `mille.png` e `adelita.png` para os registros 05, 06 e 07. Hashes iguais aos originais, sem recortes nem alterações no desfoque existente. Quatro registros anteriores preservados.
- HTML: sete slides e sete indicadores. Página, três imagens novas e requisição representativa ao otimizador: HTTP 200.
- Teste de lógica ampliado para sete itens: passou, incluindo avanço até o último registro, retorno suave, indicadores e navegação circular manual.
- Build de produção com TypeScript: passou.
- Indicadores flexíveis com setas de tamanho fixo para acomodar os sete itens em telas pequenas. Conferência visual/gesto físico não realizada nesta sessão.
- Arquivos originais do Método 90X e da landing Desafio 21 não alterados.

## Slider automático dos registros reais

- Build de produção com TypeScript após os ajustes finais: passou.
- Quatro fotos originais mantidas, sem duplicações nem cortes, em slider com rolagem horizontal nativa, navegação por setas, indicadores e teclado e controle de reprodução.
- Teste de lógica `node tests/evidence-slider.cjs`: passou para avanço automático, ida e volta, sincronização após deslize, prioridade do toque, intervalo após interação, hover apenas de mouse, foco, visibilidade, pausa/reprodução, movimento reduzido e limpeza dos intervalos.
- HTML servido: HTTP 200, quatro slides, região identificada como carrossel, botões anterior/próximo e controle automático presentes.
- Revisão React aplicada: componente interativo isolado, props serializáveis, chaves estáveis, preferência de movimento lida com `useSyncExternalStore`, estado transitório em refs e recursos dos efeitos com limpeza.
- Testes de lógica não comprovam comportamento visual, animação nem gesto físico no dispositivo. Navegação por toque em navegador/aparelho real não verificada nesta sessão.

## Quatro imagens de registros reais fornecidas em 13/10/2026

- Quatro montagens JPEG copiadas dos anexos informados para `public/images/evidencias/registro-real-01.jpeg` a `registro-real-04.jpeg`, na ordem enviada. Hashes SHA-256 iguais aos arquivos de origem; nenhum corte ou alteração na imagem.
- Galeria configurada com quatro itens, textos alternativos descritivos, duas colunas no desktop e uma no celular. O estilo `object-fit: contain` preserva as montagens e os textos originais.
- Build de produção com TypeScript: passou. Página: HTTP 200, quatro figuras e nenhum aviso de “Fotos em breve” na seção. Aviso de resultados individuais preservado.
- Prévia da porta 3002 reutilizada após a tentativa de inicialização informar que a porta já estava ocupada. Não foi encerrado nenhum processo existente.
- Conferência visual em navegador não realizada nesta sessão. Não foram adicionados nomes, métricas, prazos de transformação nem depoimentos inventados.
- Landing original permanece sem alterações rastreadas.

## Checkout e grupo de WhatsApp

- Build de produção com TypeScript: passou.
- HTML gerado conferido: nove CTAs apontam exatamente para `https://payfast.greenn.com.br/5juz3g3/offer/EZNgz9?ch_id=144371`, preservando o parâmetro informado.
- Há um único CTA flutuante, destinado exatamente a `https://chat.whatsapp.com/DsGosxOC3WTLmz5tUBKzXI`, com rótulo de convite do grupo e ícone do WhatsApp.
- Estilos do flutuante preservam posição fixa à direita e embaixo, área de toque de pelo menos 48 px e espaçamento da área segura do dispositivo.
- Links abrem em nova aba com `noopener noreferrer`. Menu e FAQ não foram transformados em links de compra.
- Textos do fluxo de inscrição e FAQ atualizados para checkout. Eventos distinguem clique no checkout e clique no convite do grupo, sem registrar compra ou entrada no grupo como confirmadas.
- Nenhuma compra foi feita, nenhum grupo foi acessado e nenhuma alteração foi realizada em uma hospedagem. Conferência visual automática continua indisponível nesta sessão.
- Landing original preservada; revisão React aplicada aos componentes alterados.

## Restauração da paleta original

- Retornaram turquesa, azul-oceano, amarelo-sol e coral, incluindo fundos, botões, detalhes e favicon.
- Tipografia, layout editorial, vídeo e galeria preservados. Nenhum componente ou arquivo da landing original foi alterado.
- Tons da revisão premium removidos dos estilos e da identidade documentada.
- Verificação visual automática permanece indisponível nesta sessão; não foram geradas novas capturas.

## Refinamento premium e novas seções

- Compilação de produção: passou com verificação TypeScript.
- Servidor de desenvolvimento do Projeto Verão na porta 3002: HTTP 200.
- Vídeo e galeria são componentes de servidor; não adicionam biblioteca de player nem carrossel.
- Sem vídeo configurado: nenhum player quebrado ou botão de reprodução fictício; estado “em breve”. Quando houver arquivo, usa controles nativos, `playsInline`, `preload="none"` e legendas opcionais.
- Sem fotos configuradas: espaços reservados identificados, sem dados ou imagens de pessoas fictícias. A galeria aceita fotos locais, sem corte, com texto alternativo.
- CTAs das duas seções: WhatsApp do novo produto.
- Código revisado segundo a skill React Best Practices: componentes fora do render, chaves estáveis, sem estado/efeitos desnecessários, mídia com dimensões reservadas e navegação acessível.
- Conferência visual desta revisão: **não realizada**. O navegador desta sessão bloqueou o acesso à prévia por sua política de segurança. Os testes responsivos e capturas abaixo pertencem à versão anterior, não comprovam o novo layout.
- Materiais reais ainda não fornecidos: reprodução do vídeo e galeria preenchida permanecem pendentes de teste com esses arquivos.

## Validação da versão anterior ao refinamento

- Compilação de produção Next.js 16.3.8: concluída.
- ESLint: sem erros.
- Resposta da página e imagem: HTTP 200.
- Responsividade: 320, 390, 440, 768, 1024, 1440 e 1920 px, sem elementos textuais fora da tela ou rolagem horizontal.
- Foto e fontes: carregadas no navegador.
- Menu de celular: abre, navega para uma seção e fecha ao escolher o destino.
- FAQ: abre a resposta de participação e investimento.
- CTAs: destino WhatsApp do negócio, mensagem exclusiva do Projeto Verão. Não foi enviada nenhuma mensagem durante a verificação.
- Código-fonte da landing original: hashes dos arquivos rastreados iguais aos anteriores à tarefa; verificação TypeScript original passou.
- PostHog: opcional e não ativado; a cópia não contém credenciais do projeto original.

O Chrome do usuário tem uma extensão que injeta o atributo `cz-shortcut-listen` no `body`, causando um aviso de hidratação em modo de desenvolvimento. A prévia no navegador integrado não apresentou esse erro. Não foram desativadas extensões nem ocultados avisos do React no código.

As capturas `preview-desktop.jpg` e `preview-mobile.jpg` mostram a versão anterior ao refinamento premium.
