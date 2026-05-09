import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Package, CreditCard, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card-dark p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "?"}
                </span>
              </div>
              <div>
                <p className="font-bold">{session.user.name || "Member"}</p>
                <p className="text-sm text-slate-500">{session.user.email}</p>
              </div>
            </div>
            
            {session.user.isMember && (
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">
                Nexus Member
              </span>
            )}
          </div>

          <nav className="card-dark overflow-hidden">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-white bg-white/5"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/profile/orders"
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Package className="w-4 h-4" />
              Orders
            </Link>
            <Link
              href="/profile/subscription"
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Subscription
            </Link>
          </nav>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Email</label>
                <p>{session.user.email}</p>
              </div>
              
              <div>
                <label className="block text-sm text-slate-500 mb-1">Name</label>
                <p>{session.user.name || "Not set"}</p>
              </div>
              
              <div>
                <label className="block text-sm text-slate-500 mb-1">Membership Status</label>
                <p className={session.user.isMember ? "text-green-400" : "text-slate-400"}>
                  {session.user.isMember ? "Active Member" : "Not a member"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
