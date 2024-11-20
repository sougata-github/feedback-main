import Header from "@/components/main/Header";
import NoFeedback from "@/components/projects/NoFeedback";
import { getProject } from "@/lib/projects";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const project = await getProject(id);

  if (!project) {
    return <p className="text-xl">Project does not exist!</p>;
  }

  if (project.feedbacks.length === 0) {
    return <NoFeedback id={id} />;
  }

  return (
    <div>
      <Header title={project.name || ""} />
    </div>
  );
};

export default page;
