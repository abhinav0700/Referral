import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that's right for your business.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-lg border p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-muted-foreground">Perfect for small businesses just getting started.</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $29<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {["Basic analytics", "Up to 100 referrals", "5 campaigns", "Basic AI assistant"].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/register?plan=starter" className="mt-8">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col rounded-lg border border-primary p-6 shadow-lg">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-muted-foreground">For growing businesses with more needs.</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $79<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Advanced analytics",
                "Unlimited referrals",
                "20 campaigns",
                "Advanced AI assistant",
                "Priority support",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/register?plan=pro" className="mt-8">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-lg border p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground">For large businesses with custom needs.</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              Custom<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Custom analytics",
                "Unlimited referrals",
                "Unlimited campaigns",
                "Custom AI assistant",
                "Dedicated support",
                "Custom integrations",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-8">
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

