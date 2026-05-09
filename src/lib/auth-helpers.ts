import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  
  if (!session?.user?.isAdmin) {
    redirect("/admin/auth");
  }
  
  return session;
}

export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  return session;
}

export async function requireMember() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  if (!session.user.isMember) {
    redirect("/join");
  }
  
  return session;
}
