"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileInfoProps {
  profile: Profile
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const { toast } = useToast()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your personal information and account details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://avatar.vercel.sh/${profile.email}`} alt={profile.name} />
            <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Referral Code</Label>
            <div className="flex items-center gap-2 mt-1">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {profile.referral_code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => {
                  navigator.clipboard.writeText(profile.referral_code)
                  toast({
                    title: "Copied!",
                    description: "Referral code copied to clipboard",
                  })
                }}
              >
                Copy
              </Button>
            </div>
          </div>
          <div>
            <Label>Coins</Label>
            <p className="text-2xl font-bold mt-1">{profile.coins}</p>
          </div>
          <div>
            <Label>Member Since</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 