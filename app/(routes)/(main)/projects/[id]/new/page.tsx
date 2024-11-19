import CopyButton from "@/components/CopyButton";
import { getProject } from "@/lib/projects";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const project = await getProject(id);

  if (!project) {
    return <p className="text-xl">Project does not exist!</p>;
  }

  if (!process.env.WIDGET_URL) {
    return <p>WIDGET URL missing</p>;
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Start Collecting Feedback</h1>
      <p className="text-base text-secondary-foreground">
        Embed the code in your site.
      </p>

      <div className="mt-8 px-6 py-8 bg-black/5 rounded-lg relative">
        <CopyButton text="" />
        <code>
          {`<my-widget project="${project.id}"></my-widget>`}
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
      </div>
    </div>
  );
};

export default page;
