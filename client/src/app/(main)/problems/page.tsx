import { Button } from "@/components/ui/button";
import { PROBLEMS } from "@/constants";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Problems</h1>

        <section id="problems-table">
          <DataTable columns={columns} data={PROBLEMS} />
        </section>
      </div>
    </main>
  );
}
