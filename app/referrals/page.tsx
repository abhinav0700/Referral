import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import ReferralDashboard from "@/components/referrals/referral-dashboard"

export default async function ReferralsPage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Fetch referrals
  const { data: referrals } = await supabase
    .from("referrals")
    .select(`
      *,
      referred_user:profiles!referred_user_id(name, email)
    `)
    .eq("referrer_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Referral Program</h1>

      <ReferralDashboard profile={profile || {}} referrals={referrals || []} />
    </div>
  )
}

