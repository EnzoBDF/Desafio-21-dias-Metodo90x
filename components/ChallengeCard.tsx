import Image from "next/image";
import { CHECKOUT_URL } from "@/lib/links";
import { displayTitle, glow, primaryButton } from "./styles";
import { TrackedLink } from "./TrackedActions";

type ChallengeCardProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDescription: string;
  imageSrc: string;
  imageAlt: string;
  detailHref: string;
  isActive: boolean;
};

export function ChallengeCard({
  id,
  title,
  cardTitle,
  cardSubtitle,
  cardDescription,
  imageSrc,
  imageAlt,
  isActive,
}: ChallengeCardProps) {
  return (
    <article
      className={`challenge-card-highlight w-full overflow-hidden rounded-xl border bg-black ${
        isActive
          ? `challenge-card-pulse relative z-10 scale-100 border-[#ff6418]/80 opacity-100 ${glow.orangeCard}`
          : `scale-[0.9] border-transparent opacity-80 ${glow.whiteCard}`
      }`}
    >
      <div className="relative aspect-[0.94] overflow-hidden bg-[#111] lg:aspect-[0.9]">
        <Image
          className="object-cover object-[50%_20%]"
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 48rem) calc(100vw - 2.5rem), 42rem"
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_48%,rgba(0,0,0,0.24)_70%,rgba(0,0,0,0.74)_100%)]" />
      </div>

      <div className="flex flex-col px-7 pb-7 pt-3 lg:px-8 lg:pb-8 lg:pt-4">
        <h3
          className={`${displayTitle} text-[clamp(1.9rem,8vw,2.2rem)] leading-none text-white lg:text-[2.45rem]`}
        >
          {cardTitle}
        </h3>
        <strong
          className={`${displayTitle} mt-1 block text-[clamp(1.05rem,4.7vw,1.18rem)] leading-none text-[#ff6418] lg:text-[1.32rem]`}
        >
          {cardSubtitle}
        </strong>
        <p className="mt-2.5 text-[clamp(0.88rem,3.7vw,0.95rem)] leading-[1.38] text-white/92 lg:text-base">
          {cardDescription}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] font-semibold uppercase leading-[1.35] text-white/75 lg:text-sm">
          <span>Treinos adaptados</span>
          <span className="text-[#ff6418]" aria-hidden="true">•</span>
          <span>Casa ou academia</span>
          <span className="text-[#ff6418]" aria-hidden="true">•</span>
          <span>Suporte diário</span>
          <span className="text-[#ff6418]" aria-hidden="true">•</span>
          <span>Resultados visíveis</span>
        </p>
        <TrackedLink
          className={`${primaryButton} mt-4 min-h-[3.25rem] min-w-0 text-[clamp(0.92rem,3.9vw,1rem)]`}
          href={CHECKOUT_URL}
          eventName="checkout_started"
          eventProperties={{
            challenge_id: id,
            challenge_title: title,
            placement: "challenge_card",
            cta_id: "challenge_card_primary",
            intent: "purchase",
            destination: "checkout",
            offer_price: 97,
            currency: "BRL",
          }}
        >
          QUERO MEU BUMBUM NA NUCA
        </TrackedLink>
      </div>
    </article>
  );
}
