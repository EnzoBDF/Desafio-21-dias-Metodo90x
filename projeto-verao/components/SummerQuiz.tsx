"use client";

import { useEffect, useReducer, useRef, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { INITIAL_QUIZ_STATE, QUIZ_QUESTIONS, QUIZ_STORAGE_KEY, isCompleteQuiz, quizReducer, type QuestionId } from "../lib/quiz";
import { SummerIcon, type IconName } from "./SummerIcon";

const optionIcons: Record<QuestionId, readonly IconName[]> = {
  objetivo: ["leaf", "strength", "sun", "heart"],
  momento: ["spark", "wave", "sun", "strength"],
  local: ["heart", "strength", "wave", "chat"],
  frequencia: ["leaf", "sun", "spark", "wave"],
  desafio: ["wave", "strength", "leaf", "chat"],
  prioridade: ["strength", "leaf", "spark", "heart"],
};

const encouragement = [
  "Seu objetivo é o ponto de partida. Vamos seguir?",
  "Cada começo tem seu próprio ritmo. Vamos ao próximo passo?",
  "O seu espaço também faz parte da sua rotina.",
  "Um passo possível de cada vez. Vamos continuar?",
  "Falta só uma pergunta para ver o seu resumo.",
  "Tudo pronto. Vamos olhar para as suas escolhas?",
];

export function SummerQuiz() {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLElement>(null);
  const previousStep = useRef(state.step);
  const question = QUIZ_QUESTIONS[state.step];
  const answer = state.answers[question.id];
  const last = state.step === QUIZ_QUESTIONS.length - 1;
  const answeredCount = Object.keys(state.answers).length;

  useEffect(() => {
    if (previousStep.current !== state.step) {
      heading.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
    previousStep.current = state.step;
  }, [state.step]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answer || pending) return;
    if (!last) { dispatch({ type: "next" }); return; }
    if (!isCompleteQuiz(state.answers)) return;
    try {
      window.sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state.answers));
      window.dispatchEvent(new Event("summer-quiz-updated"));
    } catch {
      // Storage may be blocked. The public offer still works without personalization.
    }
    startTransition(() => router.push("/analise"));
  }

  return (
    <section ref={panel} className="quiz-panel" aria-label="Quiz do Projeto Verão">
      <div className="quiz-progress-label">
        <span className="quiz-progress-meta"><span>UM PASSO DE CADA VEZ</span><strong>{question.chapter}</strong></span>
        <span className="quiz-counter" aria-label={`Pergunta ${state.step + 1} de ${QUIZ_QUESTIONS.length}`}><strong>{String(state.step + 1).padStart(2, "0")}</strong><span> / {String(QUIZ_QUESTIONS.length).padStart(2, "0")}</span></span>
      </div>
      <div className="quiz-progress" role="progressbar" aria-label="Perguntas respondidas" aria-valuemin={0} aria-valuemax={QUIZ_QUESTIONS.length} aria-valuenow={answeredCount}>
        {QUIZ_QUESTIONS.map((item, index) => <span key={item.id} className={state.answers[item.id] ? "is-complete" : index === state.step ? "is-current" : ""} />)}
      </div>
      <form onSubmit={submit} className="ph-no-capture">
        <div className="quiz-question" key={question.id}>
          <h1 ref={heading} tabIndex={-1} id="quiz-title">{question.title}</h1>
          <p id="quiz-description" className="quiz-description">{question.description}</p>
          <fieldset className="quiz-options" disabled={pending} aria-labelledby="quiz-title" aria-describedby="quiz-description">
            <legend className="sr-only">Escolha uma opção</legend>
            {question.options.map((option, index) => (
              <label className={`quiz-option ${answer === option.id ? "quiz-option--selected" : ""}`} key={option.id}>
                <input type="radio" name={question.id} value={option.id} checked={answer === option.id} onChange={() => dispatch({ type: "select", option: option.id })} />
                <span className="quiz-option-icon" aria-hidden="true"><SummerIcon name={optionIcons[question.id][index]} /></span>
                <span className="quiz-option-copy"><strong>{option.label}</strong><span>{option.detail}</span></span>
                <span className="quiz-option-check" aria-hidden="true"><SummerIcon name="check" /></span>
              </label>
            ))}
          </fieldset>
        </div>
        <div className="quiz-actions" data-first-step={state.step === 0}>
          <button className="quiz-back" type="button" disabled={state.step === 0 || pending} onClick={() => dispatch({ type: "back" })}><SummerIcon name="arrow" /> Voltar</button>
          <button className="cta cta--dark quiz-next" type="submit" disabled={!answer || pending}>
            <span>{pending ? "Abrindo sua análise…" : last ? "Ver minha análise" : "Continuar"}</span><span className="quiz-next-arrow"><SummerIcon name="arrow" /></span>
          </button>
        </div>
        <p className={`quiz-hint ${answer ? "quiz-hint--ready" : ""}`} aria-live="polite"><SummerIcon name={answer ? "check" : "spark"} /><span>{pending ? "Levando você para o resumo das suas respostas." : !answer ? "Escolha o que mais combina com você." : encouragement[state.step]}</span></p>
      </form>
      <div className="quiz-reassurance"><SummerIcon name="leaf" /><span>Sem cadastro. Sem compromisso. No seu ritmo.</span></div>
      <details className="quiz-privacy"><summary>Como suas respostas são usadas<span aria-hidden="true">+</span></summary><p>Sem nome, e-mail ou telefone. As respostas são usadas nesta aba para contextualizar a oferta, não para criar uma avaliação de saúde.</p></details>
    </section>
  );
}
