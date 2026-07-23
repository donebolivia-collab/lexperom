import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Scale, Lock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Canales de contacto — ${siteConfig.siteName}`,
  description: "Elige cómo prefieres contactarnos: llamada, WhatsApp, correo o visita a oficina.",
};

function isPlaceholder(value: string): boolean {
  return !value || value.startsWith("[");
}

interface ChannelCard {
  icon: typeof Phone;
  iconColorClass: string;
  iconBgClass: string;
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  primary?: boolean;
}

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: "Primera consulta sin costo" },
  { icon: Scale, text: "Revisión profesional de tu caso" },
  { icon: Lock, text: "Información tratada con confidencialidad" },
];

export default function CanalesContactoPage() {
  const { whatsapp, phone, countryCode, email, address } = siteConfig.contact;
  const emailReady = !isPlaceholder(email);
  const addressReady = !isPlaceholder(address);

  const channels: ChannelCard[] = [
    {
      icon: Phone,
      iconColorClass: "text-red-600",
      iconBgClass: "bg-red-50",
      title: "Llámanos ahora",
      description: "Atención directa en horario de oficina.",
      ctaLabel: phone,
      href: `tel:+${countryCode}${phone}`,
    },
    {
      icon: MessageCircle,
      iconColorClass: "text-emerald-600",
      iconBgClass: "bg-emerald-50",
      title: "Chat por WhatsApp",
      description: "Escríbenos y te respondemos apenas podamos.",
      ctaLabel: "Abrir WhatsApp",
      href: `https://wa.me/${countryCode}${whatsapp}?text=${encodeURIComponent("Hola, necesito orientación legal.")}`,
      primary: true,
    },
    {
      icon: Mail,
      iconColorClass: "text-brand",
      iconBgClass: "bg-brand/10",
      title: "Correo electrónico",
      description: emailReady ? "Escríbenos y te respondemos por correo." : "Disponible próximamente.",
      ctaLabel: "Enviar correo",
      href: emailReady ? `mailto:${email}` : undefined,
    },
    {
      icon: MapPin,
      iconColorClass: "text-brand",
      iconBgClass: "bg-brand/10",
      title: "Visítanos",
      description: addressReady ? address : "Dirección de oficina pendiente de definir.",
      ctaLabel: "Ver en Google Maps",
      href: addressReady
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        : undefined,
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Canales de contacto
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
            Elige el canal que prefieras — todos llegan directamente a nuestro equipo.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const disabled = !channel.href;
            return (
              <Card
                key={channel.title}
                className={cn(
                  "flex h-full flex-col border-2 text-center",
                  disabled ? "border-line" : "border-brand"
                )}
              >
                <CardContent className="flex h-full flex-1 flex-col items-center p-6">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full",
                      disabled ? "bg-black/[0.04]" : channel.iconBgClass
                    )}
                  >
                    <Icon
                      className={cn("h-6 w-6", disabled ? "text-muted" : channel.iconColorClass)}
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="mt-4 text-base font-semibold text-ink">{channel.title}</h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                    {channel.description}
                  </p>

                  {disabled ? (
                    <span className="mt-6 w-full rounded-md border border-line px-4 py-2.5 text-sm font-medium text-muted">
                      Próximamente
                    </span>
                  ) : (
                    <a
                      href={channel.href}
                      target={channel.href?.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        buttonVariants({ variant: channel.primary ? "primary" : "secondary" }),
                        "mt-6 w-full"
                      )}
                    >
                      {channel.ctaLabel}
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 py-8 sm:flex-row sm:gap-10 sm:px-6">
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-sm text-ink-soft">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
