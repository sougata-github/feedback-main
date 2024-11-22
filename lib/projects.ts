import { db } from "./db";
import { currentProfile } from "./user";

export async function getProject(id: string) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      throw new Error("Unauthorized!");
    }

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
  try {
    const profile = await currentProfile();

    if (!profile) {
      throw new Error("Unauthorized!");
    }

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
