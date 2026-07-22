import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ProfessionalProfile } from "@/features/home/professional-profile";

export const metadata: Metadata = {
  title: `Perfil profesional — ${siteConfig.siteName}`,
};

export default function ProfesionalPage() {
  return <ProfessionalProfile />;
}
