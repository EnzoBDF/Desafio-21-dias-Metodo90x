type IconName =
  | "calendar"
  | "target"
  | "method"
  | "user"
  | "shield"
  | "heart"
  | "app"
  | "analysis"
  | "training"
  | "check"
  | "play"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "facebook"
  | "whatsapp";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = "" }: IconProps) {
  // O tamanho padrao so entra quando quem chama nao define um. Com `h-7 w-7`
  // fixo na base, um `size-4` vindo por className perdia para ele na ordem do
  // CSS e todos os icones acabavam renderizando a 28px.
  const hasCustomSize = /(?:^|\s)(?:size|w|h)-/.test(className);

  const common = {
    className: `${hasCustomSize ? "" : "size-7"} shrink-0 stroke-current stroke-[2.2] ${className}`,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <path d="M7 3v4M17 3v4M4.5 9.5h15" />
          <rect x="4" y="5.5" width="16" height="15" rx="3" />
          <path d="M8 13h2M12 13h2M16 13h1M8 17h2M12 17h2" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12 19 5M17 5h2v2" />
        </svg>
      );
    case "method":
      return (
        <svg {...common}>
          <path d="M6 5h12M6 12h12M6 19h12" />
          <path d="m8.5 9.5 2.5 2.5-2.5 2.5M15.5 9.5 13 12l2.5 2.5" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 19 6v5.5c0 4.3-2.8 7.5-7 9.5-4.2-2-7-5.2-7-9.5V6l7-3Z" fill="currentColor" stroke="none" />
          <path d="m12 7.6 1.2 2.4 2.7.4-1.9 1.9.4 2.7-2.4-1.3L9.6 15l.4-2.7-1.9-1.9 2.7-.4L12 7.6Z" fill="#1f1f1f" stroke="none" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.5S4.5 16.4 4.5 9.8A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4c0 6.6-7.5 10.7-7.5 10.7Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "app":
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "analysis":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
          <path d="M15 9h4v4" />
        </svg>
      );
    case "training":
      return (
        <svg {...common}>
          <path d="M6.5 6.5v11" />
          <path d="M17.5 6.5v11" />
          <path d="M3.5 9.5v5" />
          <path d="M20.5 9.5v5" />
          <path d="M6.5 12h11" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12.5 4.2 4L19 7" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} viewBox="0 0 18 18">
          <path d="M6.5 4.5 13 9l-6.5 4.5v-9Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5.2" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.8" width="19" height="12.4" rx="4" />
          <path d="m10.4 9.4 5.1 2.6-5.1 2.6V9.4Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path
            d="M14.2 2.8h2.6c.25 1.85 1.5 3.25 3.4 3.5v2.75a6.6 6.6 0 0 1-3.4-1.05v5.85a5.45 5.45 0 1 1-5.45-5.45c.3 0 .6.03.9.08v2.85a2.6 2.6 0 1 0 1.95 2.52V2.8Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path
            d="M13.4 21.2v-7.7h2.6l.4-3.02h-3V8.55c0-.87.24-1.47 1.5-1.47h1.6V4.38c-.28-.04-1.23-.12-2.34-.12-2.31 0-3.9 1.41-3.9 4.01v2.21H7.65v3.02h2.61v7.7h3.14Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path
            d="M12 2.9a9.03 9.03 0 0 0-7.73 13.7L3 21.1l4.66-1.22A9.03 9.03 0 1 0 12 2.9Zm5.06 12.63c-.21.6-1.05 1.1-1.5 1.17-.4.06-.9.09-1.46-.1-.34-.11-.77-.25-1.33-.49-2.33-1-3.85-3.31-3.97-3.46-.11-.15-.95-1.26-.95-2.41 0-1.15.6-1.71.82-1.95.21-.23.46-.29.61-.29h.45c.14 0 .33-.05.52.4.2.49.68 1.69.74 1.81.06.12.1.27.02.43-.08.15-.12.24-.24.38-.11.13-.24.29-.35.39-.11.12-.23.24-.1.48.14.23.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.23.32-.19.54-.11.22.08 1.42.67 1.67.79.24.12.4.18.46.28.06.1.06.61-.15 1.21Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
  }
}
