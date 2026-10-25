import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "./quiz.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seu próximo passo | Quiz Projeto Verão",
  description:
    "Responda a seis perguntas sobre seu objetivo e sua rotina e conheça o Projeto Verão: Magra e Definida. Seu verão, seu ritmo.",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "Projeto Verão: Magra e Definida",
    description: "Mais movimento. Mais confiança. Mais você.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${editorial.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
