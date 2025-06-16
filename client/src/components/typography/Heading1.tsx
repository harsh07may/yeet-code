import React from "react";

export default function Heading1({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}
