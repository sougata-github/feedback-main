"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const ManageSubscription = () => {
  const router = useRouter();

  const [loading, setloading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>("");

  const redirectToCustomerPortal = async () => {
    setloading(true);
    try {
      const { url } = await fetch("/api/stripe/change-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          setError(error.toString());
          toast.error("Couldn't checkout!");
        });

      router.push(url.url);
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

  return (
    <Button
      onClick={redirectToCustomerPortal}
      disabled={loading}
      className="w-24 mt-4"
    >
      {loading ? (
        <Loader className="size-4 animate-spin transition-all" />
      ) : (
        "Change Plan"
      )}
    </Button>
  );
};

export default ManageSubscription;
