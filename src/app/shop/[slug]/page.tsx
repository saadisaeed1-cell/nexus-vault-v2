import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ShoppingCart, Crown } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const isMember = (session?.user as { isMember?: boolean })?.isMember ?? false;

  let game: any = null;

  try {
    game = await prisma.game.findUnique({
      where: { slug, isActive: true },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { retailPrice: "asc" },
        },
        pub: true,
      },
    });
  } catch (error) {
    console.error("[GamePage] Database error:", error);
  }

  if (!game) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const ROW_H = "h-[52px]";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full lg:w-64 h-64 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
          {game.imageUrl ? (
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <span className="text-6xl font-bold">{game.name.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
          {game.description && (
            <p className="text-slate-400 mb-6">{game.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-400">
              {game.category === "GAME" ? "🎮 Game" : "💻 Service"}
            </span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-400">
              {game.region}
            </span>
            {game.isAndroidOnly && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold">
                Android Only
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 overflow-visible">
        <div className="card-dark rounded-2xl overflow-hidden opacity-80">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1e293b]">
            <div className="w-9 h-9 rounded-lg bg-slate-700/50 flex items-center justify-center text-base shrink-0">
              😐
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-300 text-sm">Standard Access</p>
              <p className="text-[11px] text-slate-500">Retail pricing — no discount</p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_6rem] px-5 pt-3 pb-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Product</span>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-right">Price</span>
          </div>

          <div className="px-5 pb-4">
            {game.products.map((product: any) => {
              const label = `${product.name} · ${product.amount}`;
              return (
                <div
                  key={product.id}
                  className={`grid grid-cols-[1fr_6rem] items-center ${ROW_H} border-b border-[#1e293b] last:border-0`}
                >
                  <span className="text-sm text-slate-400 truncate pr-2 min-w-0">{label}</span>
                  <span className="text-sm font-semibold text-slate-300 tabular-nums text-right">
                    {formatPrice(product.retailPrice)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-visible">
          <div className="absolute -top-4 inset-x-0 flex justify-center z-20 pointer-events-none">
            <span className="vip-badge px-5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 tracking-wider whitespace-nowrap shadow-lg">
              <Crown className="w-3 h-3 fill-current" /> PLATINUM MEMBER
            </span>
          </div>

          <div className="rounded-2xl border-2 border-green-500/50 overflow-hidden bg-gradient-to-b from-green-950/40 to-transparent neon-border h-full">
            <div className="flex items-center gap-3 px-5 pt-8 pb-4 border-b border-green-900/30">
              <div className="w-9 h-9 rounded-lg bg-yellow-400/10 flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400/30" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-sm">Inner Circle Access</p>
                <p className="text-[11px] text-green-400 font-medium">At-cost — 2% fee only</p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_6rem] px-5 pt-3 pb-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Product</span>
              <span className="text-[10px] font-bold text-green-800 uppercase tracking-widest text-right">Member</span>
            </div>

            <div className="px-5 pb-4">
              {game.products.map((product: any) => {
                const retail = product.retailPrice;
                const member = product.memberPrice;
                const saveUSD = retail - member;
                const saveAmount = formatPrice(saveUSD);
                const label = `${product.name} · ${product.amount}`;

                return (
                  <div
                    key={product.id}
                    className={`grid grid-cols-[1fr_6rem] items-center ${ROW_H} border-b border-green-900/30 last:border-0`}
                  >
                    <span className="text-sm text-slate-300 truncate pr-2 min-w-0">{label}</span>
                    <div className="text-right">
                      <div className="font-black text-green-400 tabular-nums text-sm leading-tight">
                        {formatPrice(member)}
                      </div>
                      {saveUSD > 0.005 && (
                        <div className="text-[10px] text-green-600 tabular-nums font-semibold leading-tight">
                          save {saveAmount}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="px-5 pb-4 text-[11px] text-green-700 text-center font-medium tracking-wide">
              Zero markup · Priority processing · 24/7 concierge
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        {isMember ? (
          <Link
            href={`/checkout?game=${game.slug}`}
            className="cta-pulse inline-flex items-center justify-center gap-2 bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl text-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            Buy at Member Price
          </Link>
        ) : (
          <>
            <Link
              href="/join"
              className="cta-pulse inline-flex items-center justify-center gap-2 bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl text-lg"
            >
              <Crown className="w-5 h-5" />
              Join to Save
            </Link>
            <Link
              href={`/checkout?game=${game.slug}`}
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-white px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors"
            >
              Buy at Retail
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
