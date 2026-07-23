import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PlansSection } from "@/features/plans/plans-section";

export const metadata: Metadata = {
  title: `Planes de protección legal — ${siteConfig.siteName}`,
  description:
    "Membresías de protección legal para Bolivia: consultas ilimitadas, revisión de documentos y acompañamiento en trámites, sin sorpresas.",
};

export default function PlanesPage() {
  return <PlansSection />;
}
