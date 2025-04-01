"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface CampaignFormProps {
  userId: string
  campaign?: any
}

export default function CampaignForm({ userId, campaign }: CampaignFormProps) {
  const [name, setName] = useState(campaign?.name || "")
  const [description, setDescription] = useState(campaign?.description || "")
  const [status, setStatus] = useState(campaign?.status || "draft")
  const [target, setTarget] = useState(campaign?.target?.toString() || "100")
  const [startDate, setStartDate] = useState<Date | undefined>(
    campaign?.start_date ? new Date(campaign.start_date) : new Date(),
  )
  const [endDate, setEndDate] = useState<Date | undefined>(campaign?.end_date ? new Date(campaign.end_date) : undefined)
  const [isLoading, setIsLoading] = useState(false)

  const { supabase } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()

  const isEditing = !!campaign

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !description || !startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const campaignData = {
        user_id: userId,
        name,
        description,
        status,
        target: Number.parseInt(target),
        current: campaign?.current || 0,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      }

      if (isEditing) {
        // Update existing campaign
        const { error } = await supabase.from("campaigns").update(campaignData).eq("id", campaign.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Campaign updated successfully",
        })
      } else {
        // Create new campaign
        const { error } = await supabase.from("campaigns").insert(campaignData)

        if (error) throw error

        toast({
          title: "Success",
          description: "Campaign created successfully",
        })
      }

      // Add activity record
      await supabase.from("activities").insert({
        user_id: userId,
        type: isEditing ? "campaign_update" : "campaign_create",
        description: isEditing ? `Updated campaign: ${name}` : `Created new campaign: ${name}`,
      })

      router.refresh()
      router.push("/campaigns")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Campaign" : "Create Campaign"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your campaign details" : "Fill in the details to create a new marketing campaign"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer Sale 2023"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your campaign goals and strategy"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Conversions</Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isEditing ? "Update Campaign" : "Create Campaign"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

