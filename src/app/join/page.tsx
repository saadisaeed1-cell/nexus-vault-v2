import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Crown, Check, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function JoinPage() {
  const session = await auth();

  // If already a member, redirect to shop
  if (session?.user?.isMember) {
    redirect("/shop");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
          <Crown className="w-8 h-8 text-[#39FF14]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Join Nexus Vault</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Get access to at-cost pricing on V-Bucks, COD Points, Netflix, Spotify, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Membership Card */}
        <div className="card-dark p-8 neon-border relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#39FF14] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
            RECOMMENDED
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Nexus Membership</h2>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-black">$49.99</span>
            <span className="text-slate-500">/year</span>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "At-cost pricing on all products",
              "Up to 79% savings vs retail",
              "Priority support",
              "Early access to new games",
              "Cancel anytime",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-[#39FF14] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/checkout/membership"
            className="cta-pulse w-full flex items-center justify-center gap-2 bg-[#39FF14] text-black font-bold py-4 rounded-xl"
          >
            Join Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Comparison */}
        <div className="card-dark p-8">
          <h2 className="text-2xl font-bold mb-6">Why Join?</h2>

          <div className="space-y-6">
            {[
              { product: "V-Bucks 13,500", retail: 89.99, member: 67.5 },
              { product: "COD Points 13,000", retail: 99.99, member: 75 },
              { product: "Netflix Premium", retail: 240, member: 60 },
              { product: "Spotify Family", retail: 198, member: 45 },
            ].map((item) => (
              <div key={item.product} className="flex items-center justify-between">
                <span className="text-slate-300">{item.product}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 line-through">${item.retail}</span>
                  <span className="price-member font-bold">${item.member}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-sm text-green-400">
              Average members save over $500/year on their gaming and digital subscriptions.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="card-dark p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "How does the pricing work?",
              a: "We source digital goods at regional cost prices and pass those savings directly to members.",
            },
            {
              q: "Is it safe?",
              a: "Yes, all transactions are processed securely through Stripe. We never store your payment info.",
            },
            {
              q: "Can I cancel?",
              a: "Absolutely. You can cancel your membership at any time with no penalties.",
            },
            {
              q: "How fast is delivery?",
              a: "Most orders are processed within 24 hours. Some may take up to 48 hours during peak times.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
