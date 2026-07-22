import type { Metadata } from "next";
import { Hero } from "@/features/home/hero";
import { TrustStrip } from "@/features/home/trust-strip";
import { HowItWorks } from "@/features/home/how-it-works";
import { ProfessionalProfile } from "@/features/home/professional-profile";
import { PracticeAreas } from "@/features/home/practice-areas";
import { Faq } from "@/features/home/faq";
import { FinalCta } from "@/features/home/final-cta";
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
      <TrustStrip />
      <HowItWorks />
      <ProfessionalProfile />
      <PracticeAreas />
      <Faq />
      <FinalCta />
    </>
  );
}
