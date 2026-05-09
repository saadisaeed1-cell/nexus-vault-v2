import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HeroCTA } from "@/components/HeroCTA";
import { ItemCard } from "@/components/ItemCard";
import { ArrowRight, Globe, Crown, PlayCircle } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();
  const isMember = (session?.user as { isMember?: boolean })?.isMember ?? false;

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
      <HeroCTA isMember={isMember} availableSlots={availableSlots} memberLimit={settings.memberLimit} />

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Featured Games</h2>
            <p className="text-slate-500 text-sm mt-1">Top-up your favourite titles at cost.</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
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
                <ItemCard
                  key={game.id}
                  slug={game.slug}
                  name={game.name}
                  imageUrl={game.imageUrl}
                  fromPrice={fromPrice}
                  isMember={isMember}
                  packCount={game.products.length}
                  isAndroidOnly={game.isAndroidOnly}
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
                <ItemCard
                  key={svc.id}
                  slug={svc.slug}
                  name={svc.name}
                  imageUrl={svc.imageUrl}
                  fromPrice={fromPrice}
                  isMember={isMember}
                  packCount={svc.products.length}
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
            className="cta-pulse relative z-10 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 active:bg-green-600 active:scale-[0.97] text-black font-black px-8 py-3 rounded-xl transition-all text-lg"
          >
            <PlayCircle className="w-5 h-5" />
            How It Works
          </Link>
        </div>
      </section>
    </div>
  );
}
