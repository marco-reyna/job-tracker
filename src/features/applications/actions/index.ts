"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/client";
import type { Application, CreateApplicationInput, UpdateApplicationInput } from "../types";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getApplications(
  status?: ApplicationStatus
): Promise<ActionResult<Application[]>> {
  try {
    const applications = await prisma.application.findMany({
      where: status ? { status } : undefined,
      orderBy: { appliedAt: "desc" },
    });
    return { success: true, data: applications };
  } catch {
    return { success: false, error: "Failed to fetch applications" };
  }
}

export async function getApplication(
  id: string
): Promise<ActionResult<Application>> {
  try {
    const application = await prisma.application.findUnique({ where: { id } });
    if (!application) return { success: false, error: "Not found" };
    return { success: true, data: application };
  } catch {
    return { success: false, error: "Failed to fetch application" };
  }
}

export async function createApplication(
  input: CreateApplicationInput
): Promise<ActionResult<Application>> {
  try {
    const application = await prisma.application.create({
      data: {
        ...input,
        appliedAt: new Date(input.appliedAt),
      },
    });
    revalidatePath("/");
    return { success: true, data: application };
  } catch {
    return { success: false, error: "Failed to create application" };
  }
}

export async function updateApplication(
  input: UpdateApplicationInput
): Promise<ActionResult<Application>> {
  try {
    const { id, ...data } = input;
    const application = await prisma.application.update({
      where: { id },
      data: {
        ...data,
        ...(data.appliedAt ? { appliedAt: new Date(data.appliedAt) } : {}),
      },
    });
    revalidatePath("/");
    revalidatePath("/applications/[id]", "page");
    return { success: true, data: application };
  } catch {
    return { success: false, error: "Failed to update application" };
  }
}

export async function deleteApplication(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await prisma.application.delete({ where: { id } });
    revalidatePath("/");
    return { success: true, data: { id } };
  } catch {
    return { success: false, error: "Failed to delete application" };
  }
}
