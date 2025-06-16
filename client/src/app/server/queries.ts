import { BASE_URL } from "@/constants";
import { Problem } from "@/types";

export async function getProblems(): Promise<Problem[]> {
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

export async function getProblemById(id: number): Promise<Problem | null> {
  try {
    const response = await fetch(`${BASE_URL}/problems/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return null;
  }
}