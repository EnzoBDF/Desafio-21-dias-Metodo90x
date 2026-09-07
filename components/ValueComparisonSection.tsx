import { Icon } from "./Icon";
import { displayTitle, glow, sectionContainer } from "./styles";

const separateServices = [
  "Profissionais contratados separadamente",
  "Agenda e acompanhamento em canais diferentes",
  "Planos que podem não seguir a mesma direção",
  "Investimento variável conforme cada profissional",
];

const challengeBenefits = [
  "Treinos de glúteos organizados no aplicativo",
  "Estratégia integrada para os 21 dias",
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
            <p className={displayTitle + " mt-7 text-2xl text-white/65 md:text-3xl"}>
              INVESTIMENTO VARIÁVEL
            </p>
            <ul className="mt-6 grid gap-4 text-sm font-semibold leading-[1.4] md:text-base">
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
                DESAFIO 21
              </h3>
            </div>
            <p className={displayTitle + " mt-7 flex items-baseline text-white"}>
              <span className="mr-2 text-xl text-white/75">R$</span>
              <span className="text-6xl leading-none md:text-7xl">99</span>
              <span className="ml-1 text-3xl leading-none">,90</span>
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
          O Desafio 21 reúne treino, direcionamento e suporte em uma experiência
          integrada. Ele não substitui acompanhamento clínico ou nutricional
          individual quando necessário.
        </p>
      </div>
    </section>
  );
}
