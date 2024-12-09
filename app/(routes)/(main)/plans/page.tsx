import Header from "@/components/main/PageTitle";
import ManageSubscription from "@/components/main/payments/ManageSubscription";
import SubscribeButton from "@/components/main/payments/SubscribeButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { monthlyPlanId } from "@/constants";
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
      <p>You are currently on a {plan === "premium" ? "pro" : "free"} plan.</p>

      {plan && plan === "free" ? (
        <Card className="mt-12 w-fit">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold">
              Upgrade to a Pro Plan
            </CardTitle>

            <CardDescription>
              Choose a monthly plan, or save extra by opting for a yearly plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscribeButton price={monthlyPlanId} />
          </CardContent>
        </Card>
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
