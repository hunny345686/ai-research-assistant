import { getWeather } from "./handlers";

export const toolMap: Record<string, any> = {
  getWeather,
};

export async function runTool(name: string, args: any) {
  const tool = toolMap[name];

  if (!tool) {
    throw new Error("Tool not found");
  }

  return await tool(args);
}
