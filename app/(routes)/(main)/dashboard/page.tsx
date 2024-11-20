import NewProjectDialog from "@/components/main/dashboard/NewProjectDialog";
import Header from "@/components/main/Header";

const page = async () => {
  return (
    <section>
      <Header title="Dashboard" />
      <NewProjectDialog />
    </section>
  );
};

export default page;
