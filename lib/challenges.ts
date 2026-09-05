export const challenges = [
  {
    id: 1,
    slug: "bumbum-na-nuca",
    title: "BUMBUM NA NUCA",
    subtitle: "Glúteos mais firmes, volumosos e definidos em 21 dias",
    description:
      "Treino, estratégia e acompanhamento para buscar glúteos mais firmes, volumosos e definidos.",
    cardTitle: "GLÚTEOS MAIS FIRMES EM 21 DIAS",
    cardSubtitle: "TREINO, ESTRATÉGIA E ACOMPANHAMENTO",
    cardDescription:
      "Treinos e suporte para desenvolver glúteos mais firmes, volumosos e definidos.",
    imageSrc: "/images/Bumbum2.png",
    imageAlt: "Desafio Bumbum na Nuca",
    detailHref: "/desafios/bumbum-na-nuca",
    heroCopy:
      "Um desafio para quem quer parar de improvisar e seguir 21 dias de treinos direcionados para glúteos mais firmes, volumosos e definidos.",
    promise:
      "Você recebe treinos objetivos, estratégia alimentar e acompanhamento para transformar esforço em evolução visível dos glúteos.",
    focus: [
      "Ativação e execução correta dos glúteos",
      "Progressão de carga e intensidade por 21 dias",
      "Treinos direcionados para casa ou academia",
    ],
    context: [
      "Ideal para quem treina glúteos, mas ainda não consegue organizar estímulo, frequência, intensidade e execução.",
      "A proposta é simples: menos improviso e mais direção para fazer cada treino contar no seu projeto Bumbum na Nuca.",
    ],
  },
] as const;

export type Challenge = (typeof challenges)[number];

export function getChallengeBySlug(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}
