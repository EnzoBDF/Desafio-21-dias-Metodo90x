import type { Metadata } from "next";
import { SummerBrand } from "../../components/SummerBrand";
import { SummerIcon } from "../../components/SummerIcon";
import { SummerQuizAnalysis } from "../../components/SummerQuizAnalysis";
import "./analysis.css";

export const metadata: Metadata = {
  title: "Sua análise | Projeto Verão",
  description: "Um resumo das suas escolhas, antes de conhecer o Projeto Verão: Magra e Definida.",
  robots: { index: false, follow: true },
};

export default function AnalysisPage() {
  return (
    <div className="quiz-shell analysis-shell">
      <a className="skip-link" href="#conteudo">Pular para sua análise</a>
      <header className="quiz-header container">
        <SummerBrand />
        <span className="quiz-header-note"><SummerIcon name="check" /> Um passo de cada vez.</span>
      </header>
      <main id="conteudo" className="analysis-main container">
        <SummerQuizAnalysis />
      </main>
      <noscript><p className="quiz-noscript">Ative o JavaScript para ver suas respostas ou <a href="/oferta">conheça o projeto diretamente</a>.</p></noscript>
    </div>
  );
}
