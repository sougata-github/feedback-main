"use server";

import { db } from "@/lib/db";
import { PLAN_MAP } from "@/lib/utils";
import { Plan } from "@prisma/client";

export async function updateSubscription(
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  stripePlan: string
) {
  try {
    await db.subscription.update({
      where: {
        stripeCustomerId,
      },
      data: {
        stripeSubscriptionId,
        subscribed: true,
        plan: PLAN_MAP[stripePlan] || Plan.FREE,
      },
    });
  } catch (error) {
    console.error("Error in updating subscription:", error);
  }
}

export async function cancelSubscription(stripeCustomerId: string) {
  try {
    await db.subscription.update({
      where: {
        stripeCustomerId,
      },
      data: {
        subscribed: false,
      },
    });
  } catch (error) {
    console.log("Error in deleting subscription.", error);
  }
}
