# Bumbum na Nuca — adaptação de 30/10/2026

## Fonte e decisões confirmadas

- Copy do anexo “Texto colado.txt” adaptada mantendo preto/laranja, tipografia, vídeo, galerias, seletor de benefícios, linha de etapas, comparativo, oferta e FAQ.
- O responsável confirmou **30 dias**, prevalecendo sobre os 21 dias do anexo, em acordo com as duas novas artes.
- Informações confirmadas: academia, equipamentos de academia, 5 treinos por semana, cerca de 1h15 por sessão, liberação imediata após confirmação do pagamento, suporte pelo WhatsApp 24 horas e dieta básica como recomendação.
- Suporte 24 horas não foi convertido em promessa de resposta instantânea. A recomendação alimentar não é apresentada como dieta individualizada prescrita por nutricionista.
- Preço de R$ 97 à vista, valor anterior de R$ 397, Hotmart e WhatsApp existentes preservados. Parcelas “XXX” não foram inventadas.

## Implementação

- Provas sociais passam para o segundo bloco, logo após o hero. Artes de campanha não são tratadas como resultados reais.
- Nova copy nos blocos existentes, com seções adicionais de identificação, rotina/expectativa, equipe/suporte, garantia e fechamento.
- Oito entregas compartilhadas entre benefícios e oferta; FAQ com dez perguntas, incluindo academia, integração do treino, alimentação e expectativa de resultados.
- Imagens anexadas copiadas sem alterações: `public/images/bumbum-na-nuca-campanha-20261025.jpeg` e `public/images/desafio-30-dias-logo-20261025.jpeg`. Hashes conferidos contra os anexos. Aplicadas ao hero, card, capa do vídeo, oferta, rodapé e favicon. Provas reais e comunidade preservadas.
- Rota de detalhes e metadados alinhados a 30 dias e academia. Identificador histórico de analytics não alterado para não fragmentar a série existente.

## Conteúdo ainda não fornecido

- Telas/vídeo real do aplicativo: o vídeo existente é identificado apenas como apresentação do desafio, não como demonstração verificada da interface.
- Nome/registro/formação dos profissionais, períodos/programas das fotos e novos depoimentos autorizados: não foram inventados nem substituídos por imagem de campanha.
- Integração exata com o treino atual e acesso ao app após os 30 dias: a página orienta confirmar com a equipe, sem fixar condições não informadas.

## Verificação

- Compilação com TypeScript, lint dos arquivos envolvidos e teste de HTML `node scripts/verify-bumbum-copy.cjs`.
- Teste compartilhado `node scripts/verify-offer-pages.cjs` também confere preço e preservação da landing Projeto Verão.
- Na etapa de adaptação não houve compra, novo checkout, alteração de plataforma, commit ou push. O envio destas alterações para a `main` foi autorizado posteriormente pelo responsável.

### Resultado da checagem

- Build de produção Webpack/TypeScript passou; lint dos arquivos alterados e os dois testes de HTML passaram. Aviso de lockfile fora do repositório é preexistente e não impediu a compilação.
- Servidor da prévia em `http://127.0.0.1:3000/`: landing, detalhes, duas imagens e vídeo preservado responderam HTTP 200, com tipos de conteúdo corretos. Projeto Verão da porta 3002 não foi alterado nesta tarefa.
- Navegador: hero conferido em 390 × 844 e 1440 × 1000; no celular, o CTA principal ficou visível antes da arte (base do botão a aproximadamente 677 px). Em 320 px, títulos sem extravasar seus contêineres e cards finais/valor conferidos. Arte e logo carregadas; 13 links de compra presentes; âncora do vídeo funciona; FAQ de academia e dieta testada com Enter. Console sem erros capturados. Viewport temporário restaurado.
- Capturas salvas e inspecionadas em `tmp/bumbum-copy-20261030/`: `hero-desktop.png`, `hero-mobile.png`, `cards-320.png`, `oferta-320.png`.
- Revisão React: dados compartilhados entre oferta/benefícios/FAQ, componentes de texto no servidor, chaves estáveis e FAQ com identificação das regiões e estado acessível. Sem novas dependências, coleta de dados ou mudança dos destinos de compra.
- Limites: não houve auditoria completa de acessibilidade, gesto em aparelho físico, compra ou teste integral de reprodução do vídeo. As verificações de presença e HTTP do vídeo não atestam que seu conteúdo audiovisual demonstra o aplicativo ou já foi atualizado para 30 dias.
