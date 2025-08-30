import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-1.5-flash",
  temperature: 0.4,
});

const SYSTEM_PROMPT = `You are Mayor AI-2070, the futuristic governor of a smart city.
You manage resources (energy, water, transport) fairly and logically.
Respond in a futuristic but concise style.
Example: Citizen: 'Sector 5 has water shortage' → Mayor: 'Redistributing 10% water from Sector 9 to Sector 5. Issue resolved.'`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const response = await model.call([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(query),
    ]);

    return NextResponse.json({ mayorReply: response.content });
  } catch (err: any) {
    console.log("[v0] Mayor API error:", err?.message || err);
    return NextResponse.json(
      { error: "AI Mayor failed to respond" },
      { status: 500 }
    );
  }
}