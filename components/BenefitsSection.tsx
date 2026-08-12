import { Icon } from "./Icon";
import { displayTitle, sectionContainer } from "./styles";

const benefits = [
  {
    icon: "calendar" as const,
    title: "21 DIAS",
    description: "Para começar com direção",
  },
  {
    icon: "target" as const,
    title: "3 MISSÕES",
    description: "Para objetivos diferentes",
  },
  {
    icon: "shield" as const,
    title: "1 MÉTODO",
    description: "Com acompanhamento",
  },
  {
    icon: "heart" as const,
    title: "VOCÊ",
    description: "Como prioridade novamente",
  },
];

export function BenefitsSection() {
  return (
    <section
      className="min-h-svh bg-[#1f1f1f] py-16 text-white md:min-h-0 md:py-20"
      aria-label="Benefícios do Desafio 21 Dias"
    >
      <div
        className={`${sectionContainer} grid gap-12 text-center sm:gap-14 md:grid-cols-4 md:items-start md:gap-7`}
      >
        {benefits.map((benefit) => (
          <div
            className="mx-auto flex max-w-64 flex-col items-center gap-2 text-white"
            key={benefit.title}
          >
            <Icon name={benefit.icon} className="h-8 w-8" />
            <strong
              className={`${displayTitle} mt-0.5 block text-[clamp(1.45rem,7vw,1.75rem)] leading-none text-[#ff6418]`}
            >
              {benefit.title}
            </strong>
            <span
              className={`${displayTitle} max-w-48 text-[clamp(1.15rem,6vw,1.4rem)] leading-[1.18]`}
            >
              {benefit.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
