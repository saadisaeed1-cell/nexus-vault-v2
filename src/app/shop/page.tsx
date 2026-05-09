import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const session = await auth();
  const isMember = session?.user?.isMember ?? false;

  let games: any[] = [];
  let services: any[] = [];

  try {
    [games, services] = await Promise.all([
      prisma.game.findMany({
        where: { category: "GAME", isActive: true },
        include: {
          products: {
            where: { isActive: true },
            orderBy: { retailPrice: "asc" },
            take: 1,
          },
        },
        orderBy: { name: "asc" },
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
    ]);
  } catch (error) {
    console.error("[ShopPage] Database error:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop</h1>
        <p className="text-slate-400">
          Browse all available games and services.{" "}
          {isMember ? (
            <span className="text-[#39FF14]">You have member pricing enabled.</span>
          ) : (
            <>
              <Link href="/join" className="text-[#39FF14] hover:underline">
                Join Nexus
              </Link>{" "}
              for at-cost pricing.
            </>
          )}
        </p>
      </div>

      {/* Games Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Games</h2>
          <span className="text-sm text-slate-500">{games.length} available</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.length > 0 ? (
            games.map((game) => {
              const cheapest = game.products[0];
              const fromPrice = cheapest
                ? isMember
                  ? cheapest.memberPrice
                  : cheapest.retailPrice
                : null;

              return (
                <Link
                  key={game.id}
                  href={`/shop/${game.slug}`}
                  className="group card-dark p-4 flex flex-col transition-all duration-200"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-800 mb-3">
                    {game.imageUrl ? (
                      <img
                        src={game.imageUrl}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <span className="text-3xl font-bold">{game.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1 truncate">{game.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{game.products.length} items</p>
                  {fromPrice !== null && (
                    <p
                      className={`text-sm font-bold ${
                        isMember ? "price-member" : "text-slate-400"
                      }`}
                    >
                      From ${fromPrice.toFixed(2)}
                    </p>
                  )}
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-slate-600">
              No games available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Digital Services</h2>
          <span className="text-sm text-slate-500">
            {services.length} available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {services.length > 0 ? (
            services.map((service) => {
              const cheapest = service.products[0];
              const fromPrice = cheapest
                ? isMember
                  ? cheapest.memberPrice
                  : cheapest.retailPrice
                : null;

              return (
                <Link
                  key={service.id}
                  href={`/shop/${service.slug}`}
                  className="group card-dark p-4 flex flex-col transition-all duration-200"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800 mb-3">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <span className="text-xl font-bold">{service.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1 truncate">{service.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">
                    {service.products.length} plans
                  </p>
                  {fromPrice !== null && (
                    <p
                      className={`text-sm font-bold ${
                        isMember ? "price-member" : "text-slate-400"
                      }`}
                    >
                      From ${fromPrice.toFixed(2)}
                    </p>
                  )}
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-slate-600">
              No services available at the moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
