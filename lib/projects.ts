"use server";

import { numberOfFreeProjects } from "@/constants";
import { db } from "./db";
import { getSubscriptionDetails } from "./subscriptions";
import { currentProfile } from "./user";

export async function getProject(id: string) {
  const profile = await currentProfile();

  if (!profile) {
    throw new Error("Unauthorized!");
  }

  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
      include: {
        feedbacks: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProjects() {
  const profile = await currentProfile();

  if (!profile) {
    throw new Error("Unauthorized!");
  }

  try {
    const project = await db.project.findMany({
      where: {
        authorId: profile.id,
      },
      include: {
        feedbacks: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  } catch (error) {
    console.log(error);
  }
}

export async function getNumberOfProjects(authorId: string) {
  try {
    const totalProjects = await db.project.count({
      where: {
        authorId,
      },
    });

    return totalProjects;
  } catch (error) {
    console.log(error);
  }
}

export async function canCreateMoreProjects(): Promise<boolean | void> {
  const profile = await currentProfile();

  if (!profile) {
    throw new Error("Unauthorized!");
  }

  try {
    const [subscription, totalProjects] = await Promise.all([
      getSubscriptionDetails(profile.id),
      getNumberOfProjects(profile.id),
    ]);

    if (subscription?.subscribed) {
      return true;
    }

    const canCreateFreeProjects =
      (!subscription || !subscription.subscribed) &&
      (totalProjects ?? 0) < numberOfFreeProjects;

    return canCreateFreeProjects;
  } catch (error) {
    console.error("Error in canCreateMoreProjects:", error);
    return false;
  }
}
