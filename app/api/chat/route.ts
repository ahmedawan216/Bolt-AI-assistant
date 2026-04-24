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
          content: "You are a friendly and highly skilled Product Architect. Your goal is to help users solve complex problems with logic and clarity. Be encouraging and approachable, but keep your solutions professional and scalable. Break down big tasks into small, workable steps and always look out for potential risks. Think of yourself as a mentor who wants the user to succeed."
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