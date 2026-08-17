export const font = {
  oswald: "[font-family:var(--font-oswald),Impact,sans-serif]",
  poppins: "[font-family:var(--font-poppins),system-ui,sans-serif]",
};

export const color = {
  orange: "#ff6418",
  dark: "#1f1f1f",
};

export const displayTitle = `${font.oswald} font-black uppercase leading-[0.96] tracking-normal`;

export const glow = {
  cta: "shadow-[0_0_1rem_rgba(255,100,24,0.62)]",
  orangeCard:
    "shadow-[0_0_1.05rem_rgba(255,100,24,0.72),0_1rem_1.7rem_rgba(0,0,0,0.58)]",
  whiteCard:
    "shadow-[0_0_0.8rem_rgba(255,255,255,0.28),0_0.9rem_1.5rem_rgba(0,0,0,0.5)]",
  darkCard: "shadow-[0_0.55rem_1rem_rgba(0,0,0,0.28)]",
  orangeLine: "shadow-[0_0_0.75rem_rgba(255,100,24,0.78)]",
  orangeRing:
    "shadow-[0_0_0.8rem_rgba(255,100,24,0.58),0_0.45rem_0.95rem_rgba(0,0,0,0.36)]",
  orangeHalo: "shadow-[0_0_1.05rem_rgba(255,100,24,0.5)]",
  panel: "shadow-[0_0.9rem_1.6rem_rgba(0,0,0,0.42)]",
};

export const sectionContainer = "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10";

export const sectionTitle = `${displayTitle} mx-auto flex max-w-[22rem] flex-col items-center text-center text-[clamp(2rem,8vw,3.65rem)] text-[#ff6418] md:max-w-[36rem]`;

export const primaryButton = `${font.oswald} ${glow.cta} inline-flex min-h-14 w-full items-center justify-center bg-[#ff6418] px-5 text-center text-[clamp(1rem,3.2vw,1.15rem)] font-black uppercase tracking-normal text-white hover:bg-[#ff7a2c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418] md:w-auto md:min-w-72`;

export const secondaryButton = `${font.oswald} inline-flex min-h-14 w-full items-center justify-center border-2 border-white/90 px-5 text-center text-[clamp(1rem,3.2vw,1.15rem)] font-black uppercase tracking-normal text-white hover:border-[#ff6418] hover:text-[#ff6418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6418] md:w-auto md:min-w-72`;
