import { Button } from "@/components/ui/button";
import Link from "next/link";
import { io } from "socket.io-client";
import TestComponent from "./problems/_testComponents/TestComponent";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <section id="problems-table">
          <Button asChild>
            <Link href={"/problems"}>Problems</Link>
          </Button>
          <TestComponent />
        </section>
      </div>
    </main>
  );
}
