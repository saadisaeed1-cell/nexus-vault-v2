import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08080e",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Nexus Vault — Your Private Gateway to Global Gaming Pricing",
  description:
    "Members pay at cost. Get COD Points, V-Bucks, UC, Diamonds and more at wholesale prices. Join the inner circle.",
  keywords: ["game top-up", "cod points", "v-bucks", "pubg uc", "free fire diamonds", "membership", "nexus vault"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  let isMember = false;
  if (session?.user?.id) {
    const u = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscription: { select: { status: true } },
      },
    });
    isMember = u?.subscription?.status === "active" || u?.subscription?.status === "cancelling";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <CurrencyProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CurrencyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
