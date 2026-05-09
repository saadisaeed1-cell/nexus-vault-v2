export function Footer() {
  return (
    <footer className="border-t border-[#1a2234] bg-[#08080e]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-2">Nexus Vault</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Your private gateway to global gaming pricing. Members pay at cost 
              for V-Bucks, COD Points, and more.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-sm text-slate-500 hover:text-white transition-colors">Shop</a></li>
              <li><a href="/leaderboard" className="text-sm text-slate-500 hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="/reviews" className="text-sm text-slate-500 hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/support" className="text-sm text-slate-500 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/how-it-works" className="text-sm text-slate-500 hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a2234] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Nexus Vault. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/legal/privacy" className="text-xs text-slate-600 hover:text-slate-400">Privacy</a>
            <a href="/legal/terms" className="text-xs text-slate-600 hover:text-slate-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
