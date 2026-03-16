import { genrateResponce } from "@/app/ai/llm/generate";
import { ChatMemory } from "@/app/ai/memory/chatMemory";
import { SYSTEM_PROMPT } from "@/app/ai/prompt/systemPrompt";
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
  const responce = await genrateResponce(message);

  memory.addMessage({
    role: "assistant",
    content: responce || "",
  });
  return Response.json({
    answer: responce,
  });
}
