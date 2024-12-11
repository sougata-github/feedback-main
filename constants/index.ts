import { PricingCardProps } from "@/components/main/payments/PricingCard";

export const monthlyPlanId: string = "price_1QRZsISGpg56W8AnXm6M3Dlx";
export const yearlyPlanId: string = "price_1QRZtASGpg56W8AnpBTQpuKl";

export const getPricingPlans = (billingFrequency: "monthly" | "annually") => {
  return [
    {
      title: "Free",
      price: { monthly: "$0", annually: "$0" },
      description: "Perfect for getting started",
      features: ["1 project", "Basic support", "Limited storage"],
      ctaText: "Get Started",
    },
    {
      title: "Pro",
      price: { monthly: "$4.99", annually: "$39.99" },
      description:
        billingFrequency === "annually"
          ? "Best value for users"
          : "Ideal plan for users",
      features: ["Unlimited projects", "Priority support", "Early access"],
      ctaText: "Subscribe",
      popular: true,
    },
  ] as Array<Omit<PricingCardProps, "billingFrequency">>;
};

export const numberOfFreeProjects = 3;
