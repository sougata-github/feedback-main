import PageTitle from "@/components/main/PageTitle";
import FeedbacksTable from "@/components/main/projects/FeedbacksTable";
import NoFeedback from "@/components/main/projects/NoFeedback";
import { getProject } from "@/lib/projects";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const project = await getProject(id);

  if (!project) {
    return <p className="text-xl">Project does not exist!</p>;
  }

  return (
    <section>
      {/* project info */}
      <header className="space-y-4">
        <div className="flex gap-1 items-center">
          <Link href={project?.url}>
            <PageTitle title={project.name || ""} />
          </Link>
        </div>

        <p className="max-w-2xl text-black/60">{project.description}</p>
      </header>

      <div className="mt-12">
        {project.feedbacks.length === 0 && <NoFeedback id={id} />}
      </div>

      <div className="mt-12 flex flex-col gap-2">
        <h2 className="text-lg md:text-xl text-zinc-600 font-medium">
          List of all the feedbacks for this project
        </h2>
        <FeedbacksTable feedbacks={project.feedbacks} />
      </div>
    </section>
  );
};

export default page;
