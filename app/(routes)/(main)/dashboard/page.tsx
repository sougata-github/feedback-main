import NewProjectDialog from "@/components/dashboard/NewProjectDialog";
import { db } from "@/lib/db";

const page = async () => {
  const allProjects = await db.project.findMany();

  console.log(allProjects);

  return (
    <div>
      <NewProjectDialog />
    </div>
  );
};

export default page;
