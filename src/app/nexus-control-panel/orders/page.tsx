import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  await requireAdmin();

  let orders: any[] = [];

  try {
    orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: { include: { game: true } },
          },
        },
        user: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("[Orders Page] Error:", error);
  }

  const statusColors: Record<string, string> = {
    PENDING_PAYMENT: "text-slate-500",
    PENDING_CREDENTIALS: "text-yellow-400",
    PROCESSING: "text-blue-400",
    COMPLETED: "text-green-400",
    REFUNDED: "text-red-400",
  };

  const statusLabels: Record<string, string> = {
    PENDING_PAYMENT: "Pending Payment",
    PENDING_CREDENTIALS: "Needs Credentials",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    REFUNDED: "Refunded",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Orders</h1>
        <p className="text-slate-500 text-sm mt-1">Manage customer orders</p>
      </div>

      <div className="rounded-xl border border-[#1a2234] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a2234] bg-[#0d0d18]">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Order ID
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Items
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Total
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const firstItem = order.items?.[0];
                const itemCount = order.items?.length || 0;

                return (
                  <tr
                    key={order.id}
                    className="border-b border-[#1a2234] hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/nexus-control-panel/orders/${order.id}`}
                        className="text-blue-400 hover:underline font-mono text-xs"
                      >
                        {order.id.slice(0, 8)}...
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {order.user?.email || order.guestEmail || "Guest"}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {firstItem?.gameTitle || "Unknown"}
                      {itemCount > 1 && (
                        <span className="text-slate-600"> +{itemCount - 1} more</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-white font-semibold">
                      ${order.pricePaid.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right text-xs font-bold ${
                        statusColors[order.status] || "text-slate-400"
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-slate-600"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
