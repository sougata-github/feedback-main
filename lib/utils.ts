import { Plan } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PLAN_MAP: Record<string, Plan> = {
  price_1QRZsISGpg56W8AnXm6M3Dlx: Plan.MONTHLY,
  price_1QRZtASGpg56W8AnpBTQpuKl: Plan.YEARLY,
};
