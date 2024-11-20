import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, Loader, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full flex h-14 px-4 py-10 border-b">
      <nav className="w-full max-w-6xl flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-sempione font-semibold text-2xl"
        >
          <span>easyreview</span>
          <Sparkles className="size-4" />
        </Link>

        {/* Clerk Stuff */}
        <div>
          <ClerkLoading>
            <div className="p-4 flex items-center justify-center">
              <Loader className="size-4 text-black animate-spin transition-all" />
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <div className="flex gap-4 items-center">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
                <Link href="/dashboard" className="group">
                  <Button variant="ghost">
                    Enter
                    <ChevronRight className="size-5 sm:group-hover:translate-x-[2px] transition-all mt-[2.5px]" />
                  </Button>
                </Link>
              </div>
            </SignedIn>

            {/* Log in buttons */}
            <div className="flex gap-4">
              <SignedOut>
                <Link href="/sign-in">
                  <Button>Login</Button>
                </Link>

                <Link href="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </SignedOut>
            </div>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  );
};

export default Header;
