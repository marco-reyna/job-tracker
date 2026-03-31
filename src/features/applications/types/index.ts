import { ApplicationStatus } from "@/generated/prisma/client";

export type { ApplicationStatus };

export interface Application {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  salary: string | null;
  url: string | null;
  notes: string | null;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateApplicationInput {
  company: string;
  role: string;
  status?: ApplicationStatus;
  salary?: string;
  url?: string;
  notes?: string;
  appliedAt: Date;
}

export interface UpdateApplicationInput extends Partial<CreateApplicationInput> {
  id: string;
}
