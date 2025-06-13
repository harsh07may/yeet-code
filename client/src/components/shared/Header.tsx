import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SparklesIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">YeetCode</span>
          <span className="rounded-md bg-yellow-300 px-1.5 py-0.5 text-xs font-medium text-yellow-900 dark:bg-yellow-600 dark:text-yellow-50">
            BETA
          </span>
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
5;
