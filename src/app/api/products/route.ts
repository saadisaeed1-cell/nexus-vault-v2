import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userCurrency = (session?.user as { currency?: string })?.currency ?? "USD";

    const games = await prisma.game.findMany({
      where: { 
        isActive: true,
        category: "GAME",
        OR: [
          { visibilityScope: "ALL" },
          { visibilityScope: userCurrency === "EUR" ? "EU" : "ALL" },
        ],
      },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { retailPrice: "asc" },
        },
        pub: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ games });
  } catch (error) {
    console.error("[API /products] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", games: [] },
      { status: 500 }
    );
  }
}
