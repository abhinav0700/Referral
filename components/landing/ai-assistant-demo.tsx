"use client"

import { useState } from "react"
import { Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AiAssistantDemo() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AI business assistant. Ask me anything about marketing, sales, or business growth.",
    },
  ])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you analyze your sales data to identify growth opportunities.",
        "Your referral program can be optimized by targeting your most engaged customers first.",
        "Based on industry benchmarks, your conversion rate is above average. Great job!",
        "I recommend focusing on email campaigns for the highest ROI based on your current metrics.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
    }, 1000)

    setInput("")
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Meet Your AI Business Assistant</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Get insights, recommendations, and answers to your business questions.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Try out our AI assistant with a quick demo</CardDescription>
            </CardHeader>
            <CardContent className="p-4 h-[300px] overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Ask something about your business..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

