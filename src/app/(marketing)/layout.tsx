import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <WhatsAppWidget />
    </>
  );
}
