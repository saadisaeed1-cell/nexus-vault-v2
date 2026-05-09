import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ShopPageClient } from "@/components/ShopPageClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const session = await auth();
  const isMember = (session?.user as { isMember?: boolean })?.isMember ?? false;

  let games: any[] = [];
  let services: any[] = [];

  try {
    [games, services] = await Promise.all([
      prisma.game.findMany({
        where: { category: "GAME", isActive: true },
        include: {
          products: {
            where: { isActive: true },
            orderBy: { retailPrice: "asc" },
          },
        },
        orderBy: { name: "asc" },
      }),
      prisma.game.findMany({
        where: { category: "DIGITAL_SERVICE", isActive: true },
        include: {
          products: {
            where: { isActive: true },
            orderBy: { retailPrice: "asc" },
          },
        },
        orderBy: { name: "asc" },
      }),
    ]);
  } catch (error) {
    console.error("[ShopPage] Database error:", error);
  }

  return (
    <ShopPageClient 
      games={games} 
      services={services} 
      isMember={isMember} 
    />
  );
}
