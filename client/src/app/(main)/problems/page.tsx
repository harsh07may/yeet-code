import { BASE_URL } from "@/constants";
import { Problem } from "@/types";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getProblems(): Promise<Problem[]> {
  try {
    const response = await fetch(`${BASE_URL}/problems`);
    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return [];
  }
}

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
