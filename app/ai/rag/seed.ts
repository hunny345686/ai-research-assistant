import { createEmbeddings } from "./embedding";
import { addDoc } from "./vectorStore";

export async function seedDocs() {
  const docs = [
    "React is a JavaScript library for building UI Hello",
    "Angular is a full-fledged frontend framework",
    "React uses hooks for state management",
  ];

  for (const text of docs) {
    const embedding = await createEmbeddings(text);
    addDoc({ text, embedding });
  }
}
