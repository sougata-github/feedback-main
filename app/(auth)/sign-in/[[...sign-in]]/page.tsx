import BackButton from "@/components/BackButton";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <BackButton />
      <div className="h-screen w-screen flex items-center justify-center">
        <SignIn />
      </div>
    </>
  );
}
