import Link from "next/link";
import { Crown, Shield, Zap, Clock, CreditCard, Headphones, CheckCircle2, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const steps = [
  {
    icon: Crown,
    number: "01",
    title: "Join the Vault",
    description: "Become a member for $49.99/year. This gives you access to our private network of regional pricing for digital goods. No hidden fees, no surprises.",
    color: "from-yellow-500/20 to-amber-500/10",
    borderColor: "border-yellow-500/30",
  },
  {
    icon: Zap,
    number: "02",
    title: "Browse & Select",
    description: "Explore our catalog of games and services. See member prices that are often 50-80% below retail. Compare savings instantly with our dual-panel pricing display.",
    color: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Secure Checkout",
    description: "Pay securely through Stripe. We accept all major credit cards and process payments instantly. Your payment info is never stored on our servers.",
    color: "from-green-500/20 to-emerald-500/10",
    borderColor: "border-green-500/30",
  },
  {
    icon: Clock,
    number: "04",
    title: "Fast Delivery",
    description: "Our team processes your order within 24 hours. You'll receive your digital goods directly to your account. Most orders complete within 2-6 hours.",
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-500/30",
  },
];

const features = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Stripe-powered payments with bank-level encryption",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Priority concierge service for all members",
  },
  {
    icon: CheckCircle2,
    title: "Verified Sources",
    description: "All products sourced from official regional stores",
  },
  {
    icon: Zap,
    title: "Instant Savings",
    description: "Member pricing active immediately after signup",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            How It Works
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Your Gateway to
            <br />
            <span className="gradient-text">Global Pricing</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Nexus Vault connects you to regional pricing networks worldwide. 
            We handle the complexity so you enjoy the savings.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative card-dark p-8 border ${step.borderColor} overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${step.color} rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2`} />
              
              <div className="relative flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-black text-slate-800">{step.number}</span>
                    <h2 className="text-2xl font-bold">{step.title}</h2>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Nexus Vault?</h2>
          <p className="text-slate-400">Built for gamers who demand the best prices</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="card-dark p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="card-dark p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join thousands of members who are already enjoying at-cost pricing on their favorite games and services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="cta-pulse inline-flex items-center justify-center gap-2 bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl"
            >
              Join Nexus Vault
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-white px-8 py-4 rounded-xl hover:bg-white/5 transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
