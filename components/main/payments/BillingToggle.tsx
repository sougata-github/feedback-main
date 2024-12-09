"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface BillingToggleProps {
  onToggle: (value: "monthly" | "annually") => void;
}

const BillingToggle = ({ onToggle }: BillingToggleProps) => {
  const [value, setValue] = useState<"monthly" | "annually">("monthly");

  const handleValueChange = (newValue: string) => {
    if (newValue === "monthly" || newValue === "annually") {
      setValue(newValue);
      onToggle(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={handleValueChange}
        id="billing-toggle"
      >
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="annually">Annually</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default BillingToggle;
