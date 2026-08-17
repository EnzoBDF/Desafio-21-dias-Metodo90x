import { Icon } from "./Icon";
import { displayTitle, glow, sectionContainer } from "./styles";

const features = [
  {
    icon: "analysis",
    title: "Avaliação Inicial",
    description:
      "Receba uma avaliação completa para entender seu corpo e definir metas realistas",
  },
  {
    icon: "target",
    title: "Estratégia Alimentar Personalizada",
    description: "Receba uma dieta adaptada ao seu objetivo e estilo de vida",
  },
  {
    icon: "app",
    title: "Aplicativo de treinos",
    description:
      "Gerencie e acesse seu treino personalizado de maneira prática e centralizada",
  },

  {
    icon: "training",
    title: "Acompanhamento individualizado",
    description:
      "Receba orientação e suporte personalizado pelo WhatsApp da equipe durante sua jornada",
  },
  {
    icon: "shield",
    title: "Grupo Exclusivo",
    description:
      "Grupo exclusivo no WhatsApp para suporte, motivação e troca de experiências com outros participantes",
  },
  {
    icon: "heart",
    title: "Lives Semanais",
    description:
      "Lives sobre treinos, dicas de emagrecimento, hipertrofia e saúde com especialistas convidados",
  },
] as const;

const featuresPerColumn = 3;

const columns = Array.from(
  { length: Math.ceil(features.length / featuresPerColumn) },
  (_, index) => ({
    id: index + 1,
    features: features.slice(
      index * featuresPerColumn,
      index * featuresPerColumn + featuresPerColumn,
    ),
  }),
);

export function IncludedFeatures() {
  return (
    <section
      className="bg-warm-texture-reverse relative isolate overflow-hidden pb-20 pt-12 text-white md:py-20 lg:py-24"
      aria-labelledby="included-title"
    >
      <div className={`${sectionContainer} relative z-10`}>
        <h2
          id="included-title"
          className={`${displayTitle} mx-auto flex max-w-[17rem] flex-col items-center text-center text-[clamp(2rem,8vw,2.7rem)] leading-[0.98] text-[#ff6418] md:max-w-[28rem] md:text-[clamp(2.8rem,5.4vw,3.5rem)] lg:max-w-[34rem] lg:text-[4.1rem]`}
        >
          <span className="text-white">NO DESAFIO 21</span>
          <span>VOCÊ RECEBE</span>
        </h2>
      </div>

      <div
        className="scrollbar-none relative z-10 mt-16 flex gap-[clamp(0.75rem,4vw,1.5rem)] overflow-x-auto px-[calc((100%_-_min(76vw,22rem))_/_2)] pb-3 pt-7 md:mx-auto md:max-w-6xl lg:mt-20 lg:justify-center lg:gap-10 lg:overflow-visible lg:px-10 lg:pb-0"
        aria-label="Itens inclusos"
      >
        {columns.map((column) => (
          <div
            className="grid w-[76vw] max-w-[22rem] shrink-0 gap-12 md:w-[22rem] lg:w-[24rem] lg:max-w-[24rem] lg:gap-14"
            key={column.id}
          >
            {column.features.map((feature) => (
              <article
                className={`relative grid min-h-24 w-full place-items-center rounded-lg border-b-2 border-[#ff6418] bg-white px-5 pb-4 pt-7 text-center text-[#070707] lg:min-h-28 lg:px-7 lg:pb-5 lg:pt-8 ${glow.darkCard}`}
                key={`${column.id}-${feature.title}`}
              >
                <span className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#ff6418]">
                  <Icon name={feature.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h3
                    className={`${displayTitle} text-[clamp(1.25rem,5.2vw,1.55rem)] leading-none text-[#ff6418]`}
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[clamp(0.82rem,3.5vw,0.93rem)] font-bold leading-[1.12]">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
