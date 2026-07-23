import type { Metadata } from "next";
import { Hero } from "@/features/home/hero";
import { PlansSection } from "@/features/plans/plans-section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.siteName} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: siteConfig.siteName,
  description: siteConfig.description,
  areaServed: "BO",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contact.city,
    addressCountry: "BO",
  },
  url: siteConfig.domain,
};

export default function HomePage() {
  return (
    <>
      {/* Datos estructurados con placeholders — actualizar cuando exista
          información real de marca/contacto antes de producción. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PlansSection showFaq={false} />
    </>
  );
}
