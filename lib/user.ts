"use server";

import { userData } from "@/types";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

//when a user signs up, create a profile in db
export async function createUser(data: userData) {
  try {
    const { firstName, lastName, email, userId, imageUrl } = data;

    const existingUser = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const profile = await db.profile.create({
      data: {
        firstName: firstName ?? "Username",
        lastName: lastName ?? "",
        userId,
        email,
        imageUrl,
      },
    });

    return profile;
  } catch (error) {
    console.log(error);
  }
}

//checks for an existing user
export const currentProfile = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
