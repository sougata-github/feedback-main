import MainSidebar from "@/components/main/MainSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllProjects } from "@/lib/projects";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const projects = await getAllProjects();

  return (
    <SidebarProvider>
      <MainSidebar projects={projects || []} />
      <main className="overflow-x-hidden overflow-y-auto flex-1 min-h-screen pb-8 md:pb-12 pt-14 sm:pt-16 px-4 md:px-8 relative">
        <div className="md:flex-1">{children}</div>
        <SidebarTrigger className="absolute top-8 md:top-12 right-4 md:right-8" />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
