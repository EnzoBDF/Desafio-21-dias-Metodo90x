export type VideoTestimonial = {
  id: string;
  label: string;
  video?: {
    src: string;
    poster?: string;
    captions?: string;
  };
};

export type TextTestimonial = {
  id: string;
  label: string;
  content?:
    | { kind: "quote"; text: string; author?: string }
    | { kind: "image"; src: string; alt: string; width: number; height: number };
};

// Fill these slots only with real, authorized material.
// Video: video: { src: "/videos/depoimentos/arquivo.mp4", poster: "/images/depoimentos/capa.webp", captions: "/videos/depoimentos/legendas.vtt" }
// Written: content: { kind: "quote", text: "Texto original do relato", author: "Nome autorizado" }
// Screenshot: content: { kind: "image", src: "/images/depoimentos/arquivo.webp", alt: "Descrição sem dados pessoais", width: 720, height: 1280 }
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = Array.from({ length: 5 }, (_, index) => ({
  id: `video-${index + 1}`,
  label: `Depoimento em vídeo ${String(index + 1).padStart(2, "0")}`,
}));

export const TEXT_TESTIMONIALS: TextTestimonial[] = [
  {
    id: "mensagem-1", label: "Depoimento 01",
    content: { kind: "image", src: "/images/depoimentos/depoimento-01.png", width: 486, height: 190, alt: "Comentário de aluna que relata um ano no Método 90X e elogia o acolhimento e o treino personalizado" },
  },
  {
    id: "mensagem-2", label: "Depoimento 02",
    content: { kind: "image", src: "/images/depoimentos/depoimento-02.png", width: 493, height: 180, alt: "Comentário sobre a experiência no Método 90X e agradecimento ao acompanhamento do Batista" },
  },
  {
    id: "mensagem-3", label: "Depoimento 03",
    content: { kind: "image", src: "/images/depoimentos/depoimento-03.png", width: 493, height: 356, alt: "Comentário de reconhecimento à dedicação, ao conhecimento e ao suporte do Método 90X" },
  },
  {
    id: "mensagem-4", label: "Depoimento 04",
    content: { kind: "image", src: "/images/depoimentos/depoimento-04.png", width: 491, height: 196, alt: "Comentário de aluna satisfeita com sua evolução após começar os treinos do Método 90X" },
  },
  {
    id: "mensagem-5", label: "Depoimento 05",
    content: { kind: "image", src: "/images/depoimentos/depoimento-05.png", width: 501, height: 185, alt: "Comentário de reconhecimento ao desenvolvimento profissional do responsável pelo Método 90X" },
  },
];

export const GROUP_TESTIMONIALS: TextTestimonial[] = [];
