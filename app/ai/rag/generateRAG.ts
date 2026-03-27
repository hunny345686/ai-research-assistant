import { openai } from "../llm/openaiClient";
import { search } from "./search";

export async function generateRAG(query: string) {
  const docs = await search(query);

  const context = docs.map((d) => d.text).join("\n");

  const prompt = `
  Answer using only the context below.

  Context:
  ${context}

  Question:
  ${query}
  `;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}
