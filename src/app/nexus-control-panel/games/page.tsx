import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GamesPage() {
  await requireAdmin();

  let games: any[] = [];

  try {
    games = await prisma.game.findMany({
      include: {
        products: {
          where: { isActive: true },
          select: { id: true },
        },
        pub: true,
      },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("[Games Page] Error:", error);
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Games</h1>
          <p className="text-slate-500 text-sm mt-1">Manage games and services</p>
        </div>
        <Link
          href="/nexus-control-panel/games/new"
          className="flex items-center gap-2 bg-[#39FF14] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#32e612] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Game
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.length > 0 ? (
          games.map((game) => (
            <div
              key={game.id}
              className="card-dark p-4 flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                {game.imageUrl ? (
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <span className="text-xl font-bold">{game.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{game.name}</h3>
                <p className="text-sm text-slate-500">
                  {game.products.length} products
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      game.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {game.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-xs rounded">
                    {game.category}
                  </span>
                </div>
              </div>

              <Link
                href={`/nexus-control-panel/games/${game.id}`}
                className="text-sm text-blue-400 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-600">
            No games found. Add your first game to get started.
          </div>
        )}
      </div>
    </div>
  );
}
