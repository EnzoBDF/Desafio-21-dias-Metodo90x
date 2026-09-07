import Image from "next/image";
import { CHECKOUT_URL } from "@/lib/links";
import { displayTitle, primaryButton, secondaryButton } from "./styles";
import { TrackedLink } from "./TrackedActions";

export function HeroSection() {
  return (
    <section
      className="bg-page-texture relative z-20 isolate min-h-[42rem] w-[100svw] max-w-none overflow-hidden text-white sm:min-h-[45rem] md:min-h-[48rem] lg:min-h-svh xl:min-h-[52rem]"
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
        className="absolute inset-x-0 top-0 -z-20 h-[33rem] w-[100svw] max-w-none overflow-hidden bg-[#111] sm:h-[35rem] md:h-[40rem] lg:h-full"
        aria-hidden="true"
      >
        <Image
          className="object-cover object-[50%_0]"
          src="/images/Bumbum.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_34%,rgba(0,0,0,0.36)_68%,#1f1f1f_96%)]" />
      </div>

      <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col items-start px-3 pt-[clamp(17rem,54svh,22rem)] text-left sm:px-6 md:px-8 lg:px-10 lg:pt-[36svh] xl:pt-[34svh]">
        {/* @container + cqi: a maior linha ("PODE SE TORNAR REALIDADE") mede
            11.75em, entao a fonte precisa caber em largura/11.75 = 8.51cqi.
            8.3cqi mantem uma margem de seguranca e nunca corta o texto. */}
        <div className="@container w-full min-w-0 max-w-[38rem] lg:max-w-[44rem] xl:max-w-[52rem]">
          <h1
            id="hero-title"
            className={`${displayTitle} flex w-full min-w-0 flex-col items-start text-left text-[min(5.5rem,8.3cqi)] leading-[0.88] text-[#ff6418]`}
          >
            <span className="block w-full whitespace-nowrap text-white">
              O BUMBUM DOS SONHOS
            </span>
            <span className="block w-full whitespace-nowrap">
              PODE SE TORNAR REALIDADE
            </span>
            <span className="block w-full whitespace-nowrap text-white">
              COM O DESAFIO 21 DIAS
            </span>
          </h1>
        </div>

        <p
          className={`${displayTitle} mt-4 flex w-full flex-col text-[clamp(1.2rem,6.2vw,1.65rem)] leading-[1.04] text-[#ff6418] md:max-w-[32rem] md:text-[clamp(1.45rem,3vw,1.75rem)] lg:max-w-[42rem] lg:text-[clamp(1.6rem,2.2vw,2.2rem)]`}
        >
          <span>Você só precisa começar.</span>
        </p>

        <p className="mt-4 w-full text-left text-[clamp(0.88rem,3.5vw,1rem)] font-semibold leading-[1.65] text-white/95 md:max-w-[31rem] md:text-base lg:text-left">
          Treinos direcionados para glúteos, em casa ou na academia, com
          progressão e acompanhamento durante 21 dias.
        </p>

        <div className="mt-5 flex w-full flex-wrap items-center gap-x-2 gap-y-1 border-y border-white/15 py-3 text-[0.72rem] font-bold uppercase leading-[1.35] text-white/80 md:max-w-[36rem] md:text-sm">
          <span>Treinos adaptados</span>
          <span className="text-[#ff6418]" aria-hidden="true">•</span>
          <span>Suporte especializado</span>
          <span className="text-[#ff6418]" aria-hidden="true">•</span>
          <span>Casa ou academia</span>
          <span className="text-[#ff6418]" aria-hidden="true">•</span>
          <span>Para iniciantes e avançadas</span>

        </div>

        <div className="mt-6 flex w-full flex-col gap-3.5 md:max-w-none md:flex-row md:justify-center lg:justify-start">
          <TrackedLink
            className={primaryButton}
            href={CHECKOUT_URL}
            eventName="checkout_started"
            eventProperties={{
              placement: "hero",
              cta_id: "hero_primary",
              intent: "purchase",
              destination: "checkout",
              offer_price: 99.9,
              currency: "BRL",
            }}
          >
            QUERO MEU BUMBUM NA NUCA
          </TrackedLink>
          <TrackedLink
            className={secondaryButton}
            href="#video"
            eventName="content_navigation_clicked"
            eventProperties={{
              placement: "hero",
              cta_id: "hero_watch_video",
              intent: "learn_more",
              target_section: "video",
            }}
          >
            ASSISTIR AO VÍDEO
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
