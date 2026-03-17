import { Messages } from "../memory/chatMemory";
import { openai } from "./openaiClient";

export async function genrateStream(messages: Messages[]) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    stream: true,
  });

  return stream;
}
