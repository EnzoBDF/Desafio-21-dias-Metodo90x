import { ANALYSIS_PRESENTATION_STEPS } from "../lib/analysisPresentation";
import { SummerIcon } from "./SummerIcon";

export function SummerAnalysisLoading({ step, onSkip }: { step: number; onSkip: () => void }) {
  const current = ANALYSIS_PRESENTATION_STEPS[step];
  return (
    <section className="analysis-loading" aria-labelledby="analysis-loading-title">
      <p className="analysis-loading-eyebrow">SEU VERÃO COMEÇA COM VOCÊ</p>
      <div className="analysis-loading-orbit" aria-hidden="true">
        <span className="analysis-orbit-ring analysis-orbit-ring--outer" />
        <span className="analysis-orbit-ring analysis-orbit-ring--inner" />
        <span className="analysis-orbit-sun"><SummerIcon name="sun" /></span>
        <span className="analysis-orbit-token analysis-orbit-token--heart"><SummerIcon name="heart" /></span>
        <span className="analysis-orbit-token analysis-orbit-token--leaf"><SummerIcon name="leaf" /></span>
        <span className="analysis-orbit-token analysis-orbit-token--spark"><SummerIcon name="spark" /></span>
      </div>
      <h1 id="analysis-loading-title">Um instante.<br /><em>Esse momento é seu.</em></h1>
      <p className="analysis-loading-description">Estamos organizando suas respostas para apresentar seu ponto de partida com mais clareza.</p>
      <div className="analysis-loading-status" role="status" aria-live="polite" aria-atomic="true">
        <div key={step} className="analysis-loading-message"><strong>{current.title}</strong><span>{current.detail}</span></div>
      </div>
      <div className="analysis-loading-progress" role="progressbar" aria-label="Progresso da apresentação" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step + 1} aria-valuetext={`Etapa ${step + 1} de 3`}>
        {ANALYSIS_PRESENTATION_STEPS.map((item, index) => <span key={item.at} className={index <= step ? "is-active" : ""} />)}
      </div>
      <ol className="analysis-loading-checklist" aria-label="Organizando seu resumo">
        {ANALYSIS_PRESENTATION_STEPS.map((item, index) => <li key={item.at} data-state={index < step ? "done" : index === step ? "current" : "next"}><span aria-hidden="true">{index < step ? <SummerIcon name="check" /> : String(index + 1).padStart(2, "0")}</span>{["Seu objetivo", "Sua rotina", "Seu apoio"][index]}</li>)}
      </ol>
      <p className="analysis-loading-note">Uma breve apresentação das suas escolhas.<br />Não é uma avaliação de saúde.</p>
      <button type="button" className="analysis-loading-skip" onClick={onSkip}>Ver resumo agora <SummerIcon name="arrow" /></button>
    </section>
  );
}
