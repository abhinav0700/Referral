import { BarChart3, Users, Megaphone, Bot } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Powerful Features for Your Business
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to track, analyze, and grow your business in one place.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <BarChart3 className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Analytics Dashboard</h3>
            <p className="text-center text-muted-foreground">
              Track sales, conversions, and growth metrics in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <Users className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Referral Program</h3>
            <p className="text-center text-muted-foreground">
              Grow your network with our powerful referral system and rewards.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <Megaphone className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Campaign Management</h3>
            <p className="text-center text-muted-foreground">Create, track, and optimize marketing campaigns.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <Bot className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">AI Assistant</h3>
            <p className="text-center text-muted-foreground">Get insights and recommendations from our AI assistant.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

