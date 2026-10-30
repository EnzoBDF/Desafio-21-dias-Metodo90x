import Image from "next/image";
import { CHECKOUT_URL } from "@/lib/links";
import { challengeInclusions, CHALLENGE_ASSETS } from "@/lib/challengeOffer";
import {
  displayTitle,
  glow,
  primaryButton,
  sectionContainer,
  sectionTitle,
} from "./styles";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedActions";

const items = challengeInclusions.map(item => item.title);

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-page-texture relative z-20 overflow-hidden py-12 text-white md:py-20 lg:py-24"
      aria-labelledby="pricing-title"
    >
      <div
        className={`${sectionContainer} relative flex flex-col items-center text-center lg:max-w-5xl`}
      >
        <div className="relative flex w-full flex-col items-center">
          <div
            className="absolute bottom-[4.125rem] left-1/2 top-[7.5rem] z-0 w-0.5 -translate-x-1/2 overflow-hidden md:top-[9rem] lg:bottom-[4.75rem]"
            aria-hidden="true"
          >
            <span
              className={`block h-full bg-[#ff6418] ${glow.orangeLine}`}
            />
          </div>

          <h2
            id="pricing-title"
            className={`${sectionTitle} relative z-10 items-center text-center text-[clamp(2.24rem,9vw,4rem)] lg:text-[4.5rem]`}
          >
            <span className="text-white">SEU PRÓXIMO TREINO</span>
            <span className="text-white">
              PODE TER <b className="text-[#ff6418]">UMA DIREÇÃO CLARA</b>
            </span>
          </h2>

          <div
            className={`relative z-10 mt-8 grid size-[8.25rem] place-items-center overflow-hidden rounded-full border-[0.1875rem] border-[#ff6418] bg-[#1f1f1f] text-white lg:mt-10 lg:size-[9.5rem] ${glow.orangeRing}`}
            aria-hidden="true"
          >
            <Image
              className="object-contain p-3"
              src={CHALLENGE_ASSETS.logo}
              alt=""
              fill
              sizes="(min-width: 64rem) 9.5rem, 8.25rem"
            />
          </div>
        </div>

        <p
          className={`${displayTitle} mt-10 text-[clamp(1.8rem,8vw,2.2rem)] leading-none lg:text-[2.8rem]`}
        >
          BUMBUM <span className="text-[#ff6418]">NA NUCA</span>
        </p>

        <p
          className={`${displayTitle} mt-6 text-[clamp(1.35rem,5.4vw,1.85rem)] leading-none text-white/85 lg:text-[2.15rem]`}
        >
          De{" "}
          <span className="text-[1.12em] text-white/65 line-through decoration-[#ff6418] decoration-2">
            R$ 397
          </span>{" "}
          por apenas
        </p>

        <p
          className={`${displayTitle} mt-2 flex items-baseline justify-center text-white`}
          aria-label="De 397 reais por 97 reais"
        >
          <span className="mr-2 text-[clamp(1.4rem,6vw,2rem)] leading-none text-white/80">
            R$
          </span>
          <span className="text-[clamp(4.4rem,20vw,5.25rem)] leading-none">
            97
          </span>
        </p>

        <ul
          className="mx-auto mt-8 grid w-fit max-w-[22rem] gap-4 text-left text-[clamp(0.95rem,3.8vw,1rem)] leading-[1.15] text-white/95 lg:max-w-[28rem] lg:gap-5 lg:text-lg"
          aria-label="Benefícios inclusos"
        >
          {items.map((item) => (
            <li
              className="grid w-full grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-3"
              key={item}
            >
              <span
                className={`${displayTitle} text-center text-2xl leading-none text-[#ff6418]`}
                aria-hidden="true"
              >
                +
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <TrackedLink
          className={`${primaryButton} mt-8 max-w-[18rem]`}
          href={CHECKOUT_URL}
          eventName="checkout_started"
          eventProperties={{
            placement: "pricing",
            cta_id: "pricing_primary",
            intent: "purchase",
            destination: "checkout",
            offer_price: 97,
            original_price: 397,
            currency: "BRL",
          }}
        >
          QUERO COMEÇAR MEU DESAFIO
        </TrackedLink>

        <p className="mx-auto mt-4 flex w-full max-w-[18rem] items-center justify-center gap-1.5 text-center text-sm font-semibold leading-snug text-white/70">
          <Icon name="shield" className="size-4 shrink-0 text-[#ff6418]" />
          <span>Checkout seguro pela Hotmart</span>
        </p>

        <p className="mx-auto mt-1.5 w-full max-w-[18rem] text-center text-sm font-semibold leading-snug text-white/70">
          Pagamento único pelo desafio de 30 dias. Garantia de 7 dias.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-[1.8] text-white/70">Liberação imediata após a confirmação do pagamento. Você recebe as instruções para responder à avaliação inicial e acessar o aplicativo.</p>
      </div>
    </section>
  );
}
