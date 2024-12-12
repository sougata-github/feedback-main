import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { updateSubscription, cancelSubscription } from "@/actions/subscription";
import { NextResponse } from "next/server";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
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
    if (event.type === "checkout.session.completed") {
      const { customer } = data;
      await updateSubscription(customer as string);
    } else if (event.type === "customer.subscription.deleted") {
      const { customer } = data;
      await cancelSubscription(customer as string);
    }
  }

  return NextResponse.json({ status: 200, received: true });
}
