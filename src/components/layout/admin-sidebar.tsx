"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Users,
  FileText,
  Calendar,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIVE_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/consultas", label: "Consultas", icon: Inbox, exact: false },
];

// Visibles para mostrar hacia dónde escala el producto, pero deshabilitados:
// todavía no están implementados y no deben parecer funcionales.
const COMING_SOON_ITEMS = [
  { label: "Casos", icon: Briefcase },
  { label: "Clientes", icon: Users },
  { label: "Documentos", icon: FileText },
  { label: "Agenda", icon: Calendar },
  { label: "Tareas", icon: CheckSquare },
  { label: "Analytics", icon: BarChart3 },
  { label: "Configuración", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-56 shrink-0 flex-col gap-0.5 border-r border-line bg-surface px-3 py-4">
      {ACTIVE_ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-brand/10 text-brand" : "text-ink-soft hover:bg-black/[0.04]"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </Link>
        );
      })}

      <div className="mt-4 border-t border-line pt-4">
        <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted">Próximamente</p>
        {COMING_SOON_ITEMS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="mt-0.5 flex cursor-not-allowed items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted/70"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </nav>
  );
}
