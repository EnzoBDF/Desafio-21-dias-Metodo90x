import { TrackedLink } from "./TrackedActions";

const WHATSAPP_URL =
  "https://wa.me/5548992112149?text=Ol%C3%A1%21%20Conheci%20o%20Desafio%2021%20Dias%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

export function FloatingWhatsAppButton() {
  return (
    <TrackedLink
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_0_1rem_rgba(37,211,102,0.55),0_0.75rem_1.5rem_rgba(0,0,0,0.42)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2be371] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] md:bottom-7 md:right-7 md:size-16"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Entrar em contato pelo WhatsApp"
      eventName="whatsapp_floating_clicked"
      eventProperties={{
        location: "floating_button",
      }}
    >
      <svg
        className="size-8 md:size-9"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M16.04 4.5c-6.27 0-11.38 5.02-11.38 11.2 0 1.98.54 3.9 1.55 5.58L4.5 27.5l6.45-1.63a11.6 11.6 0 0 0 5.09 1.18c6.28 0 11.39-5.02 11.39-11.2S22.32 4.5 16.04 4.5Z"
          fill="currentColor"
        />
        <path
          d="M22.57 19.25c-.27.75-1.35 1.39-1.92 1.48-.51.08-1.16.12-1.88-.12-.43-.14-.99-.32-1.7-.62-2.99-1.27-4.94-4.19-5.09-4.38-.15-.19-1.22-1.6-1.22-3.05 0-1.45.78-2.16 1.05-2.46.27-.29.59-.37.79-.37h.57c.18.01.43-.07.67.51.26.62.88 2.13.96 2.29.08.15.13.34.03.54-.1.19-.15.31-.3.48-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.29.79 1.29 1.7 2.09 1.17 1.03 2.16 1.35 2.47 1.5.31.15.49.13.67-.08.18-.2.77-.89.98-1.19.2-.29.41-.25.69-.15.29.1 1.83.85 2.14 1 .31.15.52.23.59.36.08.13.08.78-.19 1.53Z"
          fill="#25d366"
        />
      </svg>
    </TrackedLink>
  );
}
