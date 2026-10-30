import type { Metadata } from "next";
import { Geist_Mono, Oswald, Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { CHALLENGE_ASSETS } from "@/lib/challengeOffer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bumbum na Nuca | Desafio 30 Dias · Exclusivo para academia",
  description:
    "30 dias de treino de academia com foco em glúteos, avaliação inicial, progressão, aplicativo e suporte pelo WhatsApp. Comece com direção por R$ 97.",
  icons: {
    icon: [{ url: CHALLENGE_ASSETS.logo, type: "image/jpeg" }],
    shortcut: CHALLENGE_ASSETS.logo,
    apple: CHALLENGE_ASSETS.logo,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${oswald.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
