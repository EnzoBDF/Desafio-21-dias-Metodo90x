import Image from "next/image";
import { SummerCTA } from "../components/SummerCTA";
import {
  SummerExperience,
  SummerFAQ,
  SummerNavigation,
} from "../components/SummerExperience";
import { SummerIcon, type IconName } from "../components/SummerIcon";
import { INSTAGRAM_URL } from "../lib/links";
import { SummerEvidenceSection } from "../components/SummerMedia";

const benefits: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    number: "01",
    icon: "spark",
    title: "Material de apoio",
    description:
      "Materiais para consultar e apoiar sua rotina ao longo do projeto.",
  },
  {
    number: "02",
    icon: "chat",
    title: "Suporte contínuo durante os 30 dias",
    description:
      "Conte com suporte para tirar dúvidas durante os 30 dias do programa.",
  },
  {
    number: "03",
    icon: "strength",
    title: "Treino especializado",
    description:
      "Treino com direcionamento para os objetivos do Projeto Verão: Magra e Definida.",
  },
  {
    number: "04",
    icon: "leaf",
    title: "Dieta especializada",
    description:
      "Uma proposta alimentar que acompanha o treino e os objetivos do projeto.",
  },
  {
    number: "05",
    icon: "heart",
    title: "Grupo de apoio",
    description:
      "Compartilhe o caminho com outras participantes em um grupo de apoio.",
  },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand--footer" : ""}`}
      href="#inicio"
      aria-label="Projeto Verão: início"
    >
      <SummerIcon name="sun" />
      <span>
        projeto <em>verão</em>
        <small>MAGRA E DEFINIDA</small>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <SummerNavigation />
          <SummerCTA placement="header" variant="dark" className="header-cta">
            Começar
          </SummerCTA>
        </div>
      </header>
      <main id="conteudo">
        <section id="inicio" className="hero" data-section="hero">
          <div className="hero-inner container">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-sun" /> PROJETO VERÃO · MAGRA E DEFINIDA
              </p>
              <h1>
                Mais leve.
                <br />
                Mais definida.
                <br />
                <em>Mais você.</em>
              </h1>
              <p className="hero-description">
                Seu projeto vai além do verão. Encontre um novo ritmo com mais
                movimento, confiança e liberdade para se sentir bem na sua
                própria pele.
              </p>
              <SummerCTA placement="hero">Quero meu Projeto Verão</SummerCTA>
              <p className="cta-note">
                Seu primeiro passo começa no checkout do Projeto Verão.
              </p>
              <div className="hero-tags">
                <span>
                  <SummerIcon name="check" /> Seu corpo, seu ritmo
                </span>
                <span>
                  <SummerIcon name="check" /> Bem-estar em primeiro lugar
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Image
                  src="/images/verao-praia.webp"
                  alt="Imagem ilustrativa de uma mulher se movimentando com alegria à beira-mar"
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 680px"
                  preload
                />
              </div>
              <div className="sun-sticker">
                <SummerIcon name="sun" />
                <span>
                  Seu verão.
                  <br />
                  <em>Seu ritmo.</em>
                </span>
              </div>
              <div className="photo-caption">
                <span>MOVIMENTO É LIBERDADE</span>
                <SummerIcon name="wave" />
              </div>
            </div>
          </div>
          <div className="summer-strip" aria-hidden="true">
            <span>MAIS ENERGIA</span>
            <SummerIcon name="sun" />
            <span>MAIS MOVIMENTO</span>
            <SummerIcon name="sun" />
            <span>MAIS LIBERDADE</span>
            <SummerIcon name="sun" />
            <span>MAIS VOCÊ</span>
          </div>
        </section>

        <section
          id="proposta"
          className="introduction section-space"
          data-section="proposta"
        >
          <div className="container intro-grid">
            <div>
              <p className="eyebrow">UM NOVO JEITO DE COMEÇAR</p>
              <h2>
                Não é sobre caber
                <br />
                em um padrão.
                <br />É sobre <em>se sentir bem.</em>
              </h2>
            </div>
            <div className="intro-body">
              <p className="lead">
                O verão é um convite. O cuidado com você é para a vida.
              </p>
              <p>
                O Projeto Verão: Magra e Definida une o desejo de transformar
                sua rotina com uma visão mais leve do processo: movimento,
                hábitos e constância, respeitando o seu ponto de partida.
              </p>
              <p>
                Sem precisar esperar a segunda-feira perfeita. Comece entendendo
                o que faz sentido para o seu momento.
              </p>
              <SummerCTA placement="proposta" variant="dark">
                Quero conhecer o projeto
              </SummerCTA>
            </div>
          </div>
        </section>

        <section
          id="programa"
          className="program section-space"
          data-section="programa"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">UM CAMINHO, NÃO UM ATALHO</p>
                <h2>
                  Seu próximo capítulo
                  <br />
                  pode ser <em>mais leve.</em>
                </h2>
              </div>
              <p>
                Conheça os pilares da proposta.
                <br />O objetivo é evoluir sem deixar
                <br />
                de viver a sua vida.
              </p>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit) => (
                <article className="benefit" key={benefit.number}>
                  <div className="benefit-top">
                    <SummerIcon name={benefit.icon} />
                    <span>{benefit.number}</span>
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
            <div className="program-footer">
              <p>Mais movimento. Mais cuidado. Um passo de cada vez.</p>
              <SummerCTA placement="programa" variant="light">
                Encontre seu novo ritmo
              </SummerCTA>
            </div>
          </div>
        </section>

        <SummerEvidenceSection />

        <section className="manifesto" data-section="bem_estar">
          <div className="container manifesto-inner">
            <p className="eyebrow">PARA O VERÃO. PARA VOCÊ.</p>
            <SummerIcon name="sun" className="manifesto-sun" />
            <h2>
              O melhor projeto
              <br />é <em>você.</em>
            </h2>
            <p>
              Não deixe a vida para depois do resultado.
              <br />
              Sinta o sol, movimente o corpo e celebre o caminho.
            </p>
            <SummerCTA placement="bem_estar" variant="dark">
              Quero começar por mim
            </SummerCTA>
            <span className="manifesto-footer">
              MENOS COBRANÇA. MAIS PRESENÇA.
            </span>
          </div>
        </section>

        <section
          id="como-funciona"
          className="how section-space"
          data-section="como_funciona"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">DO SEU JEITO, DESDE O COMEÇO</p>
                <h2>
                  O primeiro passo
                  <br />é <em>simples.</em>
                </h2>
              </div>
              <p>
                Nada de complicar.
                <br />
                Vamos começar com você.
              </p>
            </div>
            <ol className="steps">
              <li>
                <span className="step-number">01</span>
                <div>
                  <h3>Escolha começar</h3>
                  <p>
                    Clique em um dos botões e acesse o checkout do Projeto
                    Verão.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-number">02</span>
                <div>
                  <h3>Confira sua inscrição</h3>
                  <p>
                    Confira o valor e as condições da oferta e preencha os
                    dados solicitados no checkout.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-number">03</span>
                <div>
                  <h3>Finalize sua participação</h3>
                  <p>
                    Conclua a compra e siga as orientações apresentadas para
                    os próximos passos.
                  </p>
                </div>
              </li>
            </ol>
            <SummerCTA placement="como_funciona">
              Dar meu primeiro passo
            </SummerCTA>
          </div>
        </section>

        <section
          id="participar"
          className="enrollment section-space"
          data-section="participar"
          aria-labelledby="offer-title"
        >
          <div className="container enrollment-grid">
            <div className="enrollment-copy">
              <p className="eyebrow">SEU PROJETO. SEU NOVO COMEÇO.</p>
              <h2 id="offer-title">
                Um sim para você.
                <br />
                <em>Um novo começo.</em>
              </h2>
              <p>
                Mais movimento, hábitos mais leves e um caminho para cuidar de
                você. Conheça os benefícios do Projeto Verão e dê o próximo
                passo por R$ 97.
              </p>
              <p className="enrollment-small">
                Seu corpo, seu ritmo. Resultados variam de pessoa para pessoa.
              </p>
            </div>
            <div className="enrollment-card">
              <SummerIcon name="sun" className="enrollment-sun" />
              <span className="eyebrow">PROJETO VERÃO</span>
              <h3>
                Magra
                <br />
                <em>e definida.</em>
              </h3>
              <div className="offer-price-block">
                <div className="offer-price-top">
                  <p className="offer-original-price">
                    De <del>R$ 397</del>
                  </p>
                  <span className="offer-saving">Economize R$ 300</span>
                </div>
                <p className="offer-price">
                  <span className="offer-price-label">por</span>
                  <span className="offer-currency">R$</span>
                  <strong>97</strong>
                </p>
              </div>
              <div className="enrollment-divider" />
              <p className="offer-benefits-heading" id="offer-benefits-title">
                Os benefícios do seu projeto
              </p>
              <ul aria-labelledby="offer-benefits-title">
                {benefits.map((benefit) => (
                  <li key={benefit.number}>
                    <SummerIcon name="check" />
                    <span>{benefit.title}</span>
                  </li>
                ))}
              </ul>
              <SummerCTA placement="participar" variant="dark">
                Quero começar por R$ 97
              </SummerCTA>
              <p className="cta-note">
                Finalize sua inscrição no checkout Greenn.
                <br />
                Confira as formas de pagamento na próxima etapa.
              </p>
            </div>
          </div>
        </section>

        <section id="duvidas" className="faq section-space" data-section="faq">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">ANTES DO PRIMEIRO PASSO</p>
              <h2>
                Vamos deixar
                <br />
                tudo <em>mais claro?</em>
              </h2>
              <p>
                Algumas respostas para começar
                <br />
                com tranquilidade.
              </p>
            </div>
            <SummerFAQ />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Brand footer />
          <p>
            Mais movimento.
            <br />
            Mais liberdade. Mais você.
          </p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram <SummerIcon name="arrow" />
          </a>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Projeto Verão · Magra e Definida.</p>
          <p>
            Resultados variam de pessoa para pessoa. Imagem de campanha
            ilustrativa.
          </p>
        </div>
      </footer>
      <SummerCTA placement="floating_whatsapp" variant="floating">
        WhatsApp
      </SummerCTA>
      <SummerExperience />
    </>
  );
}
