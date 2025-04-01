import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"
import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import CampaignList from "@/components/campaigns/campaign-list"

export default async function CampaignsPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch campaigns
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <CampaignList campaigns={campaigns || []} />
    </div>
  )
}

