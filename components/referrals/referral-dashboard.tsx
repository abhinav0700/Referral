"use client"

import { useState } from "react"
import { Copy, Share2, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import ReferralList from "@/components/referrals/referral-list"
import ReferralStats from "@/components/referrals/referral-stats"

interface ReferralDashboardProps {
  profile: any
  referrals: any[]
}

export default function ReferralDashboard({ profile, referrals }: ReferralDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const copyReferralLink = async () => {
    const link = `${window.location.origin}/register?ref=${profile.referral_code}`
    
    try {
      // Try using the Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link)
      } else {
        // Fallback to the old method
        const textArea = document.createElement("textarea")
        textArea.value = link
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
    } catch (error) {
      console.error('Failed to copy:', error)
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  const shareReferralLink = async () => {
    const link = `${window.location.origin}/register?ref=${profile.referral_code}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join BusinessDash",
          text: "Sign up using my referral link and we both get rewards!",
          url: link,
        })
      } catch (error) {
        console.error("Error sharing:", error)
        copyReferralLink() // Fallback to copying if sharing fails
      }
    } else {
      copyReferralLink()
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Your Referral Program
          </CardTitle>
          <CardDescription>Invite friends and colleagues to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="mb-2 text-sm font-medium">Your Referral Code</div>
                <div className="flex items-center justify-between">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {profile.referral_code}
                  </code>
                  <Button variant="ghost" size="sm" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-md bg-muted p-4">
                <div className="mb-2 text-sm font-medium">Your Referral Link</div>
                <div className="flex items-center justify-between">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs truncate max-w-[200px]">
                    {`${typeof window !== "undefined" ? window.location.origin : ""}/register?ref=${profile.referral_code}`}
                  </code>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={copyReferralLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={shareReferralLink}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-muted p-4">
                <div className="mb-2 text-sm font-medium">Rewards</div>
                <p className="text-sm text-muted-foreground">
                  You earn <span className="font-bold">50 coins</span> for each successful referral. Your friend also
                  gets <span className="font-bold">25 coins</span> when they sign up.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium mb-4">Your Referral Stats</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Referrals</p>
                    <p className="text-2xl font-bold">{referrals.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Successful</p>
                    <p className="text-2xl font-bold">{referrals.filter((r) => r.status === "completed").length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{referrals.filter((r) => r.status === "pending").length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Coins Earned</p>
                    <p className="text-2xl font-bold">{profile.coins || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Your Referrals</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <ReferralStats referrals={referrals} />
        </TabsContent>
        <TabsContent value="referrals" className="mt-6">
          <ReferralList referrals={referrals} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

