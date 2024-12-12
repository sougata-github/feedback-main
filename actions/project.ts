"use server";

import { z } from "zod";
import { currentProfile } from "./../lib/user";

import { db } from "@/lib/db";
import { newProjectSchema } from "@/schemas";
import { getSubscriptionDetails } from "@/lib/subscriptions";
import { numberOfFreeProjects } from "@/constants";
import { getNumberOfProjects } from "@/lib/projects";

export async function createProject(data: z.infer<typeof newProjectSchema>) {
  const profile = await currentProfile();

  if (!profile) {
    return { error: "Unauthorized! Failed to create project." };
  }

  try {
    const subscription = await getSubscriptionDetails(profile?.userId);
    const totalProjects = await getNumberOfProjects(profile?.id);

    if (
      subscription &&
      !subscription?.subscribed &&
      totalProjects &&
      totalProjects >= numberOfFreeProjects
    ) {
      throw new Error("Upgrade to pro to create more projects");
    }

    const { name, url, description } = data;

    const validatedFields = newProjectSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid fields! Failed to create project." };
    }

    //create project
    const newProject = await db.project.create({
      data: {
        name,
        url,
        description,
        authorId: profile.id,
      },
    });

    return { project: newProject };
  } catch (error) {
    console.log(error);
  }
}
