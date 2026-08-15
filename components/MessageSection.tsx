import { displayTitle, glow, sectionContainer } from "./styles";
import { TrackedVideo } from "./TrackedActions";

export function MessageSection() {
  return (
    <section
      className="bg-page-texture py-12 text-white md:py-20 lg:py-24"
      aria-labelledby="message-title"
    >
      <div className={sectionContainer}>
        <h2
          id="message-title"
          className={`${displayTitle} mx-auto flex max-w-[21rem] flex-col items-center text-center text-[clamp(2rem,8.5vw,3.15rem)] text-[#ff6418] md:max-w-[39rem] lg:max-w-[56rem] lg:text-[4.6rem]`}
        >
          <span className="text-white">ESCOLHA UM DESAFIO</span>
          <span className="text-white">
            E <b className="text-[#ff6418]">CONQUISTE</b> SUA
          </span>
          <span>
            <b>MELHOR VERSÃO</b> 
          </span>
          
        </h2>

        <p className="mx-auto mt-9 max-w-[19rem] text-center text-[clamp(1rem,4vw,1.18rem)] leading-[2.1] text-white/95 md:max-w-[35rem] lg:max-w-[46rem] lg:text-xl">
          Chegou o seu momento, seja sua maior prioridade e dê o primeiro passo para transformar seu corpo, com o Desafio 21 Dias.
        </p>

        <div className="mt-9 text-center">
          <p
            className={`${displayTitle} mb-4 text-base leading-none tracking-[0.18em] text-[#ff6418]`}
          >
            CONHEÇA O DESAFIO 21
          </p>
          <h2
            className={`${displayTitle} mx-auto flex max-w-[20rem] flex-col text-[clamp(2rem,8vw,3.1rem)] text-white md:max-w-[36rem] lg:max-w-[42rem] lg:text-[4rem]`}
          >
            <span>ASSISTA E</span>
            <span>DESCUBRA COMO</span>
            <span>COMEÇAR</span>
          </h2>
        </div>

        <div
          id="video"
          className={`bg-panel-texture mx-auto mt-8 grid aspect-[9/16] w-full max-w-[22rem] place-items-center overflow-hidden rounded-sm border border-white/10 md:max-w-[26rem] lg:mt-12 lg:max-w-[28rem] ${glow.panel}`}
          role="region"
          aria-label="Vídeo do Desafio 21 Dias"
        >
          <TrackedVideo
            className="h-full w-full object-cover"
            controls
            playsInline
            poster="/capavideo.jpeg"
            preload="metadata"
            aria-label="Vídeo do Desafio 21 Dias"
            eventName="video_play_clicked"
            eventProperties={{
              location: "message_section",
              video: "whatsapp_video_2026_08_14",
            }}
          >
            <source
              src="/WhatsApp%20Video%202026-08-14%20at%2009.03.34.mp4"
              type="video/mp4"
            />
            Seu navegador não suporta a reprodução deste vídeo.
          </TrackedVideo>
        </div>
      </div>
    </section>
  );
}
