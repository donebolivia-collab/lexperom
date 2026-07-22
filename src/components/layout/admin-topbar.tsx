import { siteConfig } from "@/config/site";
import { logout } from "@/features/auth/actions";
import type { Profile } from "@/types/database";

export function AdminTopbar({ profile }: { profile: Profile | null }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-surface px-6">
      <span className="text-sm font-semibold text-ink">{siteConfig.siteName} · Panel interno</span>
      <div className="flex items-center gap-4">
        {profile && (
          <span className="text-sm text-muted">
            {profile.full_name} · <span className="capitalize">{profile.role}</span>
          </span>
        )}
        <form action={logout}>
          <button type="submit" className="text-sm font-medium text-brand hover:underline">
            Cerrar sesión
          </button>
        </form>
      </div>
    </header>
  );
}
