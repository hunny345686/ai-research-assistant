import { openai } from "../llm/openaiClient";

export async function createEmbeddings(input: string) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: input,
  });

  return res.data[0].embedding;
}
