import { Icon } from "./Icon";
import { displayTitle, glow, sectionContainer } from "./styles";

export function MessageSection() {
  return (
    <section
      className="bg-page-texture py-12 text-white md:py-20"
      aria-labelledby="message-title"
    >
      <div className={sectionContainer}>
        <h2
          id="message-title"
          className={`${displayTitle} mx-auto flex max-w-[21rem] flex-col items-center text-center text-[clamp(2rem,8.5vw,3.15rem)] text-[#ff6418] md:max-w-[39rem]`}
        >
          <span className="text-white">VOCÊ NÃO PERDEU</span>
          <span className="text-white">
            SUA <b className="text-[#ff6418]">FORÇA</b>, SUA
          </span>
          <span>
            <b>BELEZA</b> OU SUA
          </span>
          <span>FEMINILIDADE</span>
        </h2>

        <p className="mx-auto mt-9 max-w-[19rem] text-center text-[clamp(1rem,4vw,1.18rem)] leading-[2.1] text-white/95 md:max-w-[35rem]">
          Você apenas passou tempo demais cuidando de tudo e de todos, e acabou
          deixando você mesma para depois.
        </p>

        <div className="mt-9 text-center">
          <p
            className={`${displayTitle} mb-4 text-base leading-none tracking-[0.18em] text-[#ff6418]`}
          >
            CONHEÇA O DESAFIO 21
          </p>
          <h2
            className={`${displayTitle} mx-auto flex max-w-[20rem] flex-col text-[clamp(2rem,8vw,3.1rem)] text-white md:max-w-[36rem]`}
          >
            <span>ASSISTA E</span>
            <span>DESCUBRA COMO</span>
            <span>COMEÇAR</span>
          </h2>
        </div>

        <div
          id="video"
          className={`bg-panel-texture mx-auto mt-8 grid aspect-video w-full max-w-[45rem] place-items-center overflow-hidden rounded-sm border border-white/10 ${glow.panel}`}
          role="region"
          aria-label="Vídeo do Desafio 21 Dias"
        >
          <button
            className={`grid size-[4.625rem] place-items-center rounded-full border-2 border-[#ff6418] bg-[#1f1f1f]/90 text-[#ff6418] ${glow.orangeHalo} transition duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418]`}
            type="button"
            aria-label="Reproduzir vídeo"
          >
            <Icon name="play" className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
}
