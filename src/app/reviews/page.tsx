export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  // Placeholder reviews - will be connected to real data
  const reviews = [
    {
      id: 1,
      name: "Alex M.",
      rating: 5,
      comment: "Amazing savings on V-Bucks! The membership pays for itself.",
      date: "2025-01-15",
    },
    {
      id: 2,
      name: "Sarah K.",
      rating: 5,
      comment: "Best prices for COD Points I've ever found. Highly recommended!",
      date: "2025-01-10",
    },
    {
      id: 3,
      name: "Mike R.",
      rating: 5,
      comment: "Fast delivery and great support. Nexus Vault is a game changer.",
      date: "2025-01-05",
    },
    {
      id: 4,
      name: "Emma L.",
      rating: 4,
      comment: "Great prices, sometimes takes a bit longer but worth the savings.",
      date: "2024-12-28",
    },
    {
      id: 5,
      name: "James T.",
      rating: 5,
      comment: "Saved over $200 on my Netflix subscription this year alone!",
      date: "2024-12-20",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Member Reviews</h1>
        <p className="text-slate-400">What our members are saying about Nexus Vault</p>
        <div className="mt-6 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-3">
          <span className="text-2xl">⭐⭐⭐⭐⭐</span>
          <span className="text-yellow-400 font-bold">4.9/5</span>
          <span className="text-slate-500">from 2,400+ reviews</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="card-dark p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                  <span className="font-bold">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-xs text-slate-500">Verified Member</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < review.rating
                        ? "text-yellow-400"
                        : "text-slate-700"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-300 mb-4">"{review.comment}"</p>
            <p className="text-xs text-slate-500">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
