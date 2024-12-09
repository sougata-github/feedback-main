"use server";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/user";

export async function updateSubscription(stripeCustomerId: string) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      throw new Error("User profile missing!");
    }

    await db.subscription.update({
      where: {
        stripeCustomerId,
      },
      data: {
        subscribed: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function canelSubscription(stripeCustomerId: string) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      throw new Error("User profile missing!");
    }

    await db.subscription.update({
      where: {
        stripeCustomerId,
      },
      data: {
        subscribed: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
