import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { resolveApiUser } from "@/lib/apiAuth";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const userId = await resolveApiUser(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pageText } = await request.json();

  if (!pageText) {
    return NextResponse.json({ error: "pageText is required" }, { status: 400 });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          'You extract job application details from job posting text. ' +
          'Return ONLY valid JSON with these exact fields: ' +
          '{ "company": "", "role": "", "salary": "", "url": "", "notes": "" }. ' +
          'Use an empty string if a field is not found. ' +
          'For notes, include a brief summary of key requirements or benefits.',
      },
      {
        role: "user",
        content: pageText.slice(0, 8000),
      },
    ],
  });

  const raw = completion.choices[0].message.content ?? "{}";

  let extracted: Record<string, string>;
  try {
    extracted = JSON.parse(raw);
  } catch {
    extracted = { company: "", role: "", salary: "", url: "", notes: "" };
  }

  return NextResponse.json(extracted);
}
