import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import RegisterForm from "@/components/auth/register-form"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  // Get the referral code from the URL if it exists
  const referralCode = searchParams.ref as string | undefined
  const plan = searchParams.plan as string | undefined

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
        </div>
        <RegisterForm referralCode={referralCode} plan={plan} />
      </div>
    </div>
  )
}

