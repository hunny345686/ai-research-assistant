import { logger } from "@/app/lib/logger";
import { Messages } from "../memory/chatMemory";
import { tools } from "../tools/definitions";
import { runTool } from "../tools/router";
import { openai } from "./openaiClient";

export async function generateWithTools(message: Messages[]) {
  const responce = await openai.chat.completions.create({
    model: "gpt-4",
    messages: message,
    tools,
    tool_choice: "auto",
  });

  const usage = responce.usage;

  logger.info(
    {
      promptTokens: usage?.prompt_tokens,
      completionTokens: usage?.completion_tokens,
      totalTokens: usage?.total_tokens,
    },
    "Token usage"
  );

  const msg = responce.choices[0].message;
  if (msg.tool_calls?.length) {
    const toolCall = msg.tool_calls[0];

    if (toolCall.type === "function") {
      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);
      const result = await runTool(toolName, toolArgs);

      const secRes = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          ...message,
          msg,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          },
        ],
      });
      return secRes.choices[0].message.content;
    }
  }
  return msg.content;
}
