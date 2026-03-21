import { generateWithTools } from "../llm/generateWithTools";

export async function workerAgent(task: string) {
  const res = await generateWithTools([
    {
      role: "user",
      content: task,
    },
  ]);

  return res;
}
