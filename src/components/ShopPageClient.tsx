"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ItemCard } from "@/components/ItemCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Game {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  category: string;
  publisher: string;
  isAndroidOnly: boolean;
  products: {
    id: string;
    retailPrice: number;
    memberPrice: number;
  }[];
}

interface ShopPageClientProps {
  games: Game[];
  services: Game[];
  isMember: boolean;
}

const PUBLISHERS = [
  { id: "all", name: "All Publishers", color: "#22c55e" },
  { id: "activision", name: "Activision", color: "#9ca3af" },
  { id: "epic-games", name: "Epic Games", color: "#3b82f6" },
  { id: "pubg", name: "PUBG", color: "#f59e0b" },
  { id: "garena", name: "Garena", color: "#ef4444" },
  { id: "supercell", name: "Supercell", color: "#fbbf24" },
  { id: "moonton", name: "Moonton", color: "#3b82f6" },
  { id: "riot-games", name: "Riot Games", color: "#ef4444" },
  { id: "wargaming", name: "Wargaming", color: "#f59e0b" },
  { id: "hoyoverse", name: "HoYoverse", color: "#8b5cf6" },
];

export function ShopPageClient({ games, services, isMember }: ShopPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState<"games" | "services">("games");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const items = activeTab === "games" ? games : services;
  
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPublisher = selectedPublisher === "all" || item.publisher?.toLowerCase().includes(selectedPublisher);
    return matchesSearch && matchesPublisher;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
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

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="card-dark p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div>
                <label className="text-sm text-slate-500 mb-2 block">Category</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab("games")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === "games" ? "bg-green-500/20 text-green-400" : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    🎮 Games
                  </button>
                  <button
                    onClick={() => setActiveTab("services")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === "services" ? "bg-green-500/20 text-green-400" : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    💻 Services
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-500 mb-2 block">Publisher</label>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {PUBLISHERS.map((pub) => (
                    <button
                      key={pub.id}
                      onClick={() => setSelectedPublisher(pub.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        selectedPublisher === pub.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: pub.color }}
                      />
                      {pub.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0d18] border border-[#1a2234] rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {filteredItems.length} {activeTab === "games" ? "games" : "services"} found
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const cheapest = item.products[0];
                const fromPrice = cheapest
                  ? isMember
                    ? cheapest.memberPrice
                    : cheapest.retailPrice
                  : null;

                return (
                  <ItemCard
                    key={item.id}
                    slug={item.slug}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    fromPrice={fromPrice}
                    isMember={isMember}
                    packCount={item.products.length}
                    isService={activeTab === "services"}
                    isAndroidOnly={item.isAndroidOnly}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-slate-500">No {activeTab} found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
