"use client";

import PageTitle from "@/components/main/PageTitle";
import BillingToggle from "@/components/main/payments/BillingToggle";
import PricingCard from "@/components/main/payments/PricingCard";
import { getPricingPlans } from "@/constants";
import { useState } from "react";

const PricingPage = () => {
  const [billingFrequency, setBillingFrequency] = useState<
    "monthly" | "annually"
  >("monthly");

  const pricingPlans = getPricingPlans(billingFrequency);

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
