import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <section id="problems-table">
          <Link href={"/problems"}>Discover Problems</Link>
        </section>
      </div>
    </main>
  );
}
