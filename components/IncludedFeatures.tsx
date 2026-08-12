import { Icon } from "./Icon";
import { displayTitle, sectionContainer } from "./styles";

const features = [
  {
    icon: "app" as const,
    title: "Aplicativo de treinos",
    description:
      "Gerencie e acesse seu treino de maneira prática e centralizada",
  },
  {
    icon: "analysis" as const,
    title: "Análise Inicial",
    description: "Receba uma análise para compreender seu estágio atual",
  },
  {
    icon: "training" as const,
    title: "Treinos Personalizados",
    description: "Seja em casa ou na academia, você recebe um treino exclusivo",
  },
];

const columns = Array.from({ length: 2 }, (_, index) => ({
  id: index + 1,
  features,
}));

export function IncludedFeatures() {
  return (
    <section
      className="relative overflow-hidden bg-[#1f1f1f] pb-20 pt-12 text-white before:absolute before:inset-x-0 before:bottom-0 before:h-3/5 before:bg-[radial-gradient(circle_at_50%_100%,rgba(255,100,24,0.28),transparent_58%)] md:py-20"
      aria-labelledby="included-title"
    >
      <div className={`${sectionContainer} relative`}>
        <h2
          id="included-title"
          className={`${displayTitle} mx-auto flex max-w-[17rem] flex-col items-center text-center text-[clamp(2rem,8vw,2.7rem)] leading-[0.98] text-[#ff6418] md:max-w-[28rem] md:text-[clamp(2.8rem,5.4vw,3.5rem)]`}
        >
          <span className="text-white">NO DESAFIO 21</span>
          <span>VOCÊ RECEBE</span>
        </h2>
      </div>

      <div
        className="scrollbar-none relative mt-16 flex snap-x snap-mandatory overflow-x-auto pb-3 pt-7 md:mx-auto md:max-w-6xl"
        style={{
          gap: "clamp(0.75rem, 4vw, 1.5rem)",
          paddingInline: "calc((100% - min(76vw, 22rem)) / 2)",
        }}
        aria-label="Itens inclusos"
      >
        {columns.map((column) => (
          <div
            className="grid w-[76vw] max-w-[22rem] shrink-0 snap-center gap-12 md:w-[22rem]"
            key={column.id}
          >
            {column.features.map((feature) => (
              <article
                className="relative grid min-h-24 w-full place-items-center rounded-lg border-b-2 border-[#ff6418] bg-white px-5 pb-4 pt-7 text-center text-[#070707] shadow-[0_0.55rem_1.1rem_rgba(0,0,0,0.34)]"
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
