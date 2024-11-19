"use server";

import { z } from "zod";
import { currentProfile } from "./../lib/user";
import { newProjectSchema } from "@/schemas/newProjectSchema";
import { db } from "@/lib/db";

export async function createProject(data: z.infer<typeof newProjectSchema>) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return { error: "Unauthorized! Failed to create project." };
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
