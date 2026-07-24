import Image from "next/image";

interface LexperomLogoProps {
  className?: string;
}

// Recorte solo-escudo de public/brand/lexperom-horizontal.png (mismo
// archivo de diseño original, sin el texto rasterizado).
const SHIELD_WIDTH = 501;
const SHIELD_HEIGHT = 587;

/**
 * Escudo real (imagen, tonos exactos del diseño) + "LEXPEROM" como texto
 * nativo del navegador — misma tipografía que el generador original
 * (Geist Black 900, tracking 0.04em, ya cargada en el sitio vía
 * next/font en layout.tsx). Separar el texto del PNG evita que se vea
 * suave a tamaño de header: el escudo nunca pierde nitidez porque viene
 * de un archivo de 4000px, y el texto es vector real del navegador.
 */
export function LexperomLogo({ className }: LexperomLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/brand/lexperom-shield.png"
        alt=""
        width={SHIELD_WIDTH}
        height={SHIELD_HEIGHT}
        priority
        className="h-8 w-auto"
      />
      <span className="font-sans text-2xl font-black uppercase tracking-[0.04em] text-white">
        Lexperom
      </span>
    </span>
  );
}
