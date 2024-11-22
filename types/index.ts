import { Project, Feedback } from "@prisma/client";

export type userData = {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  userId: string;
  id?: string;
};

export type ProjectData = {
  name: string;
  url: string;
  description: string;
  authorId: string;
};

export type ProjectWithFeedbacks = Project & {
  feedbacks: Feedback[];
};
