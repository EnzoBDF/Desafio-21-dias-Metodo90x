import type { Metadata } from "next";
import MondraGame from "./MondraGame";

export const metadata: Metadata = {
  title: "Mondra · Vale das Folhas",
  description: "Explore o Vale das Folhas, descubra seis criaturas e viva uma aventura em pixel art. Um jogo original de captura e batalhas por turnos.",
};

export default function GamePage() {
  return <MondraGame />;
}
