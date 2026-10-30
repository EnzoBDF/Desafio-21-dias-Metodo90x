import { CHECKOUT_URL } from "@/lib/links";
import { CHALLENGE_ASSETS } from "@/lib/challengeOffer";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";
import { TrackedLink, TrackedVideo } from "./TrackedActions";

export function MessageSection() {
  return (
    <section
      className="bg-page-texture py-12 text-white md:py-20 lg:py-24"
      aria-labelledby="message-title"
    >
      <div className={sectionContainer}>
        <h2
          id="message-title"
          className={`${displayTitle} mx-auto flex max-w-[21rem] flex-col items-center text-center text-[clamp(2.15rem,8.8vw,3.3rem)] leading-[1.02] text-white md:max-w-[39rem] lg:max-w-[52rem] lg:text-[4.6rem]`}
        >
          <span>PARE DE TREINAR</span>
          <span>
            GLÚTEOS <b className="text-[#ff6418]">SEM DIREÇÃO</b>
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-[21rem] text-center text-[clamp(0.98rem,4vw,1.12rem)] font-medium leading-[1.75] text-white/90 md:max-w-[38rem] lg:text-lg">
          Abra o aplicativo. Encontre seu treino. Saiba por onde começar.
          Seus treinos de academia ficam organizados com orientações de execução,
          progressão e suporte durante 30 dias.
        </p>

        <div className="mt-12 text-center">
          <p
            className={`${displayTitle} mb-4 text-base leading-none tracking-[0.18em] text-[#ff6418]`}
          >
            CONHEÇA O BUMBUM NA NUCA
          </p>
          <h2
            className={`${displayTitle} mx-auto flex max-w-[20rem] flex-col text-[clamp(2rem,8vw,3.1rem)] text-white md:max-w-[36rem] lg:max-w-[42rem] lg:text-[4rem]`}
          >
            <span>MENOS TEMPO</span>
            <span className="my-2">PROCURANDO EXERCÍCIOS.</span>
            <span>MAIS CLAREZA PARA TREINAR.</span>
          </h2>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-[1.8] text-white/75">Assista à apresentação do desafio. No aplicativo, consulte a sequência de exercícios e as orientações; use os canais de suporte quando precisar esclarecer dúvidas.</p>
        <div
          id="video"
          className={`bg-panel-texture mx-auto mt-8 grid aspect-[9/16] w-full max-w-[22rem] place-items-center overflow-hidden rounded-sm border border-white/10 md:max-w-[26rem] lg:mt-12 lg:max-w-[28rem] ${glow.panel}`}
          role="region"
          aria-label="Vídeo do desafio Bumbum na Nuca"
        >
          <TrackedVideo
            className="h-full w-full object-contain"
            controls
            playsInline
            poster={CHALLENGE_ASSETS.campaign}
            preload="metadata"
            aria-label="Vídeo do desafio Bumbum na Nuca"
            eventName="video_started"
            eventProperties={{
              placement: "video_section",
              video_id: "video_bumbum_na_nuca",
            }}
          >
            <source
              src="/Video%20-%20Bumbum%20na%20nuca.mp4"
              type="video/mp4"
            />
            Seu navegador não suporta a reprodução deste vídeo.
          </TrackedVideo>
        </div>

        <div className="mt-7 flex justify-center md:mt-9">
          <TrackedLink
            className={`${primaryButton} max-w-[20rem]`}
            href={CHECKOUT_URL}
            eventName="checkout_started"
            eventProperties={{
              placement: "video_section",
              cta_id: "video_primary",
              intent: "purchase",
              destination: "checkout",
              offer_price: 97,
              currency: "BRL",
            }}
          >
            QUERO TER ACESSO AO DESAFIO
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
