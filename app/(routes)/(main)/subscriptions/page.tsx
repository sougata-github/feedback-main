import Header from "@/components/main/PageTitle";
import ManageSubscription from "@/components/main/payments/ManageSubscription";
import Pricing from "@/components/main/payments/Pricing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <p className="text-base">
        You are currently on a{" "}
        <span className="font-bold">{plan === "premium" ? "pro" : "free"}</span>{" "}
        plan.
      </p>

      {plan && plan === "free" ? (
        <Pricing />
      ) : (
        <Card className="mt-12 w-fit">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold">
              Change your Plan.
            </CardTitle>

            <CardDescription>
              Choose whichever plan suits your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageSubscription />
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default page;
