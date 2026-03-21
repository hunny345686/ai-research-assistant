import { plannerAgent } from "./planner";
import { supervisorAgent } from "./supervisor";
import { workerAgent } from "./worker";

export async function runAgents(input: string) {
  // Plan 1

  const tasks = await plannerAgent(input);

  console.log("Tasks ==> ", tasks);

  // 2. Execute tasks
  const results: string[] = [];

  for (const task of tasks) {
    const result = await workerAgent(task);
    results.push(result || "");
  }
  console.log("Results==> ", results);

  // 3. Combine

  const finalAns = await supervisorAgent(results);

  console.log("final ANS==> ", finalAns);

  return finalAns;
}
