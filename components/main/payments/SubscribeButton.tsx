"use client";

import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe-client";
import { Loader } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  price: string;
}

const SubscribeButton = ({ price }: Props) => {
  // const router = useRouter();
  const [loading, setloading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>("");

  const handleCheckout = async (price: string) => {
    setloading(true);
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .catch((error) => {
          setError(error.toString());
          toast.error("Couldn't checkout!");
        });

      const stripe = await getStripe();

      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      setError(error?.toString());
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  if (error) {
    console.log(error);
  }

  console.log(price);

  return (
    <Button
      onClick={() => handleCheckout(price)}
      disabled={loading}
      className="w-24 mt-4"
    >
      {loading ? (
        <Loader className="size-4 animate-spin transition-all" />
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeButton;
