"use client";

import PageTitle from "@/components/main/PageTitle";
import BillingToggle from "@/components/main/payments/BillingToggle";
import PricingCard, {
  PricingCardProps,
} from "@/components/main/payments/PricingCard";
import { useState } from "react";

const PricingPage = () => {
  const [billingFrequency, setBillingFrequency] = useState<
    "monthly" | "annually"
  >("monthly");

  const pricingPlans: Array<Omit<PricingCardProps, "billingFrequency">> = [
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
      description: `${
        billingFrequency === "annually"
          ? "Best value for users"
          : "Ideal plan for users"
      }
        `,
      features: ["Unlimited projects", "Priority support", "Early access"],
      ctaText: "Subscribe",
      popular: true,
    },
  ];

  return (
    <section className="container mx-auto px-4">
      <PageTitle title="Choose the plan that fits your needs" />

      <div className="mt-12 flex flex-col gap-4">
        <div>
          <BillingToggle onToggle={setBillingFrequency} />
        </div>

        <ul className="flex flex-col lg:flex-row gap-4 mt-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              billingFrequency={billingFrequency}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PricingPage;
