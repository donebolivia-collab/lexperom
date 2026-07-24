import { siteConfig } from "@/config/site";
import { LexperomShield } from "./lexperom-shield";

interface LexperomLogoProps {
  className?: string;
}

/** Escudo + nombre, el lockup horizontal completo del logo. */
export function LexperomLogo({ className }: LexperomLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-white ${className ?? ""}`}>
      <LexperomShield className="h-7 w-auto shrink-0" />
      <span className="text-lg font-black uppercase tracking-wide">
        {siteConfig.logo.wordmarkText}
      </span>
    </span>
  );
}
