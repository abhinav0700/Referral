"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/providers/supabase-provider"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AiAssistantProps {
  profile: any
}

export default function AiAssistant({ profile }: AiAssistantProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi ${profile?.name || "there"}! I'm your AI business assistant. How can I help you today?`,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "")
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      // Create system prompt
      const systemPrompt = `You are a helpful AI business assistant for a business dashboard application. 
      The user's name is ${profile?.name || "the user"}. 
      They have ${profile?.coins || 0} coins in their referral program.
      Provide helpful, concise advice about business growth, marketing, sales, and analytics.
      If asked about the referral program, explain that users earn 50 coins for each successful referral.`

      // Generate AI response
      const result = await model.generateContent([systemPrompt, userMessage])
      const response = await result.response
      const text = response.text()

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: text }])

      // Log the interaction
      await supabase.from("activities").insert({
        user_id: profile.id,
        type: "ai_interaction",
        description: "Used the AI assistant",
      })
    } catch (error) {
      console.error("Error generating AI response:", error)
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      })

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Business Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about business growth, marketing, sales, or get insights from your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] overflow-y-auto p-4 space-y-4 border rounded-md">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Input
            placeholder="Ask something about your business..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

