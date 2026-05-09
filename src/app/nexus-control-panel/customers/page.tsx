import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  await requireAdmin();

  let users: any[] = [];

  try {
    users = await prisma.user.findMany({
      include: {
        subscription: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("[Customers Page] Error:", error);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Customers</h1>
        <p className="text-slate-500 text-sm mt-1">Manage customer accounts</p>
      </div>

      <div className="rounded-xl border border-[#1a2234] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a2234] bg-[#0d0d18]">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                User
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Email
              </th>
              <th className="text-center px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Member
              </th>
              <th className="text-center px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Orders
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
                const isMember =
                  user.subscription?.status === "active" ||
                  user.subscription?.status === "cancelling";

                return (
                  <tr
                    key={user.id}
                    className="border-b border-[#1a2234] hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold">
                          {user.name?.charAt(0) || user.email?.charAt(0) || "?"}
                        </div>
                        <span className="text-white">{user.name || "No name"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{user.email}</td>
                    <td className="px-4 py-3 text-center">
                      {isMember ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-800 text-slate-500 text-xs rounded">
                          NO
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-400">
                      {user._count.orders}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-slate-600"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
