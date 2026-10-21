import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { ATTENDANT_SYSTEM_PROMPT } from "@/lib/attendant";

// Limita o histórico enviado ao modelo para controlar custo e tamanho do contexto
const MAX_HISTORY = 20;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google(process.env.GEMINI_MODEL ?? "gemini-3.8-flash"),
    system: ATTENDANT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages.slice(-MAX_HISTORY)),
    maxOutputTokens: 800,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
