import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST() {
  const profile = await currentProfile();

  if (!profile) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  //checking for existing user subscription
  const userSubscription = await db.subscription.findUnique({
    where: {
      userId: profile.id,
    },
  });

  if (!userSubscription || !userSubscription.subscribed) {
    return NextResponse.json({
      status: 400,
      error: "You must be subscribed to change your plan.",
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const url = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: `${baseUrl}/subscriptions`,
    });

    if (!url) {
      return NextResponse.json({
        status: 500,
        error: "Couldn't get the url.",
      });
    }

    return NextResponse.json({ status: 200, url });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create portal.",
    });
  }
}
