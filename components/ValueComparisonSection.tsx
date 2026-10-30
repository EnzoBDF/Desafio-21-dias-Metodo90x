import { CHECKOUT_URL } from "@/lib/links";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";

const separateServices = [
  "Profissionais contratados separadamente",
  "Agenda e acompanhamento em canais diferentes",
  "Planos que podem não seguir a mesma direção",
  "Investimento variável conforme cada profissional",
];

const challengeBenefits = [
  "Treinos de glúteos organizados no aplicativo",
  "Treino e direcionamento para os 30 dias",
  "Suporte e comunidade com o mesmo objetivo",
  "Um único acesso para acompanhar toda a missão",
];

export function ValueComparisonSection() {
  return (
    <section
      className="bg-warm-texture-reverse relative overflow-hidden pb-14 pt-20 text-white md:pb-20 md:pt-24 lg:pb-24 lg:pt-28"
      aria-labelledby="comparison-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-[#ff6418] via-[#ff6418]/70 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-9 size-1.5 -translate-x-1/2 rounded-full bg-[#ff6418] shadow-[0_0_12px_rgba(255,100,24,0.85)]"
      />

      <div className={`${sectionContainer} relative`}>
        <p className={displayTitle + " text-center text-sm tracking-[0.16em] text-[#ff6418] md:text-base"}>
          COMPARE O INVESTIMENTO
        </p>
        <h2
          id="comparison-title"
          className={displayTitle + " mx-auto mt-3 max-w-[22rem] text-center text-[clamp(2rem,8.5vw,3.35rem)] leading-[0.98] md:max-w-[42rem] lg:text-[4.25rem]"}
        >
          TUDO O QUE VOCÊ PRECISA EM UMA ÚNICA{" "}
          <span className="text-[#ff6418]">MISSÃO</span>
        </h2>

        <div className="relative mx-auto mt-10 grid max-w-5xl gap-5 md:mt-14 md:grid-cols-2 md:gap-7">
          <article className={"bg-panel-texture rounded-xl border border-white/10 p-6 text-white/85 md:p-8 " + glow.darkCard}>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-white/20 text-white/60">
                <Icon name="user" className="size-6" />
              </span>
              <h3 className={displayTitle + " text-2xl leading-none md:text-3xl"}>
                NUTRICIONISTA + PERSONAL
              </h3>
            </div>
            <p className={displayTitle + " mt-7 text-sm tracking-[0.12em] text-white/55 md:text-base"}>
              SIMULAÇÃO MENSAL*
            </p>
            <p
              className={displayTitle + " mt-2 flex flex-wrap items-baseline gap-x-2 text-white/75"}
              aria-label="Faixa estimada de 770 a 1.400 reais por mês"
            >
              <span className="text-lg text-white/55">R$</span>
              <span className="text-4xl leading-none md:text-5xl">770</span>
              <span className="text-xl text-white/45">A</span>
              <span className="text-4xl leading-none md:text-5xl">1.400</span>
              <span className="text-sm text-white/45">/MÊS</span>
            </p>
            <p className="mt-3 text-xs font-semibold leading-relaxed text-white/45 md:text-sm">
              1 consulta nutricional + 2 aulas semanais de personal
            </p>
            <ul className="mt-5 grid gap-4 text-sm font-semibold leading-[1.4] md:text-base">
              {separateServices.map((item) => (
                <li className="grid grid-cols-[1.25rem_1fr] gap-3" key={item}>
                  <span className="text-center text-white/35" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={"bg-panel-texture relative rounded-xl border-2 border-[#ff6418] p-6 md:p-8 " + glow.orangeCard}>
            <span className={displayTitle + " absolute right-4 top-0 -translate-y-1/2 rounded-full bg-[#ff6418] px-4 py-2 text-sm text-white"}>
              MELHOR CUSTO-BENEFÍCIO
            </span>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-[#ff6418] text-white">
                <Icon name="target" className="size-6" />
              </span>
              <h3 className={displayTitle + " text-2xl leading-none md:text-3xl"}>
                DESAFIO 30 DIAS
              </h3>
            </div>
            <p className={displayTitle + " mt-7 text-base leading-none text-white/85 md:text-lg"}>
              De{" "}
              <span className="text-[1.12em] text-white/60 line-through decoration-[#ff6418] decoration-2">
                R$ 397
              </span>{" "}
              por apenas
            </p>
            <p
              className={displayTitle + " mt-2 flex items-baseline text-white"}
              aria-label="De 397 reais por 97 reais"
            >
              <span className="mr-2 text-xl text-white/75">R$</span>
              <span className="text-6xl leading-none md:text-7xl">97</span>
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-[#ff6418] md:text-sm">
              Pagamento único pelos 30 dias
            </p>
            <ul className="mt-6 grid gap-4 text-sm font-semibold leading-[1.4] md:text-base">
              {challengeBenefits.map((item) => (
                <li className="grid grid-cols-[1.25rem_1fr] gap-3" key={item}>
                  <Icon name="check" className="size-5 text-[#ff6418]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mx-auto mt-7 max-w-3xl text-center text-xs font-medium leading-relaxed text-white/55 md:text-sm">
          O Desafio 30 Dias reúne treino, direcionamento e suporte em uma experiência
          integrada. Ele não substitui acompanhamento clínico ou nutricional
          individual quando necessário.
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[0.68rem] leading-relaxed text-white/40 md:text-xs">
          *Simulação ilustrativa com uma consulta nutricional e oito aulas de
          personal. Valores variam por cidade e profissional. Referências:
          tabela FNN 2026 e levantamento FitLocal 2026.
        </p>

        <div className="mt-8 flex justify-center md:mt-10">
          <TrackedLink
            className={`${primaryButton} max-w-[20rem]`}
            href={CHECKOUT_URL}
            eventName="checkout_started"
            eventProperties={{
              placement: "value_comparison",
              cta_id: "value_comparison_primary",
              intent: "purchase",
              destination: "checkout",
              offer_price: 97,
              original_price: 397,
              currency: "BRL",
            }}
          >
            QUERO MEU BUMBUM NA NUCA
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
