"use client";

import Link from "next/link";
import { QUIZ_STORAGE_KEY, getAnswerLabel, getOfferHeadline } from "../lib/quiz";
import { useQuizAnswers } from "../lib/useQuizAnswers";

export function SummerRestartQuiz() {
  return (
    <Link href="/" className="offer-restart" onClick={() => {
      try {
        window.sessionStorage.removeItem(QUIZ_STORAGE_KEY);
        window.dispatchEvent(new Event("summer-quiz-updated"));
      } catch {
        // A new quiz must remain accessible when storage is unavailable.
      }
    }}>Refazer o quiz</Link>
  );
}

export function SummerOfferIntro() {
  const { answers } = useQuizAnswers();
  const headline = getOfferHeadline(answers);
  return (
    <>
      <p className="eyebrow"><span className="tiny-sun" />{answers ? "QUIZ CONCLUÍDO · SEU PRÓXIMO PASSO" : "PROJETO VERÃO · MAGRA E DEFINIDA"}</p>
      <h1>{headline.title}<br /><em>{headline.accent}</em></h1>
      <p className="hero-description">Conheça o Projeto Verão: Magra e Definida. São 30 dias com treino especializado, dieta especializada e apoio para colocar o cuidado com você na rotina.</p>
      {answers && (
        <div className="offer-quiz-summary ph-no-capture" aria-label="Resumo das suas preferências">
          <p>O que você quer priorizar</p>
          <ul><li>{getAnswerLabel(answers, "objetivo")}</li><li>{getAnswerLabel(answers, "frequencia")}</li><li>{getAnswerLabel(answers, "prioridade")}</li></ul>
          <small>As respostas contextualizam esta apresentação. O programa e a oferta são os mesmos para todas as participantes.</small>
        </div>
      )}
    </>
  );
}
