import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ Missing OPENAI_API_KEY in environment variables");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResume(prompt: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4o" if you want more advanced output
      messages: [
        { role: "system", content: "You are a professional resume builder." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message?.content || "⚠️ No content generated.";
  } catch (error: any) {
    console.error("❌ Error generating resume:", error);
    return "Error: Failed to generate resume.";
  }
}
