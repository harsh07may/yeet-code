import React from "react";
import { cn } from "@/lib/utils";

export default function Paragraph({
  children,
  className,
  ...rest
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
}> &
  React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...rest}
    >
      {children}
    </p>
  );
}
