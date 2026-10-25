import type { Metadata } from "next";
import { SummerReferenceOffer } from "../../components/SummerReferenceOffer";

export const metadata: Metadata = {
  title: "Projeto Verão, Magra e Definida | Método 90X",
  description: "Conheça o Método 90X: 30 dias de treino, alimentação e apoio no Projeto Verão. De R$ 397 por R$ 97 à vista.",
};

export default function OfferPage() {
  return <SummerReferenceOffer />;
}
