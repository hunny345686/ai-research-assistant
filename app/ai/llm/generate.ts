import { openai } from "./openaiClient";

export async function genrateResponce(userInput: string) {
  const responce = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userInput }],
  });

  return responce.choices[0].message.content;
}
