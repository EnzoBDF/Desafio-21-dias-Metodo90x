# Depoimentos do Projeto Verão

Os blocos ficam em `/oferta#depoimentos-video` e `/oferta#depoimentos-texto`, depois dos resultados e antes das fotos da comunidade. O bloco de texto contém os cinco prints fornecidos, preservados em `public/images/depoimentos/`. Não há espaços de texto sobrando nem título de grupo vazio. Os cinco vídeos ainda aguardam os arquivos e mostram “em breve”.

## Preencher os espaços

O conteúdo fica em `lib/testimonials.ts`. Cada registro tem um identificador estável e uma legenda. Substitua os registros correspondentes mantendo os demais espaços.

- Vídeos: adicione `video` com `src` apontando para um MP4/WebM local ou uma URL direta de vídeo. `poster` recebe uma capa opcional; `captions` recebe legendas WebVTT em português. Um link de página do YouTube não é uma URL direta de vídeo.
- Relato escrito: adicione `content` com `kind: "quote"`, `text` com o texto original e `author` opcional com o nome autorizado. Quebras de linha são preservadas.
- Print de mensagem/grupo: adicione `content` com `kind: "image"`, `src`, `alt`, `width` e `height` nas dimensões originais. A imagem aparece inteira, sem corte.

Arquivos locais podem ficar em `public/videos/depoimentos/` e `public/images/depoimentos/`. Nas configurações, use caminhos iniciando em `/videos/` ou `/images/`, sem `public`. Imagens de outros domínios precisam de configuração adicional do Next Image; prefira os arquivos locais.

Use os materiais reais autorizados, remova dos prints dados de terceiros e forneça legendas dos vídeos falados. Não acrescente nomes, avaliações, números de alunas ou resultados não fornecidos.

## Funcionamento

- Vídeos configurados usam controles nativos, reprodução no próprio celular e `preload="none"`, sem autoplay. Capas e legendas são opcionais na configuração; não há player sem arquivo.
- Prints usam Next Image com dimensões reservadas e proporção natural; relatos usam `blockquote` e texto escapado pelo React.
- Conteúdo renderizado no servidor, sem nova biblioteca, carrossel ou estado de cliente. As animações de entrada existentes também se aplicam aos cartões.
- Desktop: cinco vídeos e duas colunas de prints. No celular, os prints usam uma coluna para facilitar a leitura; vídeos usam duas colunas, ou uma abaixo de 360px. Relatos escritos também ocupam a largura inteira no celular. A grade de mensagens do grupo só aparece se houver conteúdo configurado.
- Os dois novos botões usam o checkout e os eventos existentes, com posições `depoimentos_video` e `depoimentos_texto`.

## Verificação

`node tests/testimonials.cjs` verifica a renderização dos espaços vazios e das três opções de conteúdo com fixtures que não fazem requisições de rede. Reprodução de vídeo, sincronização de legendas e leitura de prints precisam ser conferidas novamente quando os arquivos reais forem adicionados.
