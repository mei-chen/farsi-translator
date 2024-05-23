import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: NextRequest) {
    const req = await request.json()
    const text = req.text
    const language = req.language
    var write_stream = ""
    var write_farsi = ""
    if (language === "English") {
        const stream = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        stream: true,
        messages: [{role: "system", content: "translate this to Farsi in phonetics. Only state the phonetics, without any quotations added."}
            ,{role: 'user', content: text }],});
        
        
        for await (const chunk of stream) {
            write_stream += chunk.choices[0]?.delta?.content || ''
        }
        
        const farsi = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            stream: true,
            messages: [{role: "system", content: "translate this to Farsi. Only state the farsi, without any quotations added."}
                ,{role: 'user', content: write_stream }],});
        
        for await (const chunk of farsi) {
            write_farsi += chunk.choices[0]?.delta?.content || ''
        }
    }
    else {
        const stream = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            stream: true,
            messages: [{role: "system", content: "Help me translate the Farsi phonetics to english. Only state the english meaning."}
                ,{role: 'user', content: text }],});

        for await (const chunk of stream) {
            write_stream += chunk.choices[0]?.delta?.content || ''
        }
    }

      return NextResponse.json({write_stream, write_farsi})
}