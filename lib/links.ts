export const CHECKOUT_URL = "https://pay.hotmart.com/U107211430U";

export const WHATSAPP_URL =
  "https://wa.me/5548992112149?text=Ol%C3%A1%21%20Conheci%20o%20Bumbum%20na%20Nuca%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20o%20desafio.";

// Site oficial do Metodo 90X. Sem URL preenchida o link nao e renderizado.
export const METODO_90X_URL = "https://www.metodo90x.com.br/";

export type SocialLink = {
  id: "instagram" | "youtube" | "tiktok" | "facebook" | "whatsapp";
  label: string;
  url: string;
};

// Redes sem URL preenchida nao sao renderizadas no rodape.
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/metodo_90x/" },
  { id: "tiktok", label: "TikTok", url: "" },
  { id: "whatsapp", label: "WhatsApp", url: WHATSAPP_URL },
];
