import { createOpenAI, openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { env } from "~/env/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
