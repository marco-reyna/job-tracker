"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function login(formData: FormData) {
  const key = formData.get("secret") as string;

  const user = await prisma.user.findUnique({ where: { key } });

  if (!user) {
    redirect("/login?error=Invalid+password");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect("/");
}
