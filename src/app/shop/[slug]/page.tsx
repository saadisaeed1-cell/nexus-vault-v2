import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const isMember = session?.user?.isMember ?? false;

  let game: any = null;

  try {
    game = await prisma.game.findUnique({
      where: { slug, isActive: true },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { retailPrice: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("[GamePage] Database error:", error);
  }

  if (!game) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back Link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
          {game.imageUrl ? (
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <span className="text-5xl font-bold">{game.name.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
          {game.description && (
            <p className="text-slate-400 mb-6">{game.description}</p>
          )}
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-400">
              {game.category === "GAME" ? "Game" : "Service"}
            </span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-400">
              {game.region}
            </span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Items</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {game.products.length > 0 ? (
            game.products.map((product: any) => (
              <div
                key={product.id}
                className="card-dark p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.amount}</p>
                  </div>
                  {product.badge && (
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-500">Retail</p>
                      <p className="text-lg font-bold text-slate-400">
                        ${product.retailPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Member</p>
                      <p className="text-2xl font-black price-member">
                        ${product.memberPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/checkout/${product.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#39FF14] text-black font-bold py-3 rounded-xl hover:bg-[#32e612] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isMember ? "Buy Now" : "Buy at Retail"}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-600">
              No items available for this game.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
