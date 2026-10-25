export const QUIZ_STORAGE_KEY = "projeto-verao:quiz:v1";

export const QUIZ_QUESTIONS = [
  {
    id: "objetivo",
    chapter: "Seu objetivo",
    title: "Qual é o seu principal objetivo?",
    description: "Escolha o que mais combina com o seu momento.",
    options: [
      { id: "emagrecer", label: "Quero emagrecer", detail: "Buscar leveza e me sentir bem." },
      { id: "definir", label: "Quero mais definição", detail: "Dar mais direção aos meus treinos." },
      { id: "energia", label: "Quero mais disposição", detail: "Trazer movimento para os meus dias." },
      { id: "retomar", label: "Quero voltar a cuidar de mim", detail: "Retomar o cuidado no meu ritmo." },
    ],
  },
  {
    id: "momento",
    chapter: "Seu ponto de partida",
    title: "Como estão seus treinos hoje?",
    description: "Não existe resposta certa. Existe a sua realidade.",
    options: [
      { id: "comecar", label: "Estou começando agora", detail: "Quero entender por onde começar." },
      { id: "voltar", label: "Estou voltando de uma pausa", detail: "Quero reencontrar meu ritmo." },
      { id: "irregular", label: "Treino de vez em quando", detail: "Quero mais constância na rotina." },
      { id: "regular", label: "Já treino com frequência", detail: "Quero continuar, com mais direcionamento." },
    ],
  },
  {
    id: "local",
    chapter: "Do seu jeito",
    title: "Onde você prefere treinar?",
    description: "Pense no que é mais prático para o seu dia a dia.",
    options: [
      { id: "casa", label: "Em casa", detail: "A praticidade de treinar no meu espaço." },
      { id: "academia", label: "Na academia", detail: "Gosto de ter esse momento fora de casa." },
      { id: "ambos", label: "Alternando os dois", detail: "Prefiro ter flexibilidade na rotina." },
      { id: "decidir", label: "Ainda vou decidir", detail: "Quero conversar com a equipe sobre as opções." },
    ],
  },
  {
    id: "frequencia",
    chapter: "Seu ritmo",
    title: "Quantos dias cabem na sua semana?",
    description: "Pense nos treinos. A rotina adequada deve ser orientada pela equipe.",
    options: [
      { id: "dois", label: "2 dias por semana", detail: "Quero começar com passos menores." },
      { id: "tres", label: "3 dias por semana", detail: "Quero criar uma rotina consistente." },
      { id: "quatro", label: "4 dias ou mais", detail: "Quero reservar mais momentos para mim." },
      { id: "organizar", label: "Preciso organizar meus horários", detail: "Ainda estou encontrando espaço na agenda." },
    ],
  },
  {
    id: "desafio",
    chapter: "O que pode ajudar",
    title: "O que mais dificulta sua rotina?",
    description: "Escolha o desafio que mais aparece no seu dia a dia.",
    options: [
      { id: "constancia", label: "Manter a constância", detail: "Começo animada, mas acabo parando." },
      { id: "direcao", label: "Saber como treinar", detail: "Sinto falta de um direcionamento." },
      { id: "alimentacao", label: "Organizar a alimentação", detail: "Quero trazer mais organização para esse cuidado." },
      { id: "apoio", label: "Ter com quem contar", detail: "Gostaria de apoio ao longo do caminho." },
    ],
  },
  {
    id: "prioridade",
    chapter: "Seu próximo passo",
    title: "Qual apoio faria mais diferença agora?",
    description: "Última pergunta. Depois, veja o resumo das suas escolhas.",
    options: [
      { id: "treino", label: "Treino especializado", detail: "Mais direcionamento para me movimentar." },
      { id: "dieta", label: "Dieta especializada", detail: "Alimentação e treino no mesmo projeto." },
      { id: "materiais", label: "Materiais para consultar", detail: "Ter conteúdo de apoio ao meu alcance." },
      { id: "suporte", label: "Suporte e grupo de apoio", detail: "Não precisar fazer esse caminho sozinha." },
    ],
  },
] as const;

export type QuestionId = (typeof QUIZ_QUESTIONS)[number]["id"];
export type QuizAnswers = Partial<Record<QuestionId, string>>;
export type QuizState = { step: number; answers: QuizAnswers };
export type QuizAction = { type: "select"; option: string } | { type: "next" } | { type: "back" };
export const INITIAL_QUIZ_STATE: QuizState = { step: 0, answers: {} };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  const question = QUIZ_QUESTIONS[state.step];
  switch (action.type) {
    case "select":
      if (!question.options.some((option) => option.id === action.option)) return state;
      return { ...state, answers: { ...state.answers, [question.id]: action.option } };
    case "next":
      if (!state.answers[question.id] || state.step === QUIZ_QUESTIONS.length - 1) return state;
      return { ...state, step: state.step + 1 };
    case "back":
      return state.step === 0 ? state : { ...state, step: state.step - 1 };
  }
}

export function isCompleteQuiz(value: unknown): value is Record<QuestionId, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return QUIZ_QUESTIONS.every((question) => {
    const answer = (value as Record<string, unknown>)[question.id];
    return question.options.some((option) => option.id === answer);
  });
}

export function parseQuizAnswers(raw: string | null): QuizAnswers | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isCompleteQuiz(value)) return null;
    // Only known answers are retained; arbitrary storage content is never rendered.
    return Object.fromEntries(QUIZ_QUESTIONS.map(({ id }) => [id, value[id]]));
  } catch { return null; }
}

export function getAnswerLabel(answers: QuizAnswers, id: QuestionId): string {
  const question = QUIZ_QUESTIONS.find((item) => item.id === id);
  return question?.options.find((option) => option.id === answers[id])?.label ?? "";
}

export function getOfferHeadline(answers: QuizAnswers | null): { title: string; accent: string } {
  switch (answers?.objetivo) {
    case "emagrecer": return { title: "Mais leveza na rotina.", accent: "Mais espaço para você." };
    case "definir": return { title: "Mais direção para treinar.", accent: "Seu objetivo é definição." };
    case "energia": return { title: "Mais movimento nos seus dias.", accent: "Mais tempo para você." };
    case "retomar": return { title: "Um novo começo.", accent: "No seu próprio ritmo." };
    default: return { title: "Seu próximo capítulo", accent: "pode ser mais leve." };
  }
}

const routineNotes: Record<string, string> = {
  comecar: "Você está começando. Leve esse ponto de partida para a equipe ao receber suas orientações.",
  voltar: "Você está retomando. Conte à equipe sobre a pausa para conversar sobre esse recomeço.",
  irregular: "Você quer mais regularidade. Pense em quais dias consegue reservar para esse cuidado.",
  regular: "Você já tem uma rotina. Compartilhe com a equipe como são seus treinos hoje.",
};
const challengeNotes: Record<string, string> = {
  constancia: "Você apontou a constância como desafio. Vale conversar sobre os momentos em que sua rotina costuma ficar mais difícil.",
  direcao: "Você sente falta de direção nos treinos. Leve suas dúvidas à equipe antes de começar.",
  alimentacao: "Você quer organizar a alimentação. Compartilhe sua rotina com o profissional responsável pelas orientações.",
  apoio: "Você quer ter com quem contar. Conheça como funcionam o suporte e o grupo antes de participar.",
};

export function getQuizAnalysis(answers: QuizAnswers) {
  return {
    objective: getAnswerLabel(answers, "objetivo"),
    moment: getAnswerLabel(answers, "momento"),
    location: getAnswerLabel(answers, "local"),
    frequency: getAnswerLabel(answers, "frequencia"),
    challenge: getAnswerLabel(answers, "desafio"),
    priority: getAnswerLabel(answers, "prioridade"),
    routineNote: routineNotes[answers.momento ?? ""] ?? "Converse com a equipe sobre seu ponto de partida.",
    challengeNote: challengeNotes[answers.desafio ?? ""] ?? "Converse com a equipe sobre o apoio que você procura.",
  };
}
