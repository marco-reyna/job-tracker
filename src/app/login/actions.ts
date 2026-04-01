"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const secret = formData.get("secret") as string;

  if (secret !== process.env.AUTH_SECRET) {
    redirect("/login?error=Invalid+password");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", process.env.AUTH_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect("/");
}
