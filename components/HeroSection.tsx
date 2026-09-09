import Image from "next/image";
import { CHECKOUT_URL } from "@/lib/links";
import { displayTitle, font, primaryButton } from "./styles";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedActions";

const heroHighlights = [
  "Treinos adaptados",
  "Suporte especializado",
  "Casa ou academia",
  "Para iniciantes e avançadas",
];

export function HeroSection() {
  return (
    <section
      className="bg-page-texture relative z-20 isolate min-h-[42rem] w-full overflow-hidden text-white sm:min-h-[45rem] md:min-h-[48rem] lg:min-h-svh xl:min-h-[52rem]"
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
        className="absolute inset-x-0 top-0 -z-20 h-[33rem] w-full overflow-hidden bg-[#111] sm:h-[35rem] md:h-[40rem] lg:h-full"
      >
        <Image
          className="object-cover object-[50%_0]"
          src="/images/Bumbum.png"
          alt="Aluna do Desafio 21 Dias mostrando o resultado do treino de glúteos"
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
          className={`${displayTitle} mt-3 w-full text-[clamp(1rem,4.4vw,1.25rem)] leading-[1.1] tracking-[0.04em] text-white/70 md:max-w-[32rem] md:text-[1.35rem] lg:max-w-[42rem]`}
        >
          Você só precisa começar.
        </p>

        <p className="mt-4 w-full text-left text-[clamp(0.88rem,3.5vw,1rem)] font-semibold leading-[1.65] text-white/95 md:max-w-[31rem] md:text-base lg:text-left">
          Treinos direcionados para glúteos, em casa ou na academia, com
          progressão e acompanhamento durante 21 dias.
        </p>

        {/* Separador como ::before do proprio item: na quebra de linha ele
            acompanha o texto seguinte em vez de ficar orfao no fim da linha. */}
        <ul className="mt-5 flex w-full flex-wrap items-center gap-x-2 gap-y-1 border-y border-white/15 py-3 text-[0.72rem] font-bold uppercase leading-[1.35] text-white/80 md:max-w-[36rem] md:text-sm">
          {heroHighlights.map((highlight, index) => (
            <li
              className={
                index === 0
                  ? ""
                  : "before:mr-2 before:text-[#ff6418] before:content-['•']"
              }
              key={highlight}
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex w-full flex-col items-start gap-4 pb-8 md:max-w-none md:flex-row md:items-center md:gap-7 md:pb-0">
          <div className="flex w-full flex-col items-start gap-1.5 md:w-auto">
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
                original_price: 199.9,
                currency: "BRL",
              }}
            >
              QUERO MEU BUMBUM NA NUCA
            </TrackedLink>
            <p className="flex w-full flex-wrap items-center justify-center gap-x-1.5 text-[0.78rem] font-semibold text-white/65 md:text-sm">
              <span className="text-white/45 line-through">R$ 199,90</span>
              <span className="font-bold text-white/90">R$ 99,90 à vista</span>
              <span className="text-[#ff6418]" aria-hidden="true">
                ·
              </span>
              <span>7 dias de garantia</span>
            </p>
          </div>

          {/* globals.css aplica `a { color: inherit; text-decoration: none }`
              fora de camada, entao utilitarios de cor e sublinhado no proprio
              <a> nao pegam. A aparencia fica nos spans internos. */}
          <TrackedLink
            className="group inline-flex min-h-14 w-full items-center justify-center gap-2.5 border-2 border-white/80 px-5 transition-colors hover:border-[#ff6418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418] md:w-auto md:min-w-72"
            href="#video"
            eventName="content_navigation_clicked"
            eventProperties={{
              placement: "hero",
              cta_id: "hero_watch_video",
              intent: "learn_more",
              target_section: "video",
            }}
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-current text-white transition-colors group-hover:text-[#ff6418]">
              <Icon name="play" className="size-3.5" />
            </span>
            <span
              className={`${font.oswald} text-[clamp(1rem,3.2vw,1.15rem)] font-black uppercase leading-none text-white transition-colors group-hover:text-[#ff6418]`}
            >
              ASSISTIR AO VÍDEO
            </span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
