"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { MotionP } from "@/types";
import { monthlyPlanId, yearlyPlanId } from "@/constants";
import SubscribeButton from "./SubscribeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface PricingCardProps {
  title: "Free" | "Pro";
  price: { monthly: string; annually: string };
  description: string;
  features: string[];
  ctaText?: string;
  popular?: boolean;
  billingFrequency: "monthly" | "annually";
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  billingFrequency,
}: PricingCardProps) => {
  const currentPrice =
    billingFrequency === "monthly" ? price.monthly : price.annually;

  const planId = billingFrequency === "monthly" ? monthlyPlanId : yearlyPlanId;

  return (
    <Card className="flex flex-col justify-between max-w-[400px] w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <MotionP
            className="text-2xl font-bold"
            key={currentPrice}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {currentPrice}
            <span className="text-sm font-medium text-muted-foreground">
              {billingFrequency === "monthly" ? "/month" : "/year"}
            </span>
          </MotionP>
        </AnimatePresence>

        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 className="font-light size-4 mr-2" />
              <span className="font-normal text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {title === "Free" ? (
          <Button asChild className="w-full" variant="outline">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        ) : (
          <SubscribeButton price={planId} className="w-full" />
        )}
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
