"use client"

import { Copy, Users, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface ReferralStatsProps {
  referrals: {
    total: number
    successful: number
    pending: number
    coins: number
    referralCode: string
  }
}

export default function ReferralStats({ referrals }: ReferralStatsProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyReferralLink = async () => {
    const link = `${window.location.origin}/register?ref=${referrals.referralCode}`
    
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
      
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Referral Program
        </CardTitle>
        <CardDescription>Share and earn rewards</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Total Referrals</p>
            <p className="text-2xl font-bold">{referrals.total}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Successful</p>
            <p className="text-2xl font-bold">{referrals.successful}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Pending</p>
            <p className="text-2xl font-bold">{referrals.pending}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Coins Earned</p>
            <p className="text-2xl font-bold">{referrals.coins}</p>
          </div>
        </div>
        <div className="rounded-md bg-muted p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Your Referral Code:</p>
            <p className="font-mono text-sm font-bold">{referrals.referralCode}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={copyReferralLink}
          variant={copied ? "secondary" : "default"}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Referral Link
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

