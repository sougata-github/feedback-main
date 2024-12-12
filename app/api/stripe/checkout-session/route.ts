import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
// import { Subscription } from "@prisma/client";
import { currentProfile } from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();

  console.log(price);

  const profile = await currentProfile();

  if (!profile) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const userSubscription = await db.subscription.findUnique({
    where: {
      userId: profile.id,
    },
  });

  let customer;

  if (userSubscription) {
    customer = {
      id: userSubscription.stripeCustomerId,
    };
  } else {
    //create a new subscription
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: profile.id,
      },
    };

    const response = await stripe.customers.create(customerData);

    if (!response) {
      return NextResponse.json({ status: 500, error: "Response not found" });
    }

    customer = { id: response?.id };

    await db.subscription.create({
      data: {
        userId: profile.id,
        stripeCustomerId: customer.id,
        stripeSubscriptionId: "",
        subscribed: false,
      },
    });
  }

  if (!customer?.id) {
    return NextResponse.json({
      status: 500,
      error: "Failed to get customer id.",
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/dashboard`,
      customer: customer?.id,
      payment_method_types: ["card"],
      mode: "subscription",
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
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create checkout session.",
    });
  }
}
