import NewProjectDialog from "@/components/main/dashboard/NewProjectDialog";
import Projects from "@/components/main/dashboard/Projects";
import Header from "@/components/main/PageTitle";
import SubscribeButton from "@/components/main/payments/SubscribeButton";
import { monthlyPlanId } from "@/constants";
import { getAllProjects } from "@/lib/projects";

const page = async () => {
  const projects = await getAllProjects();

  return (
    <section>
      <header className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center">
        <Header title="Dashboard" />
        <NewProjectDialog />
      </header>

      <div className="flex flex-col mt-12">
        <h2 className="text-lg md:text-xl font-semibold">Your Projects</h2>
        {!!projects && projects?.length > 0 ? (
          <Projects projects={projects || []} />
        ) : (
          <div>
            <p>You don&apos;t have any projects yet. Get Started Now.</p>
            <NewProjectDialog />
          </div>
        )}
      </div>

      <SubscribeButton price={monthlyPlanId} />
    </section>
  );
};

export default page;
