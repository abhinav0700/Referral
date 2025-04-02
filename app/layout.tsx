import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import SupabaseProvider from "@/components/providers/supabase-provider"
import { createServerClient } from "@/lib/supabase-server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Referral Abhinav",
  description: "A comprehensive business dashboard with referral program and AI assistant",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Environment Configuration Error</h1>
            <p>
              Missing required environment variables. Please make sure NEXT_PUBLIC_SUPABASE_URL and
              NEXT_PUBLIC_SUPABASE_ANON_KEY are properly configured.
            </p>
          </div>
        </body>
      </html>
    )
  }

  // Get the session on the server
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SupabaseProvider session={session}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}