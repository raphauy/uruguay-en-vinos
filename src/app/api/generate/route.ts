import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY || "",
	apiKey: process.env.GROQ_API_KEY!,
	baseURL: "https://api.groq.com/openai/v1",
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      },
    );
  }

  let { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
		model: "mixtral-8x7b-32768",
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente de escritura de IA que continúa el texto existente basándose en el contexto del texto anterior. " +
          "Dar más peso/prioridad a los últimos caracteres que a los iniciales. " +
          "Limita tu respuesta a no más de 200 caracteres, pero asegúrese de construir oraciones completas.",
        // we're disabling markdown for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        // "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}