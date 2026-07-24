import { LexperomShield } from "@/components/brand/lexperom-shield";

interface LexperomLogoProps {
  className?: string;
}

/**
 * Escudo real (SVG vectorial, tonos exactos del diseño) + "LEXPEROM" como
 * texto nativo del navegador — misma tipografía que el generador original
 * (Geist Black 900, tracking 0.04em, ya cargada en el sitio vía next/font
 * en layout.tsx). Ambas piezas son vector/texto real: nunca pierden
 * nitidez sin importar el tamaño en pantalla.
 */
export function LexperomLogo({ className }: LexperomLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LexperomShield className="h-8 w-auto" />
      <span className="font-sans text-2xl font-black uppercase tracking-[0.04em] text-white">
        Lexperom
      </span>
    </span>
  );
}
