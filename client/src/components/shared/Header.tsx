import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { ModeToggle } from "./ModeToggle";

// TODO: Add responsive mobile-nav

/**
 * Header component that displays the main navigation bar of the application.
 * Contains the YeetCode logo, premium subscription button, and user avatar.
 */
function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2 ">
          <span className="text-2xl font-bold tracking-tight">Yeetcode</span>
          <Badge
            variant="outline"
            className="bg-yellow-200 text-xs font-medium text-yellow-900 dark:bg-yellow-600 dark:text-yellow-50"
          >
            DEV
          </Badge>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 cursor-pointer"
          >
            <SparklesIcon className="h-4 w-4 group-hover " />
            <span>Get Plus</span>
          </Button>
          <ModeToggle />
          <Avatar className="h-10 w-10 border hover:shadow cursor-pointer">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>YC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;
