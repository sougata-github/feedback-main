import Header from "@/components/main/Header";
import NoFeedback from "@/components/projects/NoFeedback";
import { getProject } from "@/lib/projects";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const project = await getProject(id);

  if (!project) {
    return <p className="text-xl">Project does not exist!</p>;
  }

  return (
    <section>
      <Header title={project.name || ""} />
      <p className="max-w-xl text-black/60">{project.description}</p>

      <div className="mt-12">
        {project.feedbacks.length === 0 && <NoFeedback id={id} />}
      </div>
    </section>
  );
};

export default page;
