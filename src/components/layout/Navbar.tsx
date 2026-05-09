"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Crown, Menu, X, User, LogOut, Shield } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = session?.user?.isAdmin;
  const isMember = session?.user?.isMember;

  return (
    <nav className="sticky top-0 z-50 bg-[#08080e]/80 backdrop-blur-xl border-b border-[#1a2234]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#39FF14]" />
            <span className="font-bold text-lg">Nexus Vault</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm text-slate-400 hover:text-white transition-colors">
              Shop
            </Link>
            <Link href="/leaderboard" className="text-sm text-slate-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/reviews" className="text-sm text-slate-400 hover:text-white transition-colors">
              Reviews
            </Link>
            
            {isAdmin && (
              <Link 
                href="/nexus-control-panel" 
                className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  {session.user.name || session.user.email}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/join"
                  className="text-sm bg-[#39FF14] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#32e612] transition-colors"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1a2234]">
            <div className="flex flex-col gap-2">
              <Link 
                href="/shop" 
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/leaderboard" 
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link 
                href="/reviews" 
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              
              {isAdmin && (
                <Link 
                  href="/nexus-control-panel" 
                  className="px-4 py-2 text-amber-400 hover:bg-amber-500/10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              <hr className="my-2 border-[#1a2234]" />

              {session?.user ? (
                <>
                  <Link 
                    href="/profile" 
                    className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/join" 
                    className="px-4 py-2 text-[#39FF14] font-semibold hover:bg-[#39FF14]/10 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Nexus
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
