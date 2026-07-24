import { useId } from "react";

interface LexperomShieldProps {
  className?: string;
}

// Geometría exacta del generador original (140x164, mismas curvas Bézier).
const SHIELD_PATH = "M70 0 L140 20 V76 C140 118 113 148 70 164 C27 148 0 118 0 76 V20 Z";

// Paleta "clara" del diseño original, pensada para fondo oscuro (header azul).
const TONES = {
  topLeft: "#B9BBC0",
  topRight: "#FFFFFF",
  bottomLeft: "#80848E",
  bottomRight: "#D9DBDE",
  ring: "#FFFFFF",
};

/**
 * Escudo de Lexperom en SVG real (anillo + 4 zonas tonales), a partir del
 * archivo vectorial final del diseño. Vector puro: nunca se pixela, sin
 * importar el tamaño en pantalla.
 */
export function LexperomShield({ className }: LexperomShieldProps) {
  const uid = useId();
  const maskId = `lexperom-anillo-${uid}`;
  const clipId = `lexperom-nucleo-${uid}`;

  return (
    <svg
      viewBox="0 0 140 164"
      className={className}
      role="img"
      aria-label="Escudo Lexperom"
    >
      <defs>
        <mask id={maskId}>
          <path d={SHIELD_PATH} fill="#fff" />
          <path
            d={SHIELD_PATH}
            fill="#000"
            transform="translate(70,86) scale(0.87) translate(-70,-86)"
          />
        </mask>
        <clipPath id={clipId}>
          <path
            d={SHIELD_PATH}
            transform="translate(70,86) scale(0.76) translate(-70,-86)"
          />
        </clipPath>
      </defs>
      <path d={SHIELD_PATH} fill={TONES.ring} mask={`url(#${maskId})`} />
      <g clipPath={`url(#${clipId})`}>
        <rect x="-6" y="-6" width="76" height="92" fill={TONES.topLeft} />
        <rect x="70" y="-6" width="76" height="92" fill={TONES.topRight} />
        <rect x="-6" y="86" width="76" height="92" fill={TONES.bottomLeft} />
        <rect x="70" y="86" width="76" height="92" fill={TONES.bottomRight} />
      </g>
    </svg>
  );
}
