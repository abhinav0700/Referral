"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSupabase } from "@/components/providers/supabase-provider"

export default function Navbar() {
  const pathname = usePathname()
  const { session } = useSupabase()

  const isLoggedIn = !!session
  const isHomePage = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">BusinessDash</span>
          </Link>
          {isHomePage && !isLoggedIn && (
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </nav>
          )}
          {isLoggedIn && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className={`${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Dashboard
              </Link>
              <Link
                href="/referrals"
                className={`${pathname === "/referrals" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Referrals
              </Link>
              <Link
                href="/campaigns"
                className={`${pathname === "/campaigns" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Campaigns
              </Link>
              <Link
                href="/assistant"
                className={`${pathname === "/assistant" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                AI Assistant
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          ) : (
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                My Profile
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

