import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyApiAuth } from "@/lib/apiAuth";
import { prisma } from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/client";

const VALID_STATUSES = Object.values(ApplicationStatus);

export async function POST(request: NextRequest) {
  if (!verifyApiAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { company, role, status, salary, url, notes, appliedAt } = body;

  if (!company || !role) {
    return NextResponse.json({ error: "company and role are required" }, { status: 400 });
  }

  const resolvedStatus =
    status && VALID_STATUSES.includes(status) ? status : ApplicationStatus.APPLIED;

  const application = await prisma.application.create({
    data: {
      company: String(company).trim(),
      role: String(role).trim(),
      status: resolvedStatus,
      salary: salary ? String(salary).trim() : null,
      url: url ? String(url).trim() : null,
      notes: notes ? String(notes).trim() : null,
      appliedAt: appliedAt ? new Date(appliedAt) : new Date(),
    },
  });

  revalidatePath("/");

  return NextResponse.json(application, { status: 201 });
}
