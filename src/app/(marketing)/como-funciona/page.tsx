import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { HowItWorks } from "@/features/home/how-it-works";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Cómo funciona — ${siteConfig.siteName}`,
};

export default function ComoFuncionaPage() {
  return (
    <>
      <HowItWorks />
      <div className="pb-20 text-center">
        <Link href="/#consulta" className={cn(buttonVariants({ size: "lg" }))}>
          Cuéntanos tu problema
        </Link>
      </div>
    </>
  );
}
