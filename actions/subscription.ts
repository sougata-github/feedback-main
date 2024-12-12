"use server";

import { db } from "@/lib/db";

export async function updateSubscription(stripeCustomerId: string) {
  try {
    await db.subscription.update({
      where: {
        stripeCustomerId,
      },
      data: {
        subscribed: true,
      },
    });
  } catch (error) {
    console.log("Error in updating subscription.", error);
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
