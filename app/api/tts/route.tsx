import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient, play } from "elevenlabs";

const eleven = new ElevenLabsClient({
    apiKey: process.env['ELEVENLABS_API_KEY'], // This is the default and can be omitted
  });

export async function POST(request: NextRequest) {
    const req = await request.json();
    const text = req.text;
    const audio = await eleven.generate({
    voice: "Rachel",
    text: text,
    model_id: "eleven_multilingual_v2",
    voice_settings: {
        "stability": 0.7,
        "similarity_boost": 0.2
    }});

    const chunks: Buffer[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
  
    const content = Buffer.concat(chunks);
    await play(audio);  // TODO: remove this line once you're able to figure out how to get the player working
    return NextResponse.json({buffer: content})
}