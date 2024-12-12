import { Suspense } from "react";
import NewProjectDialog from "@/components/main/dashboard/NewProjectDialog";
import Projects from "@/components/main/dashboard/Projects";
import Header from "@/components/main/PageTitle";
import { Button } from "@/components/ui/button";
import { canCreateMoreProjects, getAllProjects } from "@/lib/projects";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DashboardContent = async () => {
  const projectsPromise = getAllProjects();
  const canCreatePromise = canCreateMoreProjects();

  const [projects, canCreate] = await Promise.all([
    projectsPromise,
    canCreatePromise,
  ]);

  if (!projects) {
    return (
      <p className="text-xl">There was an error fetching your projects.</p>
    );
  }

  return (
    <>
      <header className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center">
        <Header title="Dashboard" />
        {canCreate ? (
          <NewProjectDialog />
        ) : (
          <Button className="w-fit">
            <Link href="/subscriptions">Upgrade</Link>
          </Button>
        )}
      </header>

      <div className="flex flex-col mt-12">
        <h2 className="text-lg md:text-xl font-semibold">Your Projects</h2>
        {projects.length > 0 ? (
          <Projects projects={projects} />
        ) : (
          <div>
            <p>You don&apos;t have any projects yet. Get Started Now.</p>
            <NewProjectDialog />
          </div>
        )}
      </div>
    </>
  );
};

const DashboardPage = () => {
  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardContent />
      </Suspense>
    </section>
  );
};

export default DashboardPage;
