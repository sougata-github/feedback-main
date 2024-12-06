"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";

export function UserButton() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-full justify-start px-2 py-8 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-black/20"
        >
          <div className="flex gap-2 items-center justify-start">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
              <AvatarFallback>{user.username?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="text-black font-semibold text-sm">
                {user.firstName}
              </span>
              <span className="text-[10px] text-black/60 max-w-[200px] truncate">
                {user.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>

          <span className="ml-2 flex-grow text-left text-sm">
            {user.username}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" forceMount align="end" side="right">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {user.publicMetadata.plan === "pro" ? (
            <span className="text-sm">Pro Account</span>
          ) : (
            <Link
              href="/dashboard"
              className="flex w-full items-center text-sm"
            >
              Free Account - Upgrade to Pro
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut();
          }}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
