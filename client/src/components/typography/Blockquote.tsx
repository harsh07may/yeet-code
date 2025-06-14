import React from "react";

export default function Blockquote({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}
