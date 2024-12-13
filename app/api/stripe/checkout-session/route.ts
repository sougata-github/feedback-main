import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();

  const profile = await currentProfile();

  if (!profile) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const userSubscription = await db.subscription.findUnique({
    where: {
      userId: profile.id,
    },
  });

  if (userSubscription && userSubscription.subscribed) {
    return NextResponse.json({
      status: 400,
      error: "You already have an active subscription.",
    });
  }

  let customer;

  if (userSubscription) {
    customer = { id: userSubscription.stripeCustomerId };
  } else {
    try {
      const customerData = {
        metadata: { dbId: profile.id },
      };

      const response = await stripe.customers.create(customerData);

      if (!response) {
        return NextResponse.json({
          status: 500,
          error: "Failed to create Stripe customer.",
        });
      }

      customer = { id: response.id };

      await db.subscription.create({
        data: {
          userId: profile.id,
          stripeCustomerId: customer.id,
          stripeSubscriptionId: "",
          subscribed: false,
        },
      });
    } catch (error) {
      console.error("Failed to create customer:", error);
      return NextResponse.json({
        status: 500,
        error: "Failed to create customer.",
      });
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/dashboard`,
      cancel_url: `${baseUrl}/subscriptions`,
      customer: customer.id,
      payment_method_types: ["card"],
      mode: "subscription",
      metadata: {
        plan: price,
      },
      line_items: [
        {
          price,
          quantity,
        },
      ],
    });

    if (!session || !session.id) {
      console.error("Stripe session creation failed:", session);
      return NextResponse.json({
        status: 500,
        error: "Failed to create Stripe checkout session.",
      });
    }

    return NextResponse.json({ status: 200, sessionId: session.id });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create checkout session.",
    });
  }
}
