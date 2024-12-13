import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { updateSubscription, cancelSubscription } from "@/actions/subscription";
import { NextResponse } from "next/server";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret =
    process.env.NODE_ENV === "production"
      ? process.env.STRIPE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_LOCAL_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({
      status: 400,
      error: "Webhook secret not found",
    });
  }

  if (!sig) {
    return NextResponse.json({
      status: 400,
      error: "No signature",
    });
  }

  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  const data = event.data.object as Stripe.Subscription;

  if (relevantEvents.has(event.type)) {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const stripeCustomerId = session.customer as string;

        if (session.subscription) {
          const subscriptionId = session.subscription as string;
          const stripePlan = session.metadata?.plan;

          if (!stripePlan) {
            throw new Error("Plan not found in session metadata");
          }

          await updateSubscription(
            stripeCustomerId,
            subscriptionId,
            stripePlan
          );
        } else {
          console.error("No subscription found in session.");
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = data as Stripe.Subscription;
        const stripeCustomerId = subscription.customer as string;
        const subscriptionId = subscription.id;
        const stripePlan = subscription.items.data[0].price.product as string;

        console.log(stripePlan);

        await updateSubscription(stripeCustomerId, subscriptionId, stripePlan);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = data as Stripe.Subscription;
        const stripeCustomerId = subscription.customer as string;
        await cancelSubscription(stripeCustomerId);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  return NextResponse.json({ status: 200, received: true });
}
