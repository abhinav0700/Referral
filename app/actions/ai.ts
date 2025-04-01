"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function generateAIResponse(prompt: string, systemPrompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent([systemPrompt, prompt])
    const response = await result.response
    const text = response.text()
    return { text }
  } catch (error) {
    console.error("Error generating AI response:", error)
    throw error
  }
} 