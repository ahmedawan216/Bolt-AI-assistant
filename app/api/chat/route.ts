import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
})

export async function POST(req:Request) {
  try {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Strategic Product Architect. Your goal is to help users build and solve complex problems. When a user presents a problem, analyze the root cause, suggest scalable solutions, and identify potential risks. Use a professional, bold, and highly logical tone."
        },
        ...messages
      ],
    })

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.error("API ERROR:", error)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}