"use client";

import { Crown, Hexagon, ArrowRight, Star, TrendingDown, Shield, Globe, Users, PlayCircle } from "lucide-react";
import Link from "next/link";

interface HeroCTAProps {
  isMember?: boolean;
  availableSlots?: number;
  memberLimit?: number;
}

export function HeroCTA({ isMember = false, availableSlots = 50, memberLimit = 200 }: HeroCTAProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-56 h-56 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <Hexagon className="w-3.5 h-3.5 fill-green-500/20" strokeWidth={2} />
          Private Members Club
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
          The End of
          <br />
          <span className="gradient-text">Retail Prices.</span>
        </h1>

        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join the inner circle. Access{" "}
          <strong className="text-white">100% at-cost pricing</strong> for V-Bucks, COD
          Points, Netflix, Spotify and more. A private membership for those who play more
          and pay less.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isMember ? (
            <Link
              href="/shop"
              className="cta-pulse inline-flex items-center gap-2 bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl text-lg"
            >
              Browse Shop
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link
                href="/join"
                className="cta-pulse inline-flex items-center gap-2 bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl text-lg"
              >
                Join Nexus
                <Crown className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border border-slate-700 text-white px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors"
              >
                Browse Shop
              </Link>
            </>
          )}
        </div>

        {!isMember && (
          <>
            <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-slate-600 overflow-x-auto whitespace-nowrap px-4 scrollbar-none">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-700" /> Secure Stripe</span>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-600 fill-yellow-600" /> 4.9/5 Rating</span>
              <span className="text-slate-700">·</span>
              <span>Cancel anytime</span>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 bg-black/40 border border-amber-500/30 text-amber-400 text-xs font-bold px-5 py-2.5 rounded-full">
              <Users className="w-3.5 h-3.5" />
              Private Slots Available:{" "}
              <span className={availableSlots <= 20 ? "text-red-400" : "text-green-400"}>
                {availableSlots}
              </span>
              <span className="text-slate-600">/ {memberLimit}</span>
            </div>
          </>
        )}

        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500 overflow-x-auto whitespace-nowrap px-4 scrollbar-none">
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            4.9/5 from 2,400+ orders
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-400" />
            Secure Stripe Payments
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-blue-400" />
            Up to 79% below retail
          </span>
        </div>
      </div>
    </section>
  );
}
