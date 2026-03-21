import { openai } from "../llm/openaiClient";

export async function supervisorAgent(results: string[]) {
  const prompt = `
  Combine and refine the following results into a final answer:

  ${results.join("\n")}
  `;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return res.choices[0].message.content;
}
