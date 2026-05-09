import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect to /admin/auth if not authenticated as admin
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#08080e]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#0d0d18] border-r border-[#1a2234] fixed left-0 top-0">
          <div className="p-6">
            <Link href="/nexus-control-panel" className="flex items-center gap-2 mb-8">
              <span className="font-bold text-xl">Nexus Control</span>
            </Link>

            <nav className="space-y-1">
              <NavLink href="/nexus-control-panel" icon="📊">
                Dashboard
              </NavLink>
              <NavLink href="/nexus-control-panel/orders" icon="📦">
                Orders
              </NavLink>
              <NavLink href="/nexus-control-panel/customers" icon="👥">
                Customers
              </NavLink>
              <NavLink href="/nexus-control-panel/games" icon="🎮">
                Games
              </NavLink>
              <NavLink href="/nexus-control-panel/products" icon="🏷️">
                Products
              </NavLink>
              <NavLink href="/nexus-control-panel/tickets" icon="🎫">
                Tickets
              </NavLink>
              <NavLink href="/nexus-control-panel/refunds" icon="💰">
                Refunds
              </NavLink>
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#1a2234]">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              ← Back to Site
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
    >
      <span>{icon}</span>
      {children}
    </Link>
  );
}
