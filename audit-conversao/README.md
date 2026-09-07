# Auditoria de conversão — Desafio 21

Data: 07/09/2026

## Escopo

Revisão do percurso da landing page entre a promessa inicial, apresentação do produto, prova social, benefícios, funcionamento, comparação, oferta e dúvidas frequentes.

Objetivo do visitante: entender rapidamente se o desafio serve para sua realidade, confiar na proposta e decidir se vale iniciar a compra.

## Etapas observadas

1. **Hero — saúde boa, clareza média.** A proposta, a duração e os dois caminhos de ação estão visíveis. Faltam preço, garantia e uma formulação mais específica do mecanismo do programa perto do primeiro CTA.
2. **Apresentação do desafio — atenção necessária.** O card explica a entrega, mas existe um intervalo vertical grande antes da seção seguinte. Isso reduz ritmo e passa sensação de página mais longa.
3. **Resultados — saúde média.** As imagens chamam atenção e o CTA é visível, mas faltam pequenos elementos de contexto que aumentem autenticidade, como período do resultado e consentimento/identificação controlada.
4. **Benefícios — risco alto.** A rolagem fica condicionada à passagem pelos seis itens. Isso cria sensação de perda de controle, atrasa preço e pode aumentar abandono, especialmente em trackpads, celulares menos potentes e para pessoas sensíveis a movimento.
5. **Como funciona — saúde boa.** A sequência de quatro etapas reduz incerteza. No desktop, ocupa mais altura que o necessário e poderia ser compactada sem perder entendimento.
6. **Comparativo — saúde média.** A composição é clara, mas “investimento variável” não cria uma âncora financeira concreta. A comparação também exige cuidado porque o próprio texto esclarece que o desafio não substitui acompanhamento individual.
7. **Oferta e garantia — saúde boa, chegada tardia.** Preço, benefícios, Hotmart e garantia estão presentes. O CTA aparece depois de uma jornada longa e poderia ser reforçado por uma faixa fixa discreta no mobile.

## Prioridades recomendadas

### P0 — maior impacto provável

1. Remover o bloqueio de rolagem dos seis benefícios. Mostrar três benefícios prioritários e oferecer “Ver tudo”, ou permitir a animação sem impedir o scroll normal.
2. Trazer preço e redução de risco para o hero: “21 dias por R$ 99,90”, “7 dias de garantia” e “checkout seguro”.
3. Encurtar a jornada até a primeira prova real e até a oferta. Ordem sugerida: hero → vídeo/prova → o que recebe → como funciona → oferta → FAQ. Comunidade pode vir como reforço, sem interromper a decisão.

### P1 — aumento de confiança

4. Contextualizar resultados com informações curtas e verificáveis, sem poluir as fotos: “resultado individual”, período, autorização de uso e aviso de que resultados variam.
5. Padronizar o CTA principal em toda a página. Sugestão: “COMEÇAR MEU DESAFIO DE 21 DIAS”. É mais direto que alternar entre “meu bumbum”, “fazer parte” e “conquistar meu resultado”.
6. Reposicionar o comparativo como “Tudo incluído em um único programa”. Se forem exibidos valores de nutricionista e personal, usar faixas reais e fontes; sem isso, evitar uma economia implícita que não possa ser sustentada.

### P2 — ritmo e acabamento

7. Reduzir vazios verticais entre seções e fazer título, prova e CTA aparecerem juntos com mais frequência.
8. Usar CTA fixo discreto no mobile depois que o hero sair da tela, mostrando preço e ação. Recuar ou ocultar o WhatsApp quando essa barra estiver ativa para evitar sobreposição.
9. Dar controles de pausa e navegação aos carrosséis automáticos e respeitar `prefers-reduced-motion`.

## Testes recomendados no PostHog

1. **Rolagem livre vs. seletor obrigatório:** medir `checkout_started` por visitante e saída da seção de benefícios, não apenas profundidade de scroll.
2. **Hero atual vs. hero com preço e garantia:** medir clique no CTA do hero e início real de checkout.
3. **Prova social apenas visual vs. contextualizada:** medir avanço até oferta e início de checkout.
4. **CTA atual vs. CTA único:** medir conversão por posição (`hero_primary`, `video_primary`, `social_proof_primary`, `pricing_primary`).
5. Segmentar por dispositivo, origem de tráfego e novo/recorrente; não declarar vencedor antes de volume suficiente.

## Acessibilidade e limites

- A retenção de scroll e a animação dos carrosséis podem causar desconforto e dificultar navegação; é necessário validar teclado, leitor de tela e preferência por movimento reduzido.
- Contraste, ordem de foco e tamanho dos alvos não foram medidos programaticamente nesta rodada.
- A auditoria visual foi registrada no navegador em desktop. O comportamento mobile precisa de uma verificação responsiva dedicada antes de publicar novas mudanças.

## Evidências

- `01-hero.png`
- `02-video-prova.png`
- `03-video.png` (resultados)
- `04-beneficios.png`
- `06-oferta.png` (como funciona)
- `08-comparativo.png`
- `10-cta-garantia.png`
