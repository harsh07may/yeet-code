import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getProblems } from "@/app/server/queries";

export default async function ProblemsPage() {
  const data = await getProblems();

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Problems</h1>
        <section id="problems-table">
          <DataTable columns={columns} data={data} />
        </section>
      </div>
    </main>
  );
}
