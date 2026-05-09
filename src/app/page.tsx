import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Crown, ArrowRight, Star, TrendingDown, Shield, Hexagon, Globe, Users, PlayCircle } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();
  const isMember = session?.user?.isMember ?? false;

  // Default values if database is not available
  let featuredGames: any[] = [];
  let services: any[] = [];
  let settings = { memberLimit: 200, memberOverride: null as number | null };
  let activeMembers = 0;

  try {
    [featuredGames, services, settings, activeMembers] = await Promise.all([
      prisma.game.findMany({
        where: { category: "GAME", isActive: true, isFeatured: true },
        include: {
          products: {
            where: { isActive: true },
            orderBy: { retailPrice: "asc" },
            take: 1,
            select: { memberPrice: true, retailPrice: true, eurRetailPrice: true, eurMemberPrice: true },
          },
        },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.game.findMany({
        where: { category: "DIGITAL_SERVICE", isActive: true },
        include: {
          products: {
            where: { isActive: true },
            orderBy: { retailPrice: "asc" },
            take: 1,
            select: { memberPrice: true, retailPrice: true, eurRetailPrice: true, eurMemberPrice: true },
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.settings.upsert({
        where: { id: "singleton" },
        update: {},
        create: { id: "singleton", memberLimit: 200 },
      }),
      prisma.subscription.count({ where: { status: "active" } }),
    ]);
  } catch (error) {
    console.error("[HomePage] Database error:", error);
  }

  const usedSlots = settings.memberOverride ?? activeMembers;
  const availableSlots = Math.max(0, settings.memberLimit - usedSlots);

  return (
    <div className="min-h-screen">
      {/* Hero */}
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

          {/* Trust signals */}
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
                <span className="text-slate-600">/ {settings.memberLimit}</span>
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

      {/* Featured Games */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Featured Games</h2>
            <p className="text-slate-500 text-sm mt-1">Top-up your favourite titles at cost.</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors self-start sm:self-auto"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredGames.length > 0 ? (
            featuredGames.map((game) => {
              const cheapest = game.products[0];
              const fromPrice = cheapest ? (isMember ? cheapest.memberPrice : cheapest.retailPrice) : null;
              return (
                <GameCard
                  key={game.id}
                  slug={game.slug}
                  name={game.name}
                  imageUrl={game.imageUrl}
                  fromPrice={fromPrice}
                  isMember={isMember}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-slate-600">
              No featured games available
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-3xl font-bold">Essential Digital Services</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Stop paying regional taxes on your digital life. Members access AI, music, and
              movies at their original source cost.{" "}
              <span className="text-slate-300 font-medium">No VPN required.</span>
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3">
          <Globe className="w-4 h-4 text-blue-400 shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="text-blue-400 font-semibold">Global pricing:</span> Netflix, Spotify and YouTube are sourced from regions where official prices are up to{" "}
            <span className="text-white font-bold">79% cheaper</span> than the US market price.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
          {services.length > 0 ? (
            services.slice(0, 7).map((svc) => {
              const cheapest = svc.products[0];
              const fromPrice = cheapest ? (isMember ? cheapest.memberPrice : cheapest.retailPrice) : null;
              return (
                <GameCard
                  key={svc.id}
                  slug={svc.slug}
                  name={svc.name}
                  imageUrl={svc.imageUrl}
                  fromPrice={fromPrice}
                  isMember={isMember}
                  isService
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-slate-600">
              No services available
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 mb-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-500/30 p-10 text-center">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #22c55e, transparent 70%)" }}
          />
          <Crown className="w-12 h-12 text-yellow-400 fill-yellow-400/20 mx-auto mb-4 relative z-10" />
          <h2 className="text-3xl font-black mb-3 relative z-10">Curious How It Works?</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto relative z-10">
            We source digital top-ups at regional cost prices so you pay less — always.
            Learn about our concierge process, safety measures, and what happens after you join.
          </p>
          <Link
            href="/how-it-works"
            className="cta-pulse relative z-10 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 active:bg-green-600 active:scale-[0.97] text-black font-black px-8 py-3 rounded-xl transition-all text-lg min-h-[52px]"
          >
            <PlayCircle className="w-5 h-5" />
            How It Works
          </Link>
        </div>
      </section>
    </div>
  );
}

// Game Card Component
function GameCard({
  slug,
  name,
  imageUrl,
  fromPrice,
  isMember,
  isService = false,
}: {
  slug: string;
  name: string;
  imageUrl: string | null;
  fromPrice: number | null;
  isMember: boolean;
  isService?: boolean;
}) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="group card-dark p-3 flex flex-col transition-all duration-200"
    >
      <div className={`relative ${isService ? 'w-12 h-12' : 'aspect-square'} rounded-lg overflow-hidden bg-slate-800 mb-3`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <span className="text-2xl font-bold">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-1 truncate">{name}</h3>
      {fromPrice !== null && (
        <p className={`text-sm font-bold ${isMember ? 'price-member' : 'text-slate-400'}`}>
          From ${fromPrice.toFixed(2)}
        </p>
      )}
    </Link>
  );
}
