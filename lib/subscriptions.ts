import { db } from "./db";

export async function getSubscriptionDetails(userId: string) {
  try {
    const subscription = await db.subscription.findUnique({
      where: {
        userId,
      },
    });

    return subscription;
  } catch (error) {
    console.log(error);
  }
}
