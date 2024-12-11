import MainSidebar from "@/components/main/MainSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllProjects } from "@/lib/projects";
import { getSubscriptionDetails } from "@/lib/subscriptions";
import { currentProfile } from "@/lib/user";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();
  if (!profile) redirect("/sign-up");

  const [projects, subscription] = await Promise.all([
    getAllProjects(),
    getSubscriptionDetails(profile.id),
  ]);

  const free = !subscription?.subscribed;

  return (
    <SidebarProvider>
      <MainSidebar projects={projects || []} free={free} />
      <main className="overflow-x-hidden overflow-y-auto flex-1 min-h-screen pb-8 md:pb-12 pt-8 md:pt-16 px-4 md:px-8 relative">
        <div className="md:flex-1">{children}</div>
        <SidebarTrigger className="absolute top-8 md:top-12 right-4 md:right-8" />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
