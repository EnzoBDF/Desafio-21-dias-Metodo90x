import Image from "next/image";
import { displayTitle, glow, primaryButton } from "./styles";

type ChallengeCardProps = {
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
};

export function ChallengeCard({
  title,
  subtitle,
  description,
  isActive,
}: ChallengeCardProps) {
  return (
    <article
      className={`w-[76vw] min-w-[17rem] max-w-[18.5rem] flex-[0_0_76vw] overflow-hidden rounded-xl border bg-black transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out md:flex-[0_0_18.5rem] ${
        isActive
          ? `relative z-10 scale-100 border-[#ff6418]/80 opacity-100 ${glow.orangeCard}`
          : `scale-[0.9] border-transparent opacity-80 ${glow.whiteCard}`
      }`}
    >
      <div className="relative aspect-[0.94] overflow-hidden bg-[#111]">
        <Image
          className="object-cover object-[50%_0]"
          src="/images/ela-voltou.webp"
          alt=""
          fill
          sizes="(max-width: 48rem) 76vw, 18.5rem"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.72)_82%,#000_100%)]" />
      </div>

      <div className="flex min-h-[13.75rem] flex-col px-7 pb-7 pt-1">
        <h3
          className={`${displayTitle} text-[clamp(1.9rem,8vw,2.2rem)] leading-none text-white`}
        >
          {title}
        </h3>
        <strong
          className={`${displayTitle} mt-1 block text-[clamp(1.05rem,4.7vw,1.18rem)] leading-none text-[#ff6418]`}
        >
          {subtitle}
        </strong>
        <p className="mt-2.5 text-[clamp(0.88rem,3.7vw,0.95rem)] leading-[1.38] text-white/92">
          {description}
        </p>
        <a
          className={`${primaryButton} mt-auto min-h-[3.25rem] min-w-0 text-[clamp(0.92rem,3.9vw,1rem)]`}
          href="#pricing"
        >
          EU ESCOLHO ESTE DESAFIO!
        </a>
      </div>
    </article>
  );
}
