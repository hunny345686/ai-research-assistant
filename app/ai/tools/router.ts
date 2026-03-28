import { logger } from "@/app/lib/logger";
import { getWeather } from "./handlers";

export const toolMap: Record<string, any> = {
  getWeather,
};

export async function runTool(name: string, args: any) {
  const start = Date.now();

  try {
    const tools = await toolMap[name];

    logger.info(
      {
        tool: name,
        args,
        tools,
        latency: Date.now() - start,
      },
      "Tool execution"
    );
    if (!tools) {
      throw new Error("Tool not found");
    }
    return tools(args);
  } catch (error) {
    logger.error(
      {
        tool: name,
        args,
        error,
      },
      "Tool failed"
    );

    throw error;
  }
}
