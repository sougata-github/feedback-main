import Header from "@/components/main/PageTitle";
import { getSubscriptionDetails } from "@/lib/subscriptions";
import { currentProfile } from "@/lib/user";

const page = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return null;
  }

  const subscription = await getSubscriptionDetails(profile.id);

  const plan = subscription && subscription.subscribed ? "premium" : "free";

  return (
    <section>
      <header className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center">
        <Header title="Subscription Details" />
      </header>
      <p>Your current plan is: {plan}</p>
    </section>
  );
};

export default page;
