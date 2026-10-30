import Image from "next/image";
import { CHECKOUT_URL } from "@/lib/links";
import { CHALLENGE_ASSETS, CHALLENGE_DAYS } from "@/lib/challengeOffer";
import { displayTitle, primaryButton, sectionContainer } from "./styles";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedActions";

export function HeroSection() {
  return (
    <section className="bg-page-texture relative z-20 w-full py-6 text-white md:py-12 lg:py-16" aria-labelledby="hero-title">
      <div className={`${sectionContainer} grid items-center gap-8 lg:min-h-[44rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12`}>
        <div className="order-1 min-w-0">
          <p className={`${displayTitle} text-base tracking-wide text-[#ff6418] md:text-xl`}>DESAFIO BUMBUM NA NUCA · {CHALLENGE_DAYS} DIAS</p>
          <h1 id="hero-title" className={`${displayTitle} mt-4 text-[clamp(2rem,7.5vw,3.8rem)] leading-[1.08] text-white`}>
            Você treina, mas sente que seus glúteos <span className="text-[#ff6418]">não acompanham o seu esforço?</span>
          </h1>
          <p className="mt-5 text-base font-semibold leading-[1.8] text-white/95 md:text-lg">Comece a construir glúteos mais firmes, redondos e empinados com {CHALLENGE_DAYS} dias de treino direcionado, progressão e acompanhamento.</p>
          <p className="mt-4 text-sm leading-[1.8] text-white/75 md:text-base">Saiba quais exercícios fazer, como executar e como evoluir, com seus treinos organizados no aplicativo e suporte da equipe.</p>
          <ul className="mt-5 grid gap-3 border-y border-white/15 py-5 text-sm font-semibold leading-relaxed md:text-base">
            {["Treinamento exclusivo para academia.", "Avaliação inicial para orientar seu ponto de partida.", `Suporte durante os ${CHALLENGE_DAYS} dias.`].map(item => <li key={item} className="flex gap-3"><Icon name="check" className="mt-0.5 size-5 text-[#ff6418]" /><span>{item}</span></li>)}
          </ul>
          <div className="mt-6 grid gap-4">
            <TrackedLink className={primaryButton} href={CHECKOUT_URL} eventName="checkout_started" eventProperties={{ placement: "hero", cta_id: "hero_primary", intent: "purchase", destination: "checkout", offer_price: 97, original_price: 397, currency: "BRL" }}>QUERO EMPINAR O BUMBUM</TrackedLink>
            <p className="text-center text-sm font-semibold text-white/75">De <del>R$ 397</del> por R$ 97 à vista · Garantia de 7 dias</p>
            <TrackedLink className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/35 px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418]" href="#video" eventName="content_navigation_clicked" eventProperties={{ placement: "hero", cta_id: "hero_watch_video", intent: "learn_more", target_section: "video" }}><Icon name="play" className="size-5" /> CONHEÇA O DESAFIO EM VÍDEO</TrackedLink>
          </div>
        </div>
        <figure className="order-2 mx-auto w-full max-w-[36rem] overflow-hidden rounded-xl border border-white/10 bg-black">
          <Image src={CHALLENGE_ASSETS.campaign} alt="Arte de campanha Bumbum na Nuca: 30 dias de glúteos e estratégia, Método 90X. Imagem ilustrativa." width={1254} height={1254} priority sizes="(max-width: 1023px) calc(100vw - 48px), 520px" className="h-auto w-full object-contain" />
          <figcaption className="px-4 py-2 text-center text-xs text-white/60">Imagem de campanha ilustrativa. Não representa resultado de aluna.</figcaption>
        </figure>
      </div>
    </section>
  );
}
