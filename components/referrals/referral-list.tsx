import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ReferralListProps {
  referrals: any[]
}

export default function ReferralList({ referrals }: ReferralListProps) {
  if (referrals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>People you've invited to join</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">
              You haven't referred anyone yet. Share your referral link to get started!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referrals</CardTitle>
        <CardDescription>People you've invited to join</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-4 p-4 font-medium border-b">
            <div>User</div>
            <div>Status</div>
            <div>Date</div>
            <div>Reward</div>
          </div>
          {referrals.map((referral) => (
            <div key={referral.id} className="grid grid-cols-4 p-4 border-b last:border-0">
              <div>
                <div className="font-medium">{referral.referred_user?.name || "Unknown"}</div>
                <div className="text-sm text-muted-foreground">{referral.referred_user?.email || "Unknown"}</div>
              </div>
              <div>
                <Badge variant={referral.status === "completed" ? "default" : "outline"}>
                  {referral.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(referral.created_at), { addSuffix: true })}
              </div>
              <div>
                {referral.status === "completed" ? (
                  <span className="font-medium">50 coins</span>
                ) : (
                  <span className="text-sm text-muted-foreground">Pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

