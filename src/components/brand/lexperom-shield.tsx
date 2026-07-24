interface LexperomShieldProps {
  className?: string;
}

/**
 * Escudo de Lexperom, reconstruido como SVG a partir de la geometría
 * exacta (curvas Bézier) del generador de logo original — silueta sólida
 * en el color de marca (currentColor), en vez de las 4 tonalidades del
 * generador que estaban pensadas para otra paleta (navy + dorado). Vector,
 * no PNG: se ve nítido en cualquier tamaño (header, favicon, menú móvil).
 */
export function LexperomShield({ className }: LexperomShieldProps) {
  return (
    <svg viewBox="0 0 140 164" className={className} aria-hidden="true">
      <path
        d="M70 0 L140 20 L140 76 C140 118 113 148 70 164 C27 148 0 118 0 76 L0 20 Z"
        fill="currentColor"
      />
    </svg>
  );
}
