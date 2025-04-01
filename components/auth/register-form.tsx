"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface RegisterFormProps {
  referralCode?: string;
  plan?: string;
}

export default function RegisterForm({ referralCode, plan }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            referral_code: referralCode,
            plan: plan || "starter",
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // Generate a referral code for the new user
        const newReferralCode = generateReferralCode();

        // Create a profile record
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              name,
              email,
              referral_code: newReferralCode,
              coins: 0,
              referred_by: referralCode,
            },
          ])
          .select();

        if (profileError) {
          throw profileError;
        }

        // If the user signed up with a referral code, validate and update coins
        if (referralCode) {
          const { data: referrerProfile, error: referrerError } = await supabase
            .from("profiles")
            .select("id, coins")
            .eq("referral_code", referralCode)
            .single();

          if (referrerError || !referrerProfile) {
            console.error("Invalid referral code:", referrerError);
            toast({
              title: "Warning",
              description: "Referral code is invalid. You can still continue.",
              variant: "destructive",
            });
          } else {
            // Update coins for both referrer and new user
            const { error: updateReferrerError } = await supabase
              .from("profiles")
              .update({ coins: referrerProfile.coins + 50 })
              .eq("id", referrerProfile.id);

            const { error: updateUserError } = await supabase
              .from("profiles")
              .update({ coins: 25 })
              .eq("id", authData.user.id);

            if (updateReferrerError || updateUserError) {
              console.error("Error updating coins:", updateReferrerError, updateUserError);
            } else {
              // Insert into referrals table
              const { error: referralInsertError } = await supabase.from("referrals").insert([
                {
                  referrer_id: referrerProfile.id,
                  referred_user_id: authData.user.id,
                  status: "completed",
                },
              ]);

              if (referralInsertError) {
                console.error("Error inserting referral:", referralInsertError);
              }
            }
          }
        }

        toast({
          title: "Success",
          description: "Your account has been created successfully.",
        });

        router.refresh();
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a random referral code
  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleRegister}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </form>
      {referralCode && (
        <div className="rounded-md bg-muted p-3 text-sm">
          You were referred by a friend! You'll both receive bonus coins when you sign up.
        </div>
      )}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
