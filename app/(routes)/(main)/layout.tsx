import MainSidebar from "@/components/main/MainSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllProjects } from "@/lib/projects";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const projects = await getAllProjects();

  return (
    <SidebarProvider>
      <MainSidebar projects={projects || []} />
      <main className="bg-black/5 flex-1 h-screen py-8 md:py-12 flex justify-between px-4 md:px-8">
        <div className="">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
