import type { ReactNode } from "react";
import Image from "next/image";
import { SummerBrand } from "./SummerBrand";
import { SummerCTA } from "./SummerCTA";
import { SummerExperience } from "./SummerExperience";
import { SummerIcon, type IconName } from "./SummerIcon";
import { SummerTextTestimonials, SummerVideoTestimonials } from "./SummerTestimonials";
import { EVIDENCE_PHOTOS, type EvidencePhoto } from "../lib/media";
import { INSTAGRAM_URL } from "../lib/links";
import "../app/oferta/offer.css";
import "../app/oferta/adaptations.css";

function Heading({ children, intro }: { children: ReactNode; intro?: string }) {
  return <div className="sh"><span className="mk" aria-hidden="true" /><h2 className="hd t1">{children}</h2>{intro && <p className="intro">{intro}</p>}</div>;
}
function Action({ children, placement }: { children: ReactNode; placement: string }) {
  return <div className="act"><SummerCTA placement={placement} className="btn">{children}</SummerCTA></div>;
}
function Record({ photo, number, featured = false }: { photo: EvidencePhoto; number: number; featured?: boolean }) {
  return <figure className="pcard result-card"><span className="pair-n">Registro {String(number).padStart(2, "0")}</span><div className="result-image"><Image src={photo.src} alt={photo.alt} width={photo.width ?? 1000} height={photo.height ?? 1000} sizes={featured ? "(max-width: 599px) calc(100vw - 72px), 474px" : "(max-width: 599px) calc(100vw - 72px), (max-width: 1000px) 45vw, 340px"} /></div><figcaption className="pcap">Registro real · Cada pessoa tem seu próprio processo.</figcaption></figure>;
}
const faq = [
  ["Eu não tenho tempo.", "O Método 90X traz um passo a passo para estruturar uma rotina simples. Os Treinos Mínimos de 15 Minutos, em vídeo curto, são para o dia corrido."],
  ["Tenho receio de ir à academia.", "Você não precisa saber treinar. O treino vem com o passo a passo de cada exercício, para você entrar sabendo o que fazer."],
  ["Depois dos 30 anos eu não emagreço?", "O corpo, o ritmo e a rotina mudam. O projeto reúne treino, alimentação e apoio para ajudar você a construir uma rotina consistente."],
  ["Quantos quilos e centímetros eu vou perder?", "A proposta é eliminar até 5 kg e diminuir até 7 cm de barriga em 30 dias. Esses números não são uma garantia: os resultados variam de pessoa para pessoa. Os registros desta página não representam necessariamente um período de 30 dias."],
  ["É golpe?", "Conheça o trabalho do Batista no perfil @metodo_90x e os registros reais desta página. A inscrição é feita pelo checkout Greenn, onde você pode conferir a oferta antes de concluir. Você tem 7 dias para solicitar o reembolso."],
  ["Tenho uma condição de saúde. Posso fazer?", "Leve o projeto ao seu médico antes de começar e peça a liberação dele. Informe à equipe suas necessidades e limitações para avaliar a adequação do programa."],
];
const inclusions = ["Treino de academia personalizado, 30 dias, com passo a passo de cada exercício.", "Dieta especializada de 30 dias, com cardápio do dia e trocas.", "Suporte durante os 30 dias e grupo de apoio para acompanhar a sua rotina.", "Guia de uso do método e material de apoio."];
const methodSteps: { title: string; description: string; icon: IconName }[] = [
  { title: "Corpo.", description: "Treino específico para o corpo, o nível e a rotina de quem já passou dos 30 anos.", icon: "strength" },
  { title: "Comida.", description: "Dieta especializada para o seu ritmo de hoje, sem radicalismo, sem passar fome, apenas comida de verdade, simples assim.", icon: "leaf" },
  { title: "Rotina blindada.", description: "Passo a passo para estruturar uma rotina simples e eficaz, com treino, alimentação e apoio durante os 30 dias.", icon: "sun" },
];
const bonuses: { title: string; description: string; icon: IconName }[] = [
  { title: "O que parar de fazer depois dos 30", description: "Os hábitos da Fórmula dos 20 Anos que você pode largar.", icon: "spark" },
  { title: "Treinos de 15 minutos", description: "Treinos mínimos em vídeo curto, para o dia corrido.", icon: "strength" },
  { title: "Guia da fome fora de hora", description: "O que comer às 17h e às 22h para os momentos em que a fome aparece.", icon: "leaf" },
  { title: "Áudios do dia 10", description: "Mensagens curtas do Batista para o dia em que o desânimo bate.", icon: "chat" },
];
function Items({ items }: { items: string[] }) {
  return <ul className="rows flat first">{items.map(text => <li className="row" key={text}><span className="dot" aria-hidden="true" /><span>{text}</span></li>)}</ul>;
}

export function SummerReferenceOffer() {
  return (
    <div className="reference-offer">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="stripe" />
      <main id="conteudo">
        <section className="hero" id="inicio" data-section="hero_oferta"><div className="box summer-hero-layout"><div className="hc hero-message">
          <p className="kicker">Aos 20 você cortava o pão e emagrecia. Hoje faz igual e nada muda.</p>
          <h1>Elimine até 5 kg e diminua até 7 cm de barriga, em apenas 30 dias, <em>através do Método 90X</em></h1>
          <p className="lead">Um treino específico para o corpo, a idade e o metabolismo que você tem hoje, montado para você ver o resultado em 30 dias.</p>
          <Action placement="hero_oferta">QUERO SECAR 5KGS</Action>
          <p className="cap">Treino de academia para mulheres de 30 anos ou mais, com filhos e trabalho. De R$ 397 por 12x de R$ 9,90 ou R$ 97 à vista.</p>
          <p className="cap">Garantia de 7 dias: se o projeto não fizer sentido para você, o seu dinheiro volta, sem perguntas.</p>
        </div><figure className="summer-hero-visual"><div className="summer-hero-photo"><Image src="/images/verao-praia.webp" alt="Imagem ilustrativa de campanha: mulher se movimentando à beira-mar" fill sizes="(max-width: 734px) 100vw, (max-width: 850px) calc(100vw - 48px), 45vw" preload /></div><figcaption>Seu verão. Seu ritmo.<span>Imagem de campanha ilustrativa</span></figcaption></figure></div></section>

        <section className="sec proofsec" id="historias" data-section="evidencias"><div className="box">
          <Heading intro="Mulheres reais, com filhos, trabalho e rotina cheia. Cada registro conta uma história e um processo individual.">Resultados de alunas</Heading>
          <div className="results-grid">{EVIDENCE_PHOTOS.slice(0, 6).map((photo, i) => <Record key={photo.src} photo={photo} number={i + 1} />)}</div>
          <p className="note">Cada aluna tem seu ponto de partida. Os registros são de períodos diferentes e não comprovam resultados em 30 dias. Resultados individuais variam.</p>
          <Action placement="resultados">quero secar 7cm de cintura</Action>
        </div></section>

        <section className="sec proofsec testimonial-section" id="depoimentos-video" data-section="depoimentos_video"><div className="box">
          <Heading intro="Histórias contadas por quem vive o Método 90X.">Ouça de quem já fez</Heading>
          <SummerVideoTestimonials />
          <Action placement="depoimentos_video">Quero começar meu Projeto Verão</Action>
        </div></section>

        <section className="sec proofsec testimonial-section" id="depoimentos-texto" data-section="depoimentos_texto"><div className="box">
          <Heading intro="Relatos por escrito e mensagens da comunidade.">O que elas dizem do método</Heading>
          <SummerTextTestimonials />
          <Action placement="depoimentos_texto">Quero fazer parte</Action>
        </div></section>

        <section className="sec proofsec" data-section="comunidade"><div className="box">
          <Heading intro="Gente de verdade, treino e uma rede de apoio para acompanhar o caminho.">Veja quem já faz parte</Heading>
          <div className="grid community-grid">{[1, 2, 3, 4].map(number => <figure className="pcard" key={number}><div className="community-image"><Image src={`/images/comunidade/comunidade-${number}.jpeg`} alt={`Registro da comunidade na academia, foto ${number}`} fill sizes="(max-width: 734px) calc(50vw - 32px), 240px" /></div></figure>)}</div>
          <Action placement="comunidade">QUERO BOTAR O SHAPE</Action>
        </div></section>

        <section className="sec proofsec" data-section="historia_real"><div className="box">
          <Heading intro="Cada conquista tem uma história. Mais um registro de quem colocou o cuidado com o corpo na rotina.">Resultados que contam histórias</Heading>
          <div className="read single-record"><Record photo={EVIDENCE_PHOTOS[6]} number={7} featured /></div>
          <p className="note">Registro real, sem promessa de resultado igual para todas.</p>
          <Action placement="historia_real">Quero secar 5kgs</Action>
        </div></section>

        <section className="sec" data-section="para_quem"><div className="box">
          <Heading>Aos 20 isso funcionava</Heading>
          <div className="read prose"><p>Você cortava o pão, pulava o jantar, fazia uma hora de esteira, e a calça jeans deslizava. Hoje faz a mesma coisa, chega às 19h40 com a bolsa no ombro, os filhos pedindo jantar e a louça na pia, e a balança marca o mesmo número.</p><p>O culpado nunca foi você. Ele se chama Fórmula dos 20 Anos: cortar tudo, pular refeição e treinar de qualquer jeito num corpo e numa rotina que já são outros.</p></div>
          <div className="grid g2 aud"><div className="callout"><h3 className="ct">Este projeto é para você</h3><p>se tem 30 anos ou mais, filhos, trabalho e uma casa que não para, e já tentou repetir o que funcionava aos 20 sem o resultado vir.</p></div><div className="callout"><h3 className="ct">Não serve</h3><p>se você procura resultado sem treinar nenhum dia, ou só aceita um plano em que todo dia é perfeito.</p></div></div>
        </div></section>

        <section className="sec" id="metodo" data-section="metodo"><div className="box">
          <Heading intro="O que funcionava aos 20 não funciona mais porque o corpo, o ritmo e a rotina mudaram. O Método 90X refaz o plano em três passos.">O Método 90X</Heading>
          <ol className="grid g3 method-grid" aria-label="Três passos do Método 90X">{methodSteps.map((step, index) => <li className="card method-card" key={step.title}><div className="method-card-top"><span className="method-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="detail-icon"><SummerIcon name={step.icon} /></span></div><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </div></section>

        <section className="sec team-section" data-section="batista"><div className="box"><Heading>Os profissionais do Método 90X</Heading><div className="team-layout">
          <figure className="trainer-photo"><Image src="/images/equipe-metodo-90x.jpeg" alt="Israel Correia e Batista em imagem de apresentação do Método 90X" width={1254} height={1254} sizes="(max-width: 734px) calc(100vw - 48px), 520px" /></figure>
          <div className="team-copy"><div className="prose"><h3 className="team-names">Israel Correia <br />e Batista</h3><p>Israel Correia e Batista são os profissionais do Método 90X, a proposta que reúne treino, alimentação e apoio no Projeto Verão: Magra e Definida.</p><p>O convite é construir uma rotina possível de manter: entender cada etapa, colocar o treino em prática e contar com apoio ao longo dos 30 dias. Um caminho para cuidar de você com mais organização e consistência.</p></div>
          <p className="ig">Conheça o trabalho da equipe:<br /><a className="lnk" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@metodo_90x <SummerIcon name="arrow" /></a></p></div>
        </div></div></section>

        <section className="sec stack" id="participar" data-section="beneficios"><div className="box">
          <Heading>Tudo o que entra no Projeto Verão</Heading>
          <div className="read"><div className="card program-inclusions"><p className="program-label">SEU PROGRAMA DE 30 DIAS</p><Items items={inclusions} /></div></div>
          <div className="bonus-section"><div className="bonus-heading"><p className="program-label">UM APOIO A MAIS NA SUA ROTINA</p><h3>Mais 4 bônus para você.</h3><p>Para os dias corridos, a fome fora de hora e os momentos de desânimo.</p></div><ul className="bonus-grid" aria-label="Os quatro bônus do Projeto Verão">{bonuses.map((bonus, index) => <li className="card bonus-card" key={bonus.title}><div className="bonus-card-top"><span className="bonus-label">BÔNUS {String(index + 1).padStart(2, "0")}</span><span className="detail-icon"><SummerIcon name={bonus.icon} /></span></div><h4>{bonus.title}</h4><p>{bonus.description}</p></li>)}</ul></div>
        </div></section>

        <section className="sec" id="investimento" data-section="investimento"><div className="box"><div className="read"><div className="card price" id="checkout" tabIndex={-1}>
          <p className="investment-label">PROJETO VERÃO · 30 DIAS</p>
          <h2 className="investment-title">Seu próximo passo<br /><em>começa aqui.</em></h2>
          <p className="investment-original">De <del>R$ 397</del></p>
          <p className="investment-value"><span>R$</span><strong>97</strong><span>à vista</span></p>
          <p className="investment-installments">ou 12x de <strong>R$ 9,90</strong></p>
          <ul className="investment-inclusions" aria-label="O que você recebe">{["Treino especializado", "Dieta especializada", "Material de apoio", "Suporte durante os 30 dias", "Grupo de apoio"].map(benefit => <li key={benefit}><SummerIcon name="check" /><span>{benefit}</span></li>)}</ul>
          <Action placement="participar">Quero começar meu Projeto Verão</Action>
          <p className="investment-guarantee"><SummerIcon name="check" />7 dias de garantia para começar com tranquilidade.</p>
          <p className="note">Pagamento pelo checkout Greenn.<br />Confira as condições antes de concluir.</p>
        </div></div></div></section>

        <section className="sec" data-section="garantia"><div className="box"><Heading>Garantia de 7 dias, sem perguntas</Heading><div className="read"><div className="card"><p>Entre, faça o seu primeiro treino e, se por qualquer motivo o projeto não fizer sentido para você, peça o reembolso em até 7 dias e receba o valor integral de volta.</p><p>Solicite o reembolso pelos canais de atendimento informados na confirmação da compra.</p></div></div><Action placement="garantia">Quero começar com 7 dias de garantia</Action></div></section>

        <section className="sec" id="duvidas" data-section="faq"><div className="box"><Heading>Perguntas rápidas</Heading><div className="read">{faq.map(([question, answer], index) => <details className="acc" key={question} open={index === 0}><summary>{question}<SummerIcon name="arrow" className="ar" /></summary><div className="acc-a"><p>{answer}</p></div></details>)}</div></div></section>

        <section className="sec" data-section="encerramento"><div className="box"><Heading>Daqui a 30 dias você vai estar em algum lugar</Heading><div className="read prose"><p>Na segunda-feira de novo, com a mesma frase na cabeça: “Aos 20 isso funcionava.” Ou com um mês de treino feito e um novo passo no cuidado com você.</p><p>A garantia de 7 dias cobre o risco.</p></div><Action placement="encerramento">Quero começar o meu primeiro treino hoje, 12x de R$ 9,90</Action><div className="read prose sup psb"><p>P.S. Elimine até 5 kg e diminua até 7 cm de barriga, em apenas 30 dias, através do Método 90X, por 12x de R$ 9,90 ou R$ 97 à vista. Você tem 7 dias de garantia, sem perguntas. Resultados individuais variam.</p></div></div></section>
      </main>
      <footer className="foot"><div className="box"><div className="footer-brand"><SummerBrand footer /></div><p>Método 90X · <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@metodo_90x</a> · Batista, personal trainer</p><p className="legal">Os resultados variam de pessoa para pessoa e dependem de seguir o treino. Os números de até 5 kg e até 7 cm de barriga não valem como resultado igual para todas. Os registros mostram experiências individuais, de períodos diferentes. Antes de iniciar qualquer treino ou dieta, consulte o seu médico.</p><div className="footer-links"><a href="#investimento">Ver investimento</a><a href="#inicio">Voltar ao início</a></div><p>© {new Date().getFullYear()} Projeto Verão · Magra e Definida.</p></div></footer>
      <SummerCTA placement="floating_whatsapp" variant="floating">WhatsApp</SummerCTA>
      <SummerExperience />
    </div>
  );
}
