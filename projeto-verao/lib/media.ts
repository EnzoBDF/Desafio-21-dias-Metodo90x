export type EvidencePhoto = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

// Use apenas registros reais, com autorização de publicação.
export const EVIDENCE_PHOTOS: EvidencePhoto[] = [
  {
    src: "/images/evidencias/registro-real-01.jpeg",
    width: 1280,
    height: 1280,
    alt: "Comparativo fotográfico enviado para os registros reais, com imagens identificadas como janeiro e agosto de 2026",
  },
  {
    src: "/images/evidencias/registro-real-02.jpeg",
    width: 720,
    height: 1280,
    alt: "Montagem de dois registros fotográficos de uma mulher, com vestido à esquerda e roupa de treino à direita",
  },
  {
    src: "/images/evidencias/registro-real-03.jpeg",
    width: 720,
    height: 1280,
    alt: "Montagem de dois registros fotográficos de uma mulher, com camiseta clara à esquerda e camiseta preta à direita",
  },
  {
    src: "/images/evidencias/registro-real-04.jpeg",
    width: 720,
    height: 1280,
    alt: "Montagem com quatro registros fotográficos de uma mulher, com vestido azul e roupa de treino marrom",
  },
  {
    src: "/images/evidencias/registro-real-05.png",
    width: 2000,
    height: 2000,
    alt: "Montagem de dois registros fotográficos de uma mulher, com roupa de treino à esquerda e biquíni à direita, preservando o rosto desfocado",
  },
  {
    src: "/images/evidencias/registro-real-06.png",
    width: 2000,
    height: 2000,
    alt: "Montagem de dois registros fotográficos de uma mulher, com roupa preta à esquerda e camiseta amarela com saia clara à direita",
  },
  {
    src: "/images/evidencias/registro-real-07.png",
    width: 540,
    height: 539,
    alt: "Montagem de dois registros fotográficos de uma mulher, com roupa de treino preta à esquerda e vestido estampado à direita",
  },
];
