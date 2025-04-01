import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import PricingSection from "@/components/landing/pricing-section"
import AiAssistantDemo from "@/components/landing/ai-assistant-demo"

export default async function Home() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AiAssistantDemo />
        <PricingSection />
      </main>
    </div>
  )
}

