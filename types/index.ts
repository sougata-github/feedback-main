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

import { motion, type MotionProps } from "framer-motion";

// Define types for different HTML elements with motion props
type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;
type MotionSpanProps = MotionProps & React.HTMLAttributes<HTMLSpanElement>;
type MotionH2Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement>;
type MotionPProps = MotionProps & React.HTMLAttributes<HTMLParagraphElement>;
type MotionAProps = MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type MotionNProps = MotionProps & React.AnchorHTMLAttributes<HTMLElement>;

// Export typed motion components
export const MotionDiv = motion.div as React.FC<MotionDivProps>;
export const MotionSpan = motion.span as React.FC<MotionSpanProps>;
export const MotionH2 = motion.h2 as React.FC<MotionH2Props>;
export const MotionP = motion.p as React.FC<MotionPProps>;
export const MotionA = motion.a as React.FC<MotionAProps>;
export const MotionN = motion.nav as React.FC<MotionNProps>;
