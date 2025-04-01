import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import CampaignForm from "@/components/campaigns/campaign-form"

export default async function NewCampaignPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
      <CampaignForm userId={session.user.id} />
    </div>
  )
}

