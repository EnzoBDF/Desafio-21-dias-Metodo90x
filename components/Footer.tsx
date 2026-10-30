import Image from "next/image";
import { METODO_90X_URL, SOCIAL_LINKS } from "@/lib/links";
import { CHALLENGE_ASSETS } from "@/lib/challengeOffer";
import { Icon } from "./Icon";
import { displayTitle, sectionContainer } from "./styles";
import { TrackedLink } from "./TrackedActions";

const currentYear = new Date().getFullYear();

export function Footer() {
  const socials = SOCIAL_LINKS.filter((social) => social.url);

  return (
    <footer className="bg-page-texture relative z-20 border-t border-white/10 py-11 text-white md:py-14">
      <div
        className={`${sectionContainer} flex flex-col items-center gap-7 text-center`}
      >
        <div className="flex flex-col items-center gap-3">
          <Image
            className="size-[4.5rem] object-contain md:size-[5.5rem]"
            src={CHALLENGE_ASSETS.logo}
            alt="Desafio 30 Dias · Método 90X"
            width={1254}
            height={1254}
          />
          <p
            className={`${displayTitle} text-[clamp(1.25rem,5.5vw,1.6rem)] leading-none`}
          >
            BUMBUM <span className="text-[#ff6418]">NA NUCA</span>
          </p>
        </div>

        {socials.length > 0 && (
          <nav aria-label="Redes sociais">
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {socials.map((social) => (
                <li key={social.id}>
                  <TrackedLink
                    className="grid size-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#ff6418] hover:text-[#ff6418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418]"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} do Método 90X`}
                    eventName="content_navigation_clicked"
                    eventProperties={{
                      placement: "footer",
                      channel: "social",
                      destination: social.id,
                    }}
                  >
                    <Icon name={social.id} className="size-5" />
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p className="max-w-[20rem] text-balance text-sm font-semibold leading-[1.6] text-white/70 md:max-w-[38rem] md:text-[0.95rem]">
          O <strong className="font-bold text-white/90">Desafio 30 Dias</strong>{" "}
          é um programa oficial do{" "}
          <strong className="font-bold text-[#ff6418]">Método 90X</strong>,
          desenvolvido e conduzido pela mesma equipe de treinamento.
        </p>

        {METODO_90X_URL && (
          <TrackedLink
            className={`${displayTitle} -mt-3 inline-flex items-center gap-1.5 border-b-2 border-[#ff6418]/60 pb-0.5 text-[0.95rem] tracking-wide text-[#ff6418] transition-colors hover:border-[#ff6418] hover:text-[#ff7a2c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418] md:text-base`}
            href={METODO_90X_URL}
            target="_blank"
            rel="noopener noreferrer"
            eventName="content_navigation_clicked"
            eventProperties={{
              placement: "footer",
              channel: "site",
              destination: "metodo_90x_site",
            }}
          >
            CONHEÇA O MÉTODO 90X
            <span aria-hidden="true">&rarr;</span>
          </TrackedLink>
        )}

        <p className="text-xs font-semibold leading-[1.6] text-white/45 md:text-sm">
          © {currentYear} Método 90X. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
