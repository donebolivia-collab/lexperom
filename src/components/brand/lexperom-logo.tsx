import Image from "next/image";

interface LexperomLogoProps {
  className?: string;
}

// Dimensiones reales del archivo exportado (public/brand/lexperom-horizontal.png).
const LOGO_WIDTH = 4000;
const LOGO_HEIGHT = 818;

/**
 * Logo real de Lexperom (escudo + "LEXPEROM"), tal como se diseñó —
 * exportado en PNG de alta resolución con fondo transparente. Next.js
 * sirve versiones optimizadas/redimensionadas automáticamente a partir
 * de este archivo, así que nunca se ve pixelado sin importar el tamaño
 * en pantalla. Tonos claros: pensado para fondos oscuros (nuestro header
 * azul), no para fondo blanco.
 */
export function LexperomLogo({ className }: LexperomLogoProps) {
  return (
    <Image
      src="/brand/lexperom-horizontal.png"
      alt="Lexperom"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      className={`h-8 w-auto ${className ?? ""}`}
    />
  );
}
