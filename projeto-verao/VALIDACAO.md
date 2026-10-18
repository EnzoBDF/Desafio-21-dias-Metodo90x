# Verificação da cópia

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
