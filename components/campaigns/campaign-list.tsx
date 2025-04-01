import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface CampaignListProps {
  campaigns: any[]
}

export default function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
          <CardDescription>Create and manage your marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground mb-4">You haven't created any campaigns yet</p>
            <Link href="/campaigns/new">
              <Button>Create your first campaign</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>{campaign.description}</CardDescription>
              </div>
              <Badge variant={campaign.status === "active" ? "default" : "outline"}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((campaign.current / campaign.target) * 100)}%</span>
                </div>
                <Progress value={(campaign.current / campaign.target) * 100} />
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="text-sm font-medium">{campaign.target}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-sm font-medium">{campaign.current}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium">{new Date(campaign.start_date).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="text-sm font-medium">{new Date(campaign.end_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Link href={`/campaigns/${campaign.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Link href={`/campaigns/${campaign.id}/edit`}>
                  <Button size="sm">Edit Campaign</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

