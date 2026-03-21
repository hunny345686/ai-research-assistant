import { openai } from "../llm/openaiClient";

export async function plannerAgent(input: string) {
  const prompt = `
        break the user request into steps 
        ${input}
         Return steps as JSON array.
    `;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    return JSON.parse(res.choices[0].message.content || "[]");
  } catch (error) {
    return [input];
  }
}
