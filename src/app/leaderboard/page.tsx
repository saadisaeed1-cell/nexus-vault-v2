export const dynamic = "force-dynamic";

export default function LeaderboardPage() {
  // Placeholder data - will be connected to real data
  const leaders = [
    { rank: 1, name: "Nexus Legend", orders: 156, spent: 2840 },
    { rank: 2, name: "Crypto King", orders: 142, spent: 2650 },
    { rank: 3, name: "Vault Master", orders: 128, spent: 2340 },
    { rank: 4, name: "Game Guru", orders: 98, spent: 1890 },
    { rank: 5, name: "Elite Gamer", orders: 87, spent: 1650 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-slate-400">Top Nexus Vault members by activity</p>
      </div>

      <div className="card-dark overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a2234] bg-[#0d0d18]">
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">
                Rank
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">
                Member
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-500">
                Orders
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-500">
                Total Spent
              </th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr
                key={leader.rank}
                className="border-b border-[#1a2234] last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      leader.rank === 1
                        ? "bg-yellow-500/20 text-yellow-400"
                        : leader.rank === 2
                        ? "bg-slate-400/20 text-slate-300"
                        : leader.rank === 3
                        ? "bg-amber-600/20 text-amber-500"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {leader.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                      <span className="font-bold">{leader.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{leader.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  {leader.orders}
                </td>
                <td className="px-6 py-4 text-right font-bold">
                  ${leader.spent.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
