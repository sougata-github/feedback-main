"use client";

import { getPricingPlans } from "@/constants";
import { useState } from "react";
import BillingToggle from "./BillingToggle";
import PricingCard from "./PricingCard";

const Pricing = () => {
  const [billingFrequency, setBillingFrequency] = useState<
    "monthly" | "annually"
  >("monthly");

  const pricingPlans = getPricingPlans(billingFrequency);

  return (
    <div className="mt-12 flex flex-col gap-4">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold">Upgrade to Pro</h2>
        <p className="max-w-md sm:max-w-xl text-sm sm:text-base">
          Choose a monthly plan, or save extra by opting for a yearly plan.
        </p>
      </div>

      <div>
        <BillingToggle onToggle={setBillingFrequency} />
      </div>

      <ul className="flex flex-col sm:flex-row max-sm:gap-4 mt-4 gap-2">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            {...plan}
            billingFrequency={billingFrequency}
          />
        ))}
      </ul>
    </div>
  );
};

export default Pricing;
