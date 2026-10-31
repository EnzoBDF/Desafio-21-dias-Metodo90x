export type EvidencePhoto = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  companion?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

// Use apenas registros reais, com autorização de publicação.
export const EVIDENCE_PHOTOS: EvidencePhoto[] = [
  {
    id: "02",
    src: "/images/evidencias/registro-real-02.jpeg",
    width: 720,
    height: 1280,
    alt: "Montagem de dois registros fotográficos de uma mulher, com vestido à esquerda e roupa de treino à direita",
  },
  {
    id: "04",
    src: "/images/evidencias/registro-real-04-vestido.png",
    width: 211,
    height: 354,
    alt: "Registro real de uma mulher com vestido azul em frente ao espelho",
    companion: {
      src: "/images/evidencias/registro-real-04-academia.png",
      width: 222,
      height: 357,
      alt: "Registro real da mesma mulher com roupa de treino marrom na academia",
    },
  },
  {
    id: "08",
    src: "/images/evidencias/registro-real-08.png",
    width: 439,
    height: 551,
    alt: "Comparativo de dois registros reais de costas de uma mulher com biquíni verde",
  },
  {
    id: "07",
    src: "/images/evidencias/registro-real-07.png",
    width: 540,
    height: 539,
    alt: "Montagem de dois registros fotográficos de uma mulher, com roupa de treino preta à esquerda e vestido estampado à direita",
  },
];
