import { createEmbeddings } from "./embedding";
import { getAllDocs } from "./vectorStore";

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
}

export async function search(query: string) {
  const queryEmbedding = await createEmbeddings(query);

  const docs = getAllDocs();

  const scored = docs.map((doc) => ({
    ...doc,
    score: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3); // top 3
}
