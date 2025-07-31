import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI that suggests short anonymous questions separated by ||." },
        { role: "user", content: prompt || "Suggest 3 short anonymous questions" }
      ],
    });

    const text = completion.choices[0].message.content;
    return new Response(text);
  } catch (error: any) {
    console.error(error);

    // handle 429 specifically
    if (error.status === 429 || error.code === 'insufficient_quota') {
      return new Response("You have exceeded your OpenAI quota. Please check your plan or billing.", { status: 429 });
    }

    return new Response("Failed to generate suggestions", { status: 500 });
  }
}
