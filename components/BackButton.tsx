import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const BackButton = () => {
  return (
    <Link href="/" className="absolute top-4 left-4">
      <Button className="group" variant="ghost">
        <ChevronLeft className="group-hover:-translate-x-1 transition-all" />
        Back
      </Button>
    </Link>
  );
};

export default BackButton;
