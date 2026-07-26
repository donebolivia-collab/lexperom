import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const WHATSAPP_MESSAGE = "Hola, necesito orientación legal.";

/**
 * Botón flotante fijo, visible en todo el sitio de marketing, con los
 * colores oficiales de WhatsApp (no el azul de marca) para que se
 * reconozca de inmediato como el canal que es.
 */
export function WhatsAppWidget() {
  const { whatsapp, countryCode } = siteConfig.contact;
  const href = `https://wa.me/${countryCode}${whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-3.5 pr-5 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="text-sm font-semibold">Escríbenos</span>
    </a>
  );
}
