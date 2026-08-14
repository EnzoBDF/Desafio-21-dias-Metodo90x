import Image from "next/image";
import { displayTitle, primaryButton, secondaryButton } from "./styles";
import { TrackedLink } from "./TrackedActions";

export function HeroSection() {
  return (
    <section
      className="bg-page-texture relative isolate min-h-[42rem] overflow-hidden text-white sm:min-h-[45rem] md:min-h-[48rem] lg:min-h-svh"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(31,31,31,0) 45%, #1f1f1f 84%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-0 -z-20 mx-auto h-[33rem] w-full max-w-[54rem] overflow-hidden bg-[#111] sm:h-[35rem] md:h-[40rem] lg:h-full"
        aria-hidden="true"
      >
        <Image
          className="object-cover object-[50%_0]"
          src="/images/ela-voltou.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 48rem) 100vw, 54rem"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_34%,rgba(0,0,0,0.36)_68%,#1f1f1f_96%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-[clamp(17rem,54svh,22rem)] text-center sm:px-8 md:px-10 lg:items-start lg:pt-[42svh] lg:text-left">
        <h1
          id="hero-title"
          className={`${displayTitle} flex max-w-[23rem] flex-col items-center overflow-hidden text-[clamp(2.15rem,10vw,2.75rem)] leading-[0.88] text-[#ff6418] md:max-w-[38rem] md:text-[clamp(3rem,6vw,3.75rem)] lg:items-start`}
        >
          <span className="block origin-center scale-x-[0.84] whitespace-nowrap text-white">
            VOCÊ NÃO PERDEU A
          </span>
          <span className="block origin-center scale-x-[0.84] whitespace-nowrap">
            MULHER QUE EXISTE
          </span>
          <span className="block origin-center scale-x-[0.84] whitespace-nowrap text-white">
            EM VOCÊ
          </span>
        </h1>

        <p
          className={`${displayTitle} mt-4 flex max-w-[22rem] flex-col text-[clamp(1.1rem,5.3vw,1.45rem)] leading-[1.04] text-[#ff6418] md:max-w-[32rem] md:text-[clamp(1.45rem,3vw,1.75rem)]`}
        >
          <span>E ela só está esperando você decidir voltar</span>
        </p>

        <p className="mt-4 max-w-[22rem] text-center text-[clamp(0.82rem,3.5vw,0.95rem)] font-semibold leading-[1.8] text-white/95 md:max-w-[30rem] md:text-base lg:text-left">
          Em 21 dias, você inicia uma jornada com treinos no aplicativo,
          avaliação inicial e acompanhamento da equipe Método 90X para
          reconstruir sua rotina, fortalecer seu corpo e recuperar sua
          confiança.
        </p>

        <div className="mt-8 flex w-full max-w-[22.5rem] flex-col gap-3.5 md:max-w-none md:flex-row md:justify-center lg:justify-start">
          <TrackedLink
            className={primaryButton}
            href="#pricing"
            eventName="hero_cta_clicked"
            eventProperties={{
              cta: "start_21_days",
              destination: "pricing",
            }}
          >
            QUERO COMEÇAR MEUS 21 DIAS
          </TrackedLink>
          <TrackedLink
            className={secondaryButton}
            href="#video"
            eventName="hero_cta_clicked"
            eventProperties={{
              cta: "watch_video",
              destination: "video",
            }}
          >
            ASSISTIR AO VÍDEO
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
