import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export default async function TicketsPage() {
  await requireAdmin();

  let tickets: any[] = [];

  try {
    tickets = await prisma.supportTicket.findMany({
      include: {
        user: true,
        order: true,
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("[Tickets Page] Error:", error);
  }

  const statusColors: Record<string, string> = {
    OPEN: "text-yellow-400",
    IN_PROGRESS: "text-blue-400",
    RESOLVED: "text-green-400",
    CLOSED: "text-slate-500",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Support Tickets</h1>
        <p className="text-slate-500 text-sm mt-1">Manage customer support requests</p>
      </div>

      <div className="rounded-xl border border-[#1a2234] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a2234] bg-[#0d0d18]">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Ticket
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Contact
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Message
              </th>
              <th className="text-center px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Messages
              </th>
              <th className="text-center px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-[#1a2234] hover:bg-white/[0.02]"
                >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-500">
                        #{ticket.id.slice(0, 8)}
                      </span>
                      {ticket.adminUnread && (
                        <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                          NEW
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {ticket.contact}
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-xs truncate">
                      {ticket.message}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-400">
                      {ticket._count.messages}
                    </td>
                    <td
                      className={`px-4 py-3 text-center text-xs font-bold ${
                        statusColors[ticket.status] || "text-slate-400"
                      }`}
                    >
                      {ticket.status}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500 text-xs">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-slate-600"
                >
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
