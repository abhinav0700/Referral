import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReferralStatsProps {
  referrals: any[]
}

export default function ReferralStats({ referrals }: ReferralStatsProps) {
  // Calculate monthly stats
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const thisMonthReferrals = referrals.filter((referral) => {
    const date = new Date(referral.created_at)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const completedThisMonth = thisMonthReferrals.filter((r) => r.status === "completed").length

  // Calculate conversion rate
  const conversionRate =
    referrals.length > 0
      ? Math.round((referrals.filter((r) => r.status === "completed").length / referrals.length) * 100)
      : 0

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Your referral activity this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">{thisMonthReferrals.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{completedThisMonth}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">{conversionRate}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Coins Earned</p>
              <p className="text-2xl font-bold">{completedThisMonth * 50}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Success</CardTitle>
          <CardDescription>How to maximize your referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-primary-foreground text-xs">
                1
              </span>
              <span>Share your referral link on social media platforms</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-primary-foreground text-xs">
                2
              </span>
              <span>Send personalized emails to colleagues and friends</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-primary-foreground text-xs">
                3
              </span>
              <span>Explain the benefits they'll get when signing up</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-primary-foreground text-xs">
                4
              </span>
              <span>Follow up with people who showed interest</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

