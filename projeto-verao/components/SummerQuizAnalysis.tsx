"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ANALYSIS_PRESENTATION_DURATION, ANALYSIS_PRESENTATION_STEPS } from "../lib/analysisPresentation";
import { getQuizAnalysis } from "../lib/quiz";
import { useQuizAnswers } from "../lib/useQuizAnswers";
import { SummerIcon } from "./SummerIcon";
import { SummerRestartQuiz } from "./SummerOfferIntro";
import { SummerAnalysisLoading } from "./SummerAnalysisLoading";

export function SummerQuizAnalysis() {
  const { answers, ready } = useQuizAnswers();
  const [presentation, setPresentation] = useState({ step: 0, complete: false });
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const resultPanel = useRef<HTMLDivElement>(null);
  const canPresent = ready && answers !== null;

  useEffect(() => {
    if (!canPresent || presentation.complete) return;
    const timers = ANALYSIS_PRESENTATION_STEPS.slice(1).map((item, index) =>
      window.setTimeout(() => setPresentation({ step: index + 1, complete: false }), item.at),
    );
    timers.push(window.setTimeout(() => setPresentation({ step: 2, complete: true }), ANALYSIS_PRESENTATION_DURATION));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [canPresent, presentation.complete]);

  useEffect(() => {
    if (!canPresent || !presentation.complete) return;
    resultHeading.current?.focus({ preventScroll: true });
    resultPanel.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [canPresent, presentation.complete]);
  if (!ready) {
    return <section className="analysis-empty" aria-label="Sua análise"><p role="status">Abrindo o resumo das suas respostas…</p><Link className="offer-inclusions-link" href="/oferta">Conhecer o projeto <SummerIcon name="arrow" /></Link></section>;
  }
  if (!answers) {
    return (
      <section className="analysis-empty">
        <span className="analysis-seal"><SummerIcon name="sun" /></span>
        <p className="eyebrow">SEU PRÓXIMO PASSO</p>
        <h1>Vamos começar<br /><em>pelo seu momento?</em></h1>
        <p>Suas respostas não estão disponíveis nesta aba. Você pode responder ao quiz ou conhecer o projeto diretamente.</p>
        <Link className="cta cta--dark" href="/">Responder ao quiz <SummerIcon name="arrow" /></Link>
        <Link className="offer-inclusions-link" href="/oferta">Prefiro conhecer o projeto <SummerIcon name="arrow" /></Link>
      </section>
    );
  }

  if (!presentation.complete) {
    return <SummerAnalysisLoading step={presentation.step} onSkip={() => setPresentation({ step: 2, complete: true })} />;
  }

  const summary = getQuizAnalysis(answers);
  return (
    <div ref={resultPanel} className="analysis-content analysis-content--revealed ph-no-capture">
      <nav className="analysis-steps" aria-label="Etapas da sua jornada"><span><SummerIcon name="check" /> Quiz</span><span aria-current="step">02 · Sua análise</span><span>03 · O projeto</span></nav>
      <section className="analysis-intro" aria-labelledby="analysis-title">
        <span className="analysis-seal"><SummerIcon name="sun" /></span>
        <p className="eyebrow">SUAS ESCOLHAS, COM MAIS CLAREZA</p>
        <h1 ref={resultHeading} tabIndex={-1} id="analysis-title">O seu ponto de partida.<br /><em>Um caminho do seu jeito.</em></h1>
        <p>Você já deu o primeiro passo: olhar para o que quer e para o que cabe na sua rotina. Veja o que destacou nas respostas.</p>
      </section>
      <section className="analysis-cards" aria-label="Análise das suas respostas">
        <article className="analysis-card">
          <span className="analysis-card-icon"><SummerIcon name="heart" /></span>
          <div><p className="analysis-label">01 · SEU FOCO</p><h2>{summary.objective}</h2><p>Seu momento: <strong>{summary.moment}</strong>.</p><p>{summary.routineNote}</p></div>
        </article>
        <article className="analysis-card">
          <span className="analysis-card-icon"><SummerIcon name="wave" /></span>
          <div><p className="analysis-label">02 · SEU RITMO</p><h2>{summary.frequency}</h2><p>Onde você prefere treinar: <strong>{summary.location}</strong>.</p><p>Essa é a disponibilidade que você indicou, não uma prescrição de treino. A rotina adequada deve ser orientada pela equipe.</p></div>
        </article>
        <article className="analysis-card">
          <span className="analysis-card-icon"><SummerIcon name="chat" /></span>
          <div><p className="analysis-label">03 · O APOIO QUE VOCÊ PROCURA</p><h2>{summary.priority}</h2><p>Seu principal desafio: <strong>{summary.challenge}</strong>.</p><p>{summary.challengeNote}</p></div>
        </article>
      </section>
      <div className="analysis-next">
        <div><p className="analysis-label">AGORA, CONHEÇA A PROPOSTA</p><h2>Mais clareza para<br /><em>dar o próximo passo.</em></h2><p>Veja como funcionam os 30 dias do Projeto Verão, os registros reais e tudo o que está incluído.</p></div>
        <div className="analysis-next-actions"><Link href="/oferta" className="cta cta--dark">Ver o projeto e o valor <SummerIcon name="arrow" /></Link><span>Sem cadastro. Você decide se quer participar.</span><SummerRestartQuiz /></div>
      </div>
      <p className="analysis-disclaimer"><SummerIcon name="leaf" /> Este é um resumo das suas preferências, não uma avaliação de saúde ou um plano individual. O programa e a oferta são os mesmos para todas as participantes.</p>
    </div>
  );
}
