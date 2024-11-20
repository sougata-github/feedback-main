import CopyButton from "@/components/CopyButton";
import Header from "@/components/main/Header";
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
    <section>
      <Header title="Start Collecting Feedback" />
      <p className="text-base text-secondary-foreground">
        Embed the code in your site.
      </p>

      <div className="mt-8 px-6 py-8 bg-black/5 rounded-lg relative">
        <CopyButton text="" />
        <div className="max-w-lg mt-2">
          {" "}
          <code>
            {`<my-widget project="${project.id}"></my-widget>`}
            {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
          </code>
        </div>
      </div>
    </section>
  );
};

export default page;
