import React from "react";
import { cn } from "@/lib/utils"; // Assuming you use a utility for merging class names

type Heading1Props = {
  children?: React.ReactNode;
  className?: string;
  as?: any;
};

export default function Heading1({
  children,
  className,
  as: Tag = "h1",
}: Heading1Props) {
  return (
    <Tag
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {children}
    </Tag>
  );
}
