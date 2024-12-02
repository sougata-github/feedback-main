import CopyButton from "@/components/CopyButton";
import Header from "@/components/main/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

      <div className="flex flex-col gap-4 mt-12">
        <Card className="pb-4 max-w-xl relative">
          <CopyButton
            text={`<my-widget project="${project.id}"></my-widget>\n<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
          />
          <CardHeader>
            <CardTitle className="text-base text-secondary-foreground font-medium">
              Embed the following code in your site.
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <code>
              {`<my-widget projectId="${project.id}"></my-widget>`}
              {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
            </code>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default page;
