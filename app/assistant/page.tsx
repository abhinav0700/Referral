import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import AiAssistant from "@/components/assistant/ai-assistant"

export default async function AssistantPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">AI Business Assistant</h1>
      <AiAssistant profile={profile} />
    </div>
  )
}

