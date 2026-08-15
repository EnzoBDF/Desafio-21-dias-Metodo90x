import Image from "next/image";
import { CHECKOUT_URL } from "@/lib/links";
import { displayTitle, glow, primaryButton } from "./styles";
import { TrackedLink } from "./TrackedActions";

type ChallengeCardProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
};

export function ChallengeCard({
  id,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  isActive,
}: ChallengeCardProps) {
  return (
    <article
      className={`w-[76vw] min-w-[17rem] max-w-[18.5rem] flex-[0_0_76vw] overflow-hidden rounded-xl border bg-black transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out md:flex-[0_0_18.5rem] lg:max-w-[21rem] lg:flex-[0_0_21rem] xl:max-w-[22rem] xl:flex-[0_0_22rem] ${
        isActive
          ? `relative z-10 scale-100 border-[#ff6418]/80 opacity-100 ${glow.orangeCard}`
          : `scale-[0.9] border-transparent opacity-80 ${glow.whiteCard}`
      }`}
    >
      <div className="relative aspect-[0.94] overflow-hidden bg-[#111] lg:aspect-[0.9]">
        <Image
          className="object-cover object-[50%_0]"
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 48rem) 76vw, 18.5rem"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.72)_82%,#000_100%)]" />
      </div>

      <div className="flex min-h-[13.75rem] flex-col px-7 pb-7 pt-1 lg:min-h-[14.75rem] lg:px-8 lg:pb-8">
        <h3
          className={`${displayTitle} text-[clamp(1.9rem,8vw,2.2rem)] leading-none text-white lg:text-[2.45rem]`}
        >
          {title}
        </h3>
        <strong
          className={`${displayTitle} mt-1 block text-[clamp(1.05rem,4.7vw,1.18rem)] leading-none text-[#ff6418] lg:text-[1.32rem]`}
        >
          {subtitle}
        </strong>
        <p className="mt-2.5 text-[clamp(0.88rem,3.7vw,0.95rem)] leading-[1.38] text-white/92 lg:text-base">
          {description}
        </p>
        <TrackedLink
          className={`${primaryButton} mt-4 min-h-[3.25rem] min-w-0 text-[clamp(0.92rem,3.9vw,1rem)]`}
          href={CHECKOUT_URL}
          eventName="challenge_cta_clicked"
          eventProperties={{
            challenge_id: id,
            challenge_title: title,
            destination: "checkout",
          }}
        >
          EU ESCOLHO ESTE DESAFIO!
        </TrackedLink>
      </div>
    </article>
  );
}
