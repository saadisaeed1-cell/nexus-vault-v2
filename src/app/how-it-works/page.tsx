export const dynamic = "force-dynamic";

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">How Nexus Vault Works</h1>
        <p className="text-slate-400 text-lg">
          Your private gateway to global gaming pricing
        </p>
      </div>

      <div className="space-y-16">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-black text-[#39FF14]">1</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Join the Vault</h2>
            <p className="text-slate-400">
              Become a member for $49.99/year. This gives you access to our private network 
              of regional pricing for digital goods.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-black text-[#39FF14]">2</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Browse & Select</h2>
            <p className="text-slate-400">
              Explore our catalog of games and services. See member prices that are often 
              50-80% below retail.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-black text-[#39FF14]">3</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Secure Checkout</h2>
            <p className="text-slate-400">
              Pay securely through Stripe. We accept all major credit cards and process 
              payments instantly.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-black text-[#39FF14]">4</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Delivery</h2>
            <p className="text-slate-400">
              Our team processes your order within 24 hours. You'll receive your digital 
              goods directly to your account.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <a
          href="/join"
          className="cta-pulse inline-flex items-center gap-2 bg-[#39FF14] text-black font-black px-8 py-4 rounded-xl text-lg"
        >
          Get Started Today
        </a>
      </div>
    </div>
  );
}
