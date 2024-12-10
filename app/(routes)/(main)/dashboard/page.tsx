import NewProjectDialog from "@/components/main/dashboard/NewProjectDialog";
import Projects from "@/components/main/dashboard/Projects";
import Header from "@/components/main/PageTitle";
import SubscribeButton from "@/components/main/payments/SubscribeButton";
import { Button } from "@/components/ui/button";
import { monthlyPlanId } from "@/constants";
import { getAllProjects } from "@/lib/projects";
import { getSubscriptionDetails } from "@/lib/subscriptions";
import { currentProfile } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-up");
  }

  const projects = await getAllProjects();

  const subscription = await getSubscriptionDetails(profile?.id);

  if (!projects) {
    return (
      <p className="text-xl">There was an error fetching your projects.</p>
    );
  }

  const plan = subscription && subscription.subscribed ? "premium" : "free";

  return (
    <section>
      <header className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center">
        <Header title="Dashboard" />
        {plan === "free" && (
          <Button asChild className="w-fit">
            <Link href="/subscriptions">Upgrade</Link>
          </Button>
        )}
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
