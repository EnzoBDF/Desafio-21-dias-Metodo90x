import { displayTitle, glow } from "./styles";
import { StepCard } from "./StepCard";

const steps = [
  {
    number: "01",
    title: "FAÇA SUA INSCRIÇÃO",
    description: "Finalize sua compra com segurança",
    align: "right" as const,
  },
  {
    number: "02",
    title: "RESPONDA À AVALIAÇÃO",
    description: "Preencha a anamnese e envie as fotos solicitadas",
    align: "left" as const,
  },
  {
    number: "03",
    title: "RECEBA SEUS ACESSOS",
    description: "Entre no aplicativo e nos canais de suporte",
    align: "right" as const,
  },
  {
    number: "04",
    title: "COMECE SUA MISSÃO",
    description: "Siga os treinos e conte com nosso suporte durante 21 dias",
    align: "left" as const,
  },
];

export function HowItWorks() {
  return (
    <section
      className="bg-warm-texture relative min-h-svh overflow-hidden pb-0 pt-6 text-white md:py-10 lg:py-24"
      aria-labelledby="how-title"
    >
      <div className="relative mx-auto w-full">
        <h2
          id="how-title"
          className={`${displayTitle} relative z-10 mx-auto flex max-w-[16rem] flex-col items-center px-6 text-center text-[clamp(2rem,8.8vw,2.85rem)] leading-[1.02] text-[#ff6418] md:max-w-[28rem] md:text-[clamp(3rem,5.5vw,3.7rem)] lg:max-w-[34rem] lg:text-[4.15rem]`}
        >
          <span>COMO FUNCIONA</span>
          <span className="text-white">O DESAFIO 21</span>
          <span className="text-white">DIAS?</span>
        </h2>

        <div
          className="relative mx-auto mt-14 flex min-h-[calc(100svh-11rem)] w-full flex-col justify-between gap-8 pb-0 pt-4 md:max-w-[54rem] lg:mt-20 lg:min-h-[46rem] lg:max-w-6xl lg:gap-12"
        >
          <div
            className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 overflow-hidden"
            aria-hidden="true"
          >
            <span
              className={`block h-full bg-[#ff6418] ${glow.orangeLine}`}
            />
          </div>

          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
