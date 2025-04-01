import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import RecentActivity from "@/components/dashboard/recent-activity"
import CampaignOverview from "@/components/dashboard/campaign-overview"
import ReferralStats from "@/components/dashboard/referral-stats"

export default async function DashboardPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Fetch stats
  const { data: stats } = await supabase.from("user_stats").select("*").eq("user_id", session.user.id).single()

  // Fetch recent activity
  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch campaigns
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch referrals
  const { data: referrals } = await supabase
    .from("referrals")
    .select("*")
    .eq("referrer_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardStats
          stats={{
            totalSales: stats?.total_sales || 0,
            totalRevenue: stats?.total_revenue || 0,
            activeCampaigns: stats?.active_campaigns || 0,
            conversionRate: stats?.conversion_rate || 0,
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <RecentActivity activities={activities || []} />
        </div>
        <div>
          <ReferralStats
            referrals={{
              total: referrals?.length || 0,
              successful: referrals?.filter((r) => r.status === "completed")?.length || 0,
              pending: referrals?.filter((r) => r.status === "pending")?.length || 0,
              coins: profile?.coins || 0,
              referralCode: profile?.referral_code || "",
            }}
          />
        </div>
      </div>

      <div className="mb-8">
        <CampaignOverview campaigns={campaigns || []} />
      </div>
    </div>
  )
}

