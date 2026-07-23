import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
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
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  primary?: boolean;
}

export default function CanalesContactoPage() {
  const { whatsapp, phone, countryCode, email, address } = siteConfig.contact;
  const fullPhone = `${countryCode}${phone}`;
  const emailReady = !isPlaceholder(email);
  const addressReady = !isPlaceholder(address);

  const channels: ChannelCard[] = [
    {
      icon: Phone,
      title: "Llámanos ahora",
      description: "Atención directa en horario de oficina.",
      ctaLabel: `Llamar · ${phone}`,
      href: `tel:+${fullPhone}`,
    },
    {
      icon: MessageCircle,
      title: "Chat por WhatsApp",
      description: "Escríbenos y te respondemos apenas podamos.",
      ctaLabel: "Abrir WhatsApp",
      href: `https://wa.me/${countryCode}${whatsapp}?text=${encodeURIComponent("Hola, necesito orientación legal.")}`,
      primary: true,
    },
    {
      icon: Mail,
      title: "Correo electrónico",
      description: emailReady ? "Escríbenos y te respondemos por correo." : "Disponible próximamente.",
      ctaLabel: "Enviar correo",
      href: emailReady ? `mailto:${email}` : undefined,
    },
    {
      icon: MapPin,
      title: "Visítanos",
      description: addressReady ? address : "Dirección de oficina pendiente de definir.",
      ctaLabel: "Ver en Google Maps",
      href: addressReady
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        : undefined,
    },
  ];

  return (
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
                    disabled ? "bg-black/[0.04]" : "bg-brand/10"
                  )}
                >
                  <Icon
                    className={cn("h-6 w-6", disabled ? "text-muted" : "text-brand")}
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
  );
}
