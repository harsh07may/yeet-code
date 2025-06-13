import Header from "@/components/shared/Header";
import React, { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default MainLayout;
