import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Campaign {
  id: string
  user_id: string
  name: string
  description: string
  status: string
  target: number
  current: number
  start_date: string
  end_date: string
}

interface CampaignOverviewProps {
  campaigns: Campaign[]
}

export default function CampaignOverview({ campaigns }: CampaignOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>Track your marketing campaigns</CardDescription>
        </div>
        <Link href="/campaigns/new">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground mb-4">No campaigns yet</p>
            <Link href="/campaigns/new">
              <Button>Create your first campaign</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{campaign.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      campaign.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{Math.round((campaign.current / campaign.target) * 100)}%</span>
                  </div>
                  <Progress value={(campaign.current / campaign.target) * 100} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href="/campaigns" className="w-full">
          <Button variant="outline" className="w-full">
            View All Campaigns
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

