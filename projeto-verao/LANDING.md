# Acesso direto à landing — 30/10/2026

- `/` apresenta diretamente a landing existente, com hero, provas reais, depoimentos, benefícios, preço, FAQ e checkout.
- `/oferta` continua mostrando a mesma landing, preservando links já divulgados.
- `/analise` redireciona permanentemente para `/`. O visitante não passa mais por perguntas, checklist ou carregamento intermediário.
- Links de responder/refazer quiz removidos do rodapé; marca volta para a página inicial. Metadados da entrada atualizados para o produto.
- Preço, parcelamento, nove CTAs, WhatsApp, evidências e conteúdo comercial preservados.
- Arquivos antigos do quiz continuam no repositório, mas não são renderizados pelas rotas públicas. Mudanças locais não relacionadas não integram este envio.

Verificações: compilação de produção com TypeScript; testes dos nove links de compra e WhatsApp em `/` e `/oferta`; ausência de formulário nas páginas públicas; redirecionamento da análise; depoimentos; verificação compartilhada das ofertas. Esses testes não realizam compra nem confirmam a conclusão de um deploy na Vercel.

A cópia exata preparada para o commit também compilou com Webpack/TypeScript, sem os arquivos locais não incluídos. No servidor de produção local, `/` e `/oferta` responderam 200 com a landing e sem formulário; `/analise` respondeu 308 com `Location: /`. A renovação visual da prévia ficou indisponível no navegador integrado; não há nova captura de tela desta revisão. A revisão React manteve a composição compartilhada de servidor e retirou a dependência do cliente de reinício do quiz da landing.
