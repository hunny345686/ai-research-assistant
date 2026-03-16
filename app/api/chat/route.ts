import { genrateResponce } from "@/app/ai/llm/generate";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const responce = await genrateResponce(message);
  return Response.json({
    answer: responce,
  });
}
