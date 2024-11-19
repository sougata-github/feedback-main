"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight, Loader } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isProtected =
    pathname.startsWith("/projects") || pathname.startsWith("/dashboard");

  return (
    <header className="w-full flex h-14 px-4 py-10 border-b">
      <nav className="w-full max-w-6xl flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="flex gap-2 items-center justify-center">
          <h1 className="font-lato text-2xl font-black">Easy</h1>{" "}
          <div className="-ml-1 px-2 py-1 bg-black rounded text-2xl text-white font-black font-lato">
            <span>Review</span>
          </div>
        </div>

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
                {!isProtected && (
                  <Link href="/dashboard" className="group">
                    <Button variant="ghost">
                      Enter
                      <ChevronRight className="size-5 sm:group-hover:translate-x-[2px] transition-all mt-[2.5px]" />
                    </Button>
                  </Link>
                )}
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
