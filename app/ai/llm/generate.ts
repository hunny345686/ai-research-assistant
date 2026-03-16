import { Messages } from "../memory/chatMemory";
import { openai } from "./openaiClient";

export async function genrateResponce(messages: Messages[]) {
  const responce = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return responce.choices[0].message.content;
}
