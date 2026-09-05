import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedActions";
import {
  displayTitle,
  glow,
  primaryButton,
  secondaryButton,
  sectionContainer,
} from "@/components/styles";
import { challenges, getChallengeBySlug } from "@/lib/challenges";
import { CHECKOUT_URL } from "@/lib/links";

type ChallengePageProps = {
  params: Promise<{ slug: string }>;
};

const quickProof = [
  {
    icon: "calendar" as const,
    title: "21 dias",
    description: "Uma missão inteira dedicada aos seus glúteos.",
  },
  {
    icon: "target" as const,
    title: "Foco total",
    description: "Treinos pensados para ativar e desenvolver os glúteos.",
  },
  {
    icon: "heart" as const,
    title: "Suporte",
    description: "Acompanhamento para fazer cada treino contar.",
  },
];

const includedItems = [
  {
    icon: "analysis" as const,
    title: "Avaliação dos glúteos",
    description: "Você começa entendendo seu ponto de partida e seu objetivo.",
  },
  {
    icon: "training" as const,
    title: "Treinos para glúteos",
    description: "Rotina com ativação, força e progressão para casa ou academia.",
  },
  {
    icon: "app" as const,
    title: "Aplicativo de treinos",
    description: "Toda a sua sequência de glúteos organizada e fácil de acessar.",
  },
  {
    icon: "shield" as const,
    title: "Grupo exclusivo",
    description: "Mulheres com o mesmo objetivo compartilhando foco e evolução.",
  },
];

const offerItems = [
  "Acesso ao Bumbum na Nuca por 21 dias",
  "Treinos de glúteos no aplicativo",
  "Avaliação dos glúteos",
  "Suporte pelo Whatsapp",
  "Grupo exclusivo Bumbum na Nuca",
];

export function generateStaticParams() {
  return challenges.map((challenge) => ({
    slug: challenge.slug,
  }));
}

export async function generateMetadata({
  params,
}: ChallengePageProps): Promise<Metadata> {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    return {
      title: "Desafio não encontrado",
    };
  }

  return {
    title: `${challenge.title} | 21 dias com foco em glúteos`,
    description: challenge.heroCopy,
  };
}

export default async function ChallengeDetailPage({
  params,
}: ChallengePageProps) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  return (
    <main className="bg-page-texture min-h-svh overflow-hidden text-white">
      <section
        className="bg-page-texture relative isolate min-h-[44rem] overflow-hidden pb-14 pt-8 md:min-h-[50rem] lg:min-h-svh"
        aria-labelledby="challenge-title"
      >
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(31,31,31,0.04)_20%,rgba(31,31,31,0.7)_62%,#1f1f1f_94%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0.1rem 0.1rem, rgba(255,255,255,0.12) 0 0.0525rem, transparent 0.0575rem), linear-gradient(45deg, rgba(0,0,0,0.28) 0 0.075rem, transparent 0.075rem)",
            backgroundSize: "1rem 1rem, 2.25rem 2.25rem",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 -z-20 mx-auto h-[33rem] w-full max-w-[60rem] overflow-hidden bg-[#111] md:h-[40rem] lg:h-full lg:max-w-none"
          aria-hidden="true"
        >
          <Image
            className="object-cover object-[50%_0]"
            src={challenge.imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/42" />
        </div>

        <div
          className={`${sectionContainer} flex min-h-[41rem] flex-col justify-end pt-[18rem] md:min-h-[46rem] md:pt-[22rem] lg:min-h-svh lg:items-start lg:justify-center lg:pt-24`}
        >
          <p
            className={`${displayTitle} inline-flex w-fit items-center gap-2 rounded-full border border-[#ff6418]/55 bg-black/45 px-4 py-2 text-[clamp(0.95rem,3.6vw,1.15rem)] leading-none text-[#ff6418]`}
          >
            <Icon name="target" className="size-5" />
            PROJETO BUMBUM NA NUCA
          </p>
          <h1
            id="challenge-title"
            className={`${displayTitle} mt-4 flex max-w-[24rem] flex-col text-[clamp(2.75rem,12vw,4.6rem)] leading-[0.88] text-white md:max-w-[42rem] lg:text-[5.55rem]`}
          >
            {challenge.title}
          </h1>
          <p
            className={`${displayTitle} mt-3 max-w-[24rem] text-[clamp(1.18rem,5vw,1.75rem)] leading-none text-[#ff6418] md:max-w-[34rem] lg:text-[2.25rem]`}
          >
            {challenge.subtitle}
          </p>
          <p className="mt-5 max-w-[26rem] text-[clamp(0.95rem,3.7vw,1.08rem)] font-semibold leading-[1.75] text-white/95 md:max-w-[39rem] lg:text-lg">
            {challenge.heroCopy}
          </p>

          <div className="mt-6 grid w-full max-w-[39rem] grid-cols-3 gap-2.5 md:gap-4">
            {quickProof.map((item) => (
              <div
                className="bg-panel-texture grid min-h-28 place-items-center rounded-lg border border-white/10 px-2 py-4 text-center"
                key={item.title}
              >
                <Icon
                  name={item.icon}
                  className="mb-2 size-6 text-[#ff6418]"
                />
                <strong
                  className={`${displayTitle} block text-[clamp(1.05rem,4vw,1.35rem)] leading-none text-[#ff6418]`}
                >
                  {item.title}
                </strong>
                <span className="mt-1 text-[0.7rem] font-semibold leading-[1.18] text-white/82 md:text-xs">
                  {item.description}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex w-full max-w-[22.5rem] flex-col gap-3.5 md:max-w-none md:flex-row">
            <TrackedLink
              className={primaryButton}
              href={CHECKOUT_URL}
              eventName="challenge_detail_cta_clicked"
              eventProperties={{
                challenge_id: challenge.id,
                challenge_title: challenge.title,
                cta: "hero_buy",
                destination: "checkout",
              }}
            >
              EU QUERO COMEÇAR
            </TrackedLink>
            <TrackedLink
              className={`${secondaryButton} md:min-w-56`}
              href="/#challenges-title"
              eventName="challenge_detail_back_clicked"
              eventProperties={{
                challenge_id: challenge.id,
                challenge_title: challenge.title,
                destination: "home_challenges",
              }}
            >
              VER DESAFIOS
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="bg-warm-texture py-12 md:py-20 lg:py-24">
        <div
          className={`${sectionContainer} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16`}
        >
          <div>
            <p
              className={`${displayTitle} text-[clamp(1rem,4vw,1.25rem)] leading-none text-[#ff6418]`}
            >
              PARA O SEU MOMENTO
            </p>
            <h2
              className={`${displayTitle} mt-3 max-w-[21rem] text-[clamp(2.2rem,8.8vw,3.5rem)] leading-[0.95] text-[#ff6418] md:max-w-[35rem] lg:text-[4.35rem]`}
            >
              <span className="block text-white">POR QUE ESSE</span>
              <span className="block">DESAFIO?</span>
            </h2>
            <p className="mt-6 max-w-[36rem] text-[clamp(0.98rem,3.8vw,1.1rem)] font-semibold leading-[1.8] text-white/92 lg:text-lg">
              {challenge.promise}
            </p>
          </div>

          <div className="grid gap-4">
            {challenge.context.map((paragraph, index) => (
              <article
                className={`relative overflow-hidden rounded-lg border-b-2 border-[#ff6418] bg-white px-5 py-5 text-[#111] ${glow.darkCard}`}
                key={paragraph}
              >
                <span
                  className={`${displayTitle} absolute right-4 top-3 text-5xl leading-none text-[#ff6418]/10`}
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <Icon
                  name={index === 0 ? "analysis" : "method"}
                  className="mb-3 size-7 text-[#ff6418]"
                />
                <p className="relative text-[clamp(0.95rem,3.7vw,1.05rem)] font-semibold leading-[1.55]">
                  {paragraph}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-texture py-12 md:py-20 lg:py-24">
        <div className={sectionContainer}>
          <h2
            className={`${displayTitle} mx-auto flex max-w-[21rem] flex-col items-center text-center text-[clamp(2.1rem,8vw,3.2rem)] leading-[0.98] text-[#ff6418] md:max-w-[34rem] lg:text-[4.1rem]`}
          >
            <span className="text-white">O QUE VOCÊ</span>
            <span>RECEBE</span>
          </h2>

          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {includedItems.map((item) => (
              <article
                className={`relative grid min-h-36 place-items-center rounded-lg border-b-2 border-[#ff6418] bg-white px-5 pb-6 pt-9 text-center text-[#070707] ${glow.darkCard}`}
                key={item.title}
              >
                <span className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#ff6418]">
                  <Icon name={item.icon} className="size-7" />
                </span>
                <h3
                  className={`${displayTitle} text-[clamp(1.25rem,4.8vw,1.55rem)] leading-none text-[#ff6418]`}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-bold leading-[1.18]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-texture-reverse py-12 md:py-20 lg:py-24">
        <div className={sectionContainer}>
          <h2
            className={`${displayTitle} mx-auto flex max-w-[21rem] flex-col items-center text-center text-[clamp(2.1rem,8vw,3.2rem)] leading-[0.98] text-[#ff6418] md:max-w-[34rem] lg:text-[4.1rem]`}
          >
            <span className="text-white">O FOCO DA</span>
            <span>MISSÃO</span>
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-8">
            {challenge.focus.map((item) => (
              <article
                className={`grid min-h-36 place-items-center rounded-lg border-b-2 border-[#ff6418] bg-white px-5 py-7 text-center text-[#070707] ${glow.darkCard}`}
                key={item}
              >
                <Icon
                  name="check"
                  className="mb-4 size-7 stroke-[#ff6418] stroke-[2.5]"
                />
                <h3
                  className={`${displayTitle} text-[clamp(1.25rem,4.8vw,1.55rem)] leading-none text-[#ff6418]`}
                >
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-texture py-12 md:py-20 lg:py-24">
        <div
          className={`${sectionContainer} grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16`}
        >
          <div>
            <p
              className={`${displayTitle} text-[clamp(1rem,4vw,1.25rem)] leading-none text-[#ff6418]`}
            >
              OFERTA BUMBUM NA NUCA
            </p>
            <h2
              className={`${displayTitle} mt-3 max-w-[24rem] text-[clamp(2.25rem,8.8vw,3.6rem)] leading-[0.95] text-white md:max-w-[42rem] lg:text-[4.5rem]`}
            >
              SEU PROJETO COMEÇA{" "}
              <span className="text-[#ff6418]">AGORA</span>
            </h2>
            <p className="mt-5 max-w-[36rem] text-[clamp(0.98rem,3.8vw,1.1rem)] font-semibold leading-[1.75] text-white/92 lg:text-lg">
              Coloque seus glúteos como prioridade pelos próximos 21 dias com
              treino direcionado, estratégia alimentar e suporte.
            </p>
          </div>

          <div
            className={`bg-panel-texture rounded-xl border border-[#ff6418]/35 px-6 py-7 text-center ${glow.orangeCard}`}
          >
            <p
              className={`${displayTitle} text-[clamp(1.5rem,6vw,2rem)] leading-none text-white`}
            >
              BUMBUM <span className="text-[#ff6418]">NA NUCA</span>
            </p>
            <p
              className={`${displayTitle} mt-5 text-[clamp(1.25rem,5vw,1.7rem)] leading-none text-white/85`}
            >
              De{" "}
              <span className="text-white/60 line-through decoration-[#ff6418] decoration-2">
                R$ 199,90
              </span>{" "}
              por
            </p>
            <p
              className={`${displayTitle} mt-2 flex items-baseline justify-center text-white`}
              aria-label="Preço promocional 99 reais e 90 centavos"
            >
              <span className="sr-only">R$</span>
              <span className="text-[clamp(4.2rem,18vw,5.4rem)] leading-none">
                99
              </span>
              <span className="ml-2 text-[clamp(2rem,8vw,2.65rem)] leading-none">
                ,90
              </span>
            </p>

            <ul className="mx-auto mt-7 grid max-w-[20rem] gap-3 text-left text-sm font-semibold leading-none text-white/95">
              {offerItems.map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <Icon
                    name="check"
                    className="size-[1.1rem] stroke-[#ff6418] stroke-[2.5]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <TrackedLink
              className={`${primaryButton} mt-8 max-w-[20rem]`}
              href={CHECKOUT_URL}
              eventName="challenge_detail_cta_clicked"
              eventProperties={{
                challenge_id: challenge.id,
                challenge_title: challenge.title,
                cta: "offer_buy",
                destination: "checkout",
                price: "99,90",
                original_price: "199,90",
              }}
            >
              QUERO MEU BUMBUM NA NUCA
            </TrackedLink>
          </div>
        </div>
      </section>

      <FloatingWhatsAppButton />
    </main>
  );
}
