"use client";

import { useRouter } from "next/navigation";
import { useCurrency } from "@/components/providers/CurrencyProvider";

const SERVICE_COLOR: Record<string, string> = {
  "youtube-premium": "from-red-800 to-red-950",
  "netflix":         "from-red-900 to-red-950",
  "spotify":         "from-green-900 to-green-950",
  "apple-music":     "from-pink-900 to-rose-950",
  "disney-plus":     "from-blue-900 to-indigo-950",
  "xbox-game-pass":  "from-green-900 to-emerald-950",
  "playstation-plus":"from-blue-900 to-blue-950",
  "google-one":      "from-blue-800 to-blue-950",
  "chatgpt":         "from-teal-900 to-cyan-950",
  "midjourney":      "from-indigo-900 to-violet-950",
};

const SERVICE_EMOJI: Record<string, string> = {
  "youtube-premium": "📺",
  "netflix":         "🎬",
  "spotify":         "🎵",
  "apple-music":     "🎧",
  "disney-plus":     "✨",
  "xbox-game-pass":  "🎮",
  "playstation-plus":"🎯",
  "google-one":      "☁️",
  "chatgpt":         "🤖",
  "midjourney":      "🎨",
};

const GAME_COLORS: Record<string, string> = {
  "call-of-duty":      "from-slate-700 to-slate-900",
  "crash-bandicoot":   "from-orange-700 to-orange-950",
  "fortnite":          "from-blue-900 to-purple-900",
  "rocket-league":     "from-sky-800 to-blue-950",
  "pubg":              "from-amber-900 to-yellow-950",
  "pubg-pc":           "from-yellow-800 to-amber-950",
  "free-fire":         "from-red-900 to-orange-950",
  "lol-mobile":        "from-teal-800 to-cyan-950",
  "clash-of-clans":    "from-yellow-800 to-amber-950",
  "brawl-stars":       "from-purple-900 to-blue-950",
  "clash-royale":      "from-indigo-800 to-blue-950",
  "mobile-legends":    "from-blue-900 to-indigo-950",
  "ml-adventures":     "from-indigo-800 to-purple-950",
  "valorant":          "from-red-900 to-rose-950",
  "league-legends":    "from-blue-800 to-indigo-950",
  "teamfight":         "from-cyan-900 to-blue-950",
  "world-of-tanks":    "from-amber-800 to-yellow-950",
  "world-of-warships": "from-blue-900 to-cyan-950",
  "star-rail":         "from-indigo-900 to-violet-950",
  "zenless-zone":      "from-orange-900 to-red-950",
};

const GAME_EMOJI: Record<string, string> = {
  "call-of-duty":      "🎯",
  "crash-bandicoot":   "🐾",
  "fortnite":          "⚡",
  "rocket-league":     "🚀",
  "pubg":              "🔫",
  "pubg-pc":           "🎮",
  "free-fire":         "🔥",
  "lol-mobile":        "⚔️",
  "clash-of-clans":    "⚔️",
  "brawl-stars":       "⭐",
  "clash-royale":      "👑",
  "mobile-legends":    "🗡️",
  "ml-adventures":     "♟️",
  "valorant":          "🎯",
  "league-legends":    "🏆",
  "teamfight":         "🎲",
  "world-of-tanks":    "🛡️",
  "world-of-warships": "⚓",
  "star-rail":         "🚂",
  "zenless-zone":      "⚡",
};

interface ItemCardProps {
  slug: string;
  name: string;
  imageUrl?: string | null;
  packCount?: number;
  fromPrice?: number | null;
  fromPriceEur?: number | null;
  isMember?: boolean;
  isService?: boolean;
  accentColor?: string;
  isAndroidOnly?: boolean;
}

export function ItemCard({
  slug,
  name,
  imageUrl,
  packCount,
  fromPrice,
  fromPriceEur,
  isMember = false,
  isService = false,
  accentColor,
  isAndroidOnly = false,
}: ItemCardProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const gradient = isService
    ? (SERVICE_COLOR[slug] ?? "from-slate-700/60 to-slate-900")
    : (GAME_COLORS[slug] ?? "from-green-900/60 to-slate-900");

  const fallbackEmoji = isService
    ? (SERVICE_EMOJI[slug] ?? "💻")
    : (GAME_EMOJI[slug] ?? "💎");

  const glowColor = accentColor ?? (isService ? "rgba(59,130,246,0.25)" : "rgba(34,197,94,0.2)");

  const displayPrice = fromPrice != null
    ? formatPrice(fromPrice, fromPriceEur)
    : null;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/shop/${slug}`)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(`/shop/${slug}`); }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/40 active:scale-[0.95] active:opacity-80 transition-all duration-200 cursor-pointer select-none"
      style={{
        touchAction: "pan-y",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.06]"
          />
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-b ${gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg">
              {fallbackEmoji}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {isAndroidOnly && (
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-500/90 text-black text-[10px] font-black shadow-lg">
              Android Only
            </span>
          </div>
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-green-500/30 rounded-2xl"
          style={{ boxShadow: `inset 0 0 30px ${glowColor}` }}
        />
      </div>

      <div className="bg-[#0d1117] border-t border-white/5 px-3 py-2.5 flex-1 flex flex-col">
        <h3 className="font-bold text-sm leading-tight text-white group-hover:text-green-400 transition-colors truncate min-h-[1.25rem] flex items-center">
          {name}
        </h3>
        {displayPrice ? (
          <p className="text-[11px] text-slate-500 mt-0.5">
            {isMember ? "Member" : "From"} <span className="text-green-400 font-semibold">{displayPrice}</span>
          </p>
        ) : packCount !== undefined ? (
          <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
            {packCount} pack{packCount !== 1 ? "s" : ""}
          </p>
        ) : (
          <p className="text-[11px] text-slate-700 mt-0.5">Coming soon</p>
        )}
      </div>
    </div>
  );
}
