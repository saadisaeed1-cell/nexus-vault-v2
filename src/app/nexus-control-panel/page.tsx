import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Fetch stats with error handling
  let stats = {
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalGames: 0,
    totalProducts: 0,
    totalUsers: 0,
    activeMembers: 0,
    totalRevenue: 0,
  };

  try {
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      totalGames,
      totalProducts,
      totalUsers,
      activeMembers,
      revenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PROCESSING" } }),
      prisma.order.count({ where: { status: "COMPLETED" } }),
      prisma.game.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.subscription.count({ where: { status: "active" } }),
      prisma.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { pricePaid: true },
      }),
    ]);

    stats = {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalGames,
      totalProducts,
      totalUsers,
      activeMembers,
      totalRevenue: revenue._sum.pricePaid ?? 0,
    };
  } catch (error) {
    console.error("[Admin Dashboard] Error fetching stats:", error);
  }

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, color: "blue" },
    { label: "Pending", value: stats.pendingOrders, color: "yellow" },
    { label: "Completed", value: stats.completedOrders, color: "green" },
    { label: "Games", value: stats.totalGames, color: "purple" },
    { label: "Products", value: stats.totalProducts, color: "cyan" },
    { label: "Users", value: stats.totalUsers, color: "pink" },
    { label: "Members", value: stats.activeMembers, color: "green" },
    {
      label: "Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: "green",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    yellow: "bg-yellow-400/10 border-yellow-400/20 text-yellow-400",
    green: "bg-green-500/10 border-green-500/20 text-green-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    pink: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your Nexus Vault</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, color }) => (
          <div
            key={label}
            className={`rounded-xl border p-5 ${colorMap[color] ?? colorMap.blue}`}
          >
            <p className="text-2xl font-black text-white leading-tight">{value}</p>
            <p className="text-xs mt-0.5 opacity-70">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          {
            href: "/nexus-control-panel/games",
            label: "Manage Games",
            bg: "bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20",
          },
          {
            href: "/nexus-control-panel/products",
            label: "Manage Products",
            bg: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20",
          },
          {
            href: "/nexus-control-panel/orders",
            label: "View Orders",
            bg: "bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 border-white/[0.06]",
          },
          {
            href: "/nexus-control-panel/customers",
            label: "Customers",
            bg: "bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 border-white/[0.06]",
          },
        ].map(({ href, label, bg }) => (
          <Link
            key={href}
            href={href}
            className={`text-center py-3 px-4 rounded-xl border text-sm font-bold transition-all ${bg}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
