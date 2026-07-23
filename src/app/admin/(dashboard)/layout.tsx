import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { getCurrentProfile } from "@/features/auth/get-current-profile";
import { requireUser } from "@/features/auth/require-user";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  const profile = await getCurrentProfile();

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar profile={profile} />
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
