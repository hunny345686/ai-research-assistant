// import { genrateResponce } from "@/app/ai/llm/generate";
// import { genrateStream } from "@/app/ai/llm/generateStream";
import { runAgents } from "@/app/ai/agents/orchestrator";
import { generateWithTools } from "@/app/ai/llm/generateWithTools";
import { ChatMemory } from "@/app/ai/memory/chatMemory";
import { SYSTEM_PROMPT } from "@/app/ai/prompt/systemPrompt";
import { generateRAG } from "@/app/ai/rag/generateRAG";
import { NextRequest } from "next/server";

const memory = new ChatMemory();

memory.addMessage({
  role: "assistant",
  content: SYSTEM_PROMPT,
});
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  memory.addMessage({
    role: "user",
    content: message,
  });
  // const responce = await genrateResponce(memory.getMessage());
  // const stream = await genrateStream(memory.getMessage());
  // const stream = await genrateStream(memory.getMessage());

  // const response = await generateWithTools(memory.getMessage());
  // const response = await runAgents(message);
  const response = await generateRAG(message);

  // const encoder = new TextEncoder();

  // const readableStream = new ReadableStream({
  //   async start(controller) {
  //     let fullResponce: string = "";

  //     for await (const chunk of stream) {
  //       const token = chunk.choices[0]?.delta.content || "";
  //       fullResponce += token;
  //       controller.enqueue(encoder.encode(token));
  //     }
  //     memory.addMessage({
  //       role: "assistant",
  //       content: fullResponce || "",
  //     });
  //     controller.close();
  //   },
  // });

  return new Response(response);
}
