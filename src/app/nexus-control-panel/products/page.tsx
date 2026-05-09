import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await requireAdmin();

  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      include: {
        game: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("[Products Page] Error:", error);
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Products</h1>
          <p className="text-slate-500 text-sm mt-1">Manage product items</p>
        </div>
        <Link
          href="/nexus-control-panel/products/new"
          className="flex items-center gap-2 bg-[#39FF14] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#32e612] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="rounded-xl border border-[#1a2234] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a2234] bg-[#0d0d18]">
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Product
              </th>
              <th className="text-left px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Game
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Retail
              </th>
              <th className="text-right px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Member
              </th>
              <th className="text-center px-4 py-3 text-xs text-slate-500 font-semibold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#1a2234] hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.amount}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {product.game?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    ${product.retailPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right price-member font-bold">
                    ${product.memberPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        product.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-slate-600"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
