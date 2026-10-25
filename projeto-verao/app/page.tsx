import Image from "next/image";
import Link from "next/link";
import { SummerBrand } from "../components/SummerBrand";
import { SummerIcon } from "../components/SummerIcon";
import { SummerQuiz } from "../components/SummerQuiz";

export default function Home() {
  return (
    <div className="quiz-shell">
      <a className="skip-link" href="#conteudo">Pular para o quiz</a>
      <header className="quiz-header container">
        <SummerBrand />
        <span className="quiz-header-note"><SummerIcon name="sun" /> 6 perguntas. Sem cadastro.</span>
      </header>
      <main id="conteudo" className="quiz-layout container">
        <aside className="quiz-editorial" aria-label="Sobre o quiz">
          <p className="eyebrow"><span /> UM NOVO COMEÇO, DO SEU JEITO</p>
          <h2>O seu verão<br />{" "}começa com <em>você.</em></h2>
          <p>Um momento para olhar para os seus objetivos e encontrar espaço para cuidar de você. Sem pressa. Sem precisar ter tudo resolvido.</p>
          <div className="quiz-photo">
            <Image src="/images/verao-praia.webp" alt="Imagem ilustrativa de uma mulher se movimentando à beira-mar" fill sizes="(max-width: 900px) 1px, 460px" preload />
            <span className="quiz-photo-badge"><SummerIcon name="sun" /> Mais leveza.<br /><em>Mais você.</em></span>
          </div>
          <p className="quiz-photo-caption"><span>SEU CORPO. SEU RITMO.</span><span>Imagem ilustrativa</span></p>
        </aside>
        <SummerQuiz />
      </main>
      <footer className="quiz-footer container"><span>6 perguntas para começar pelo que importa: você.</span><Link href="/oferta">Já conhece o projeto? Ver oferta <SummerIcon name="arrow" /></Link></footer>
      <noscript><p className="quiz-noscript">Ative o JavaScript para responder ao quiz ou <a href="/oferta">acesse a oferta diretamente</a>.</p></noscript>
    </div>
  );
}
