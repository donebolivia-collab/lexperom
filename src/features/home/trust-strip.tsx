import { ShieldCheck, Lock, Users } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, text: "Revisión profesional" },
  { icon: Lock, text: "Información confidencial" },
  { icon: Users, text: "Atención digital y presencial" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
        {ITEMS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center justify-center gap-2.5 text-center">
            <Icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span className="text-sm font-medium text-ink-soft">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
