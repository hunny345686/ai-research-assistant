import { openai } from "../llm/openaiClient";

export async function evaluateAnswer(answer: string, context: string) {
  const prompt = `
  Context:
  ${context}

  Answer:
  ${answer}

  Is the answer fully supported by the context?
  Reply YES or NO.
  `;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}
