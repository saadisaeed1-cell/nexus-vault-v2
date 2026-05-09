import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Crown, Check, ArrowRight, Shield, Zap, Headphones, Clock, Globe } from "lucide-react";

export const dynamic = "force-dynamic";

const benefits = [
  { icon: Zap, text: "At-cost pricing on all products" },
  { icon: Globe, text: "Up to 79% savings vs retail" },
  { icon: Headphones, text: "Priority 24/7 support" },
  { icon: Clock, text: "Early access to new games" },
  { icon: Shield, text: "Cancel anytime" },
];

const comparisons = [
  { product: "V-Bucks 13,500", retail: 89.99, member: 67.5 },
  { product: "COD Points 13,000", retail: 99.99, member: 75 },
  { product: "Netflix Premium (year)", retail: 240, member: 60 },
  { product: "Spotify Family (year)", retail: 198, member: 45 },
  { product: "YouTube Premium (year)", retail: 144, member: 40 },
];

const faqs = [
  {
    q: "How does the pricing work?",
    a: "We source digital goods at regional cost prices and pass those savings directly to members. Our team maintains accounts in regions where official prices are significantly lower.",
  },
  {
    q: "Is it safe?",
    a: "Yes, all transactions are processed securely through Stripe. We never store your payment info. All products come from official stores and are 100% legitimate.",
  },
  {
    q: "Can I cancel?",
    a: "Absolutely. You can cancel your membership at any time with no penalties. Your savings from just one purchase often cover the annual fee.",
  },
  {
    q: "How fast is delivery?",
    a: "Most orders are processed within 2-6 hours. Some may take up to 24 hours during peak times. Members get priority processing.",
  },
];

export default async function JoinPage() {
  const session = await auth();

  if ((session?.user as { isMember?: boolean })?.isMember) {
    redirect("/shop");
  }

  let settings = { memberLimit: 200, memberOverride: null as number | null };
  let activeMembers = 0;

  try {
    [settings, activeMembers] = await Promise.all([
      prisma.settings.upsert({
        where: { id: "singleton" },
        update: {},
        create: { id: "singleton", memberLimit: 200 },
      }),
      prisma.subscription.count({ where: { status: "active" } }),
    ]);
  } catch (error) {
    console.error("[JoinPage] Database error:", error);
  }

  const usedSlots = settings.memberOverride ?? activeMembers;
  const availableSlots = Math.max(0, settings.memberLimit - usedSlots);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-yellow-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Crown className="w-10 h-10 text-[#39FF14]" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Join the
            <br />
            <span className="gradient-text">Inner Circle</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Get access to at-cost pricing on V-Bucks, COD Points, Netflix, Spotify, and more. 
            Join thousands of members already saving.
          </p>

          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold px-5 py-2.5 rounded-full mb-12">
            <span>🔥</span>
            Only {availableSlots} spots remaining out of {settings.memberLimit}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-dark p-8 neon-border relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#39FF14] text-black text-xs font-black px-4 py-2 rounded-bl-xl">
              BEST VALUE
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Nexus Membership</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black">$49.99</span>
              <span className="text-slate-500">/year</span>
            </div>

            <p className="text-slate-400 mb-6">
              Less than $5/month for access to wholesale pricing on all digital goods.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit.text} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  {benefit.text}
                </li>
              ))}
            </ul>

            <Link
              href="/checkout/membership"
              className="cta-pulse w-full flex items-center justify-center gap-2 bg-[#39FF14] text-black font-black py-4 rounded-xl text-lg"
            >
              Join Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-center text-xs text-slate-600 mt-4">
              30-day money-back guarantee
            </p>
          </div>

          <div className="card-dark p-8">
            <h2 className="text-2xl font-bold mb-6">Sample Savings</h2>

            <div className="space-y-4">
              {comparisons.map((item) => (
                <div key={item.product} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-slate-300">{item.product}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 line-through text-sm">${item.retail}</span>
                    <span className="price-member font-bold">${item.member}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm text-green-400">
                💡 Average members save over $500/year on their gaming and digital subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about Nexus Vault</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="card-dark p-6">
              <h3 className="font-bold mb-3 flex items-start gap-2">
                <span className="text-green-400">Q:</span>
                {faq.q}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-slate-500">A:</span>{" "}
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
