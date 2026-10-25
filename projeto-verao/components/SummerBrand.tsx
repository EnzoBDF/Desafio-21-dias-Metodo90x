import Link from "next/link";
import { SummerIcon } from "./SummerIcon";

export function SummerBrand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand ${footer ? "brand--footer" : ""}`} href="/" aria-label="Projeto Verão: início do quiz">
      <SummerIcon name="sun" />
      <span>projeto <em>verão</em><small>MAGRA E DEFINIDA</small></span>
    </Link>
  );
}
