import Header from "@/components/main/Header";
import FeedbacksTable from "@/components/main/projects/FeedbacksTable";
import NoFeedback from "@/components/main/projects/NoFeedback";

import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
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
      <Header title={project.name || ""} />
      <Link href={project.url} target="_blank" className="group">
        <Button
          variant="ghost"
          className="outline outline-1 outline-black/10 my-2 w-fit"
        >
          Visit Site
          <ArrowUpRight />
        </Button>
      </Link>
      <p className="max-w-lg text-black/60">{project.description}</p>

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
