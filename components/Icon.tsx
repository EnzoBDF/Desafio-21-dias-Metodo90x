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
  | "play";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = "" }: IconProps) {
  const common = {
    className: `h-7 w-7 shrink-0 stroke-current stroke-[2.2] ${className}`,
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
  }
}
