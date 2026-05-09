import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export default async function RefundsPage() {
  await requireAdmin();

  let refunds: any[] = [];

  try {
    refunds = await prisma.refundRequest.findMany({
      include: {
        user: true,
        order: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("[Refunds Page] Error:", error);
  }

  const statusColors: Record<string, string> = {
    PENDING: "text-yellow-400",
    APPROVED: "text-green-400",
    REJECTED: "text-red-400",
    PROCESSED: "text-blue-400",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Refund Requests</h1>
        <p className="text-slate-500 text-sm mt-1">Manage refund requests</p>
      </div>

      <div className="rounded-xl border border-[#1a2234] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a2234] bg-[#0d0d18]">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Request
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Customer
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Order
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Reason
              </th>
              <th className="text-center px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Requested
              </th>
            </tr>
          </thead>
          <tbody>
            {refunds.length > 0 ? (
              refunds.map((refund) => (
                <tr
                  key={refund.id}
                  className="border-b border-[#1a2234] hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-slate-500">
                      #{refund.id.slice(0, 8)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {refund.user?.email || refund.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-slate-500">
                      #{refund.orderId.slice(0, 8)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 max-w-xs truncate">
                    {refund.reason}
                  </td>
                  <td
                    className={`px-4 py-3 text-center text-xs font-bold ${
                      statusColors[refund.status] || "text-slate-400"
                    }`}
                  >
                    {refund.status}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500 text-xs">
                    {new Date(refund.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-slate-600"
                >
                  No refund requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
