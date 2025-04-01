import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import ProfileInfo from "@/components/profile/profile-info"
import ProfileForm from "@/components/profile/profile-form"
import { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export default async function ProfilePage() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single()

  if (error || !profile) {
    console.error("Error fetching profile:", error)
    redirect("/register")
  }

  const userProfile = profile as Profile

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileInfo profile={userProfile} />
        <ProfileForm profile={userProfile} />
      </div>
    </div>
  )
} 