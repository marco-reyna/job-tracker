import { prisma } from "@/lib/prisma";

export async function resolveApiUser(request: Request): Promise<string | null> {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const key = auth.slice(7);
  const user = await prisma.user.findUnique({ where: { key } });
  return user?.id ?? null;
}
