import Image from "next/image";
import { CHALLENGE_DAYS } from "@/lib/challengeOffer";
import { CHECKOUT_URL, SOCIAL_LINKS } from "@/lib/links";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, primaryButton, sectionContainer } from "./styles";

const instagram = SOCIAL_LINKS.find((link) => link.id === "instagram");

export function ProfessionalsSection() {
  return (
    <section id="profissionais" className="bg-black py-14 text-white md:py-20 lg:py-24" aria-labelledby="professionals-title">
      <div className={sectionContainer}>
        <h2 id="professionals-title" className={`${displayTitle} mx-auto max-w-3xl text-center text-[clamp(2rem,7vw,3.5rem)] leading-[1.08]`}>
          Conheça os profissionais <span className="text-[#ff6418]">do Método 90X</span>
        </h2>
        <div className="mt-9 grid items-center gap-8 md:mt-12 md:grid-cols-2 lg:gap-16">
          <Image
            src="/images/equipe-metodo-90x.jpeg"
            alt="Israel Correia e Batista em imagem de apresentação do Método 90X"
            width={1254}
            height={1254}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 45vw, 568px"
            className="mx-auto h-auto w-full max-w-xl"
          />
          <div className="min-w-0">
            <h3 className={`${displayTitle} text-3xl leading-[1.1] text-[#ff6418] md:text-4xl lg:text-5xl`}>Israel Correia<br />e Batista</h3>
            <div className="mt-6 space-y-4 text-base leading-[1.8] text-white/85">
              <p>Israel Correia e Batista são os profissionais do Método 90X, a proposta que reúne treino, direcionamento e apoio no Desafio Bumbum na Nuca.</p>
              <p>O convite é construir uma rotina possível de manter: entender cada etapa, colocar o treino em prática e contar com apoio ao longo dos {CHALLENGE_DAYS} dias. Um caminho para cuidar de você com mais organização e consistência.</p>
            </div>
            {instagram?.url && (
              <p className="mt-6 text-sm leading-relaxed text-white/70">Conheça o trabalho da equipe:<br />
                <TrackedLink href={instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border-b border-[#ff6418] py-2 text-base font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418]" eventName="content_navigation_clicked" eventProperties={{ placement: "professionals", destination: "instagram", intent: "learn_more" }}>@metodo_90x</TrackedLink>
              </p>
            )}
            <TrackedLink href={CHECKOUT_URL} className={`${primaryButton} mt-8`} eventName="checkout_started" eventProperties={{ placement: "professionals", cta_id: "professionals_primary", destination: "checkout", intent: "purchase", offer_price: 97, currency: "BRL" }}>QUERO COMEÇAR MEU DESAFIO</TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
