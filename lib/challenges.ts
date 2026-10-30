export const challenges = [
  {
    id: 1,
    slug: "bumbum-na-nuca",
    title: "BUMBUM NA NUCA",
    subtitle: "30 dias de treino direcionado, progressão e acompanhamento na academia",
    description:
      "Treino, estratégia e acompanhamento para buscar glúteos mais firmes, volumosos e definidos.",
    cardTitle: "UMA SEQUÊNCIA PARA SEGUIR POR 30 DIAS",
    cardSubtitle: "TREINO, ESTRATÉGIA E ACOMPANHAMENTO",
    cardDescription:
      "Avaliação inicial, treinos de academia no aplicativo e suporte para começar com direção.",
    imageSrc: "/images/bumbum-na-nuca-campanha-20261025.jpeg",
    imageAlt: "Arte de campanha Bumbum na Nuca · 30 dias · Método 90X. Imagem ilustrativa.",
    detailHref: "/desafios/bumbum-na-nuca",
    heroCopy:
      "Um desafio para quem quer parar de improvisar e seguir 30 dias de treinos direcionados para glúteos mais firmes, volumosos e definidos.",
    promise:
      "Você recebe uma avaliação inicial, treinos no aplicativo, dieta básica como recomendação e suporte da equipe durante os 30 dias.",
    focus: [
      "Ativação e execução correta dos glúteos",
      "Orientações de execução e progressão durante 30 dias",
      "Treinos desenvolvidos exclusivamente para academia",
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
