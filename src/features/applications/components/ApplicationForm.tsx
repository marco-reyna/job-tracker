"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { createApplication, updateApplication } from "../actions";
import type { Application } from "../types";
import { ApplicationStatus } from "@/generated/prisma/enums";

const STATUS_OPTIONS = [
  { value: ApplicationStatus.APPLIED, label: "Applied" },
  { value: ApplicationStatus.INTERVIEWING, label: "Interviewing" },
  { value: ApplicationStatus.REJECTED, label: "Rejected" },
  { value: ApplicationStatus.OFFER, label: "Offer" },
];

interface Props {
  application?: Application;
}

export function ApplicationForm({ application }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [fields, setFields] = useState({
    company: application?.company ?? "",
    role: application?.role ?? "",
    status: application?.status ?? ApplicationStatus.APPLIED,
    salary: application?.salary ?? "",
    url: application?.url ?? "",
    notes: application?.notes ?? "",
    appliedAt: application
      ? new Date(application.appliedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  function set(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!fields.company.trim()) newErrors.company = "Company is required";
    if (!fields.role.trim()) newErrors.role = "Role is required";
    if (!fields.appliedAt) newErrors.appliedAt = "Applied date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setServerError("");

    startTransition(async () => {
      const input = {
        company: fields.company.trim(),
        role: fields.role.trim(),
        status: fields.status as ApplicationStatus,
        salary: fields.salary.trim() || undefined,
        url: fields.url.trim() || undefined,
        notes: fields.notes.trim() || undefined,
        appliedAt: new Date(fields.appliedAt),
      };

      const result = application
        ? await updateApplication({ id: application.id, ...input })
        : await createApplication(input);

      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        setServerError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="company"
        label="Company *"
        value={fields.company}
        onChange={(e) => set("company", e.target.value)}
        error={errors.company}
        placeholder="e.g. Acme Corp"
      />
      <Input
        id="role"
        label="Role *"
        value={fields.role}
        onChange={(e) => set("role", e.target.value)}
        error={errors.role}
        placeholder="e.g. Senior Engineer"
      />
      <Select
        id="status"
        label="Status"
        options={STATUS_OPTIONS}
        value={fields.status}
        onChange={(e) => set("status", e.target.value)}
      />
      <Input
        id="appliedAt"
        label="Applied Date *"
        type="date"
        value={fields.appliedAt}
        onChange={(e) => set("appliedAt", e.target.value)}
        error={errors.appliedAt}
      />
      <Input
        id="salary"
        label="Salary"
        value={fields.salary}
        onChange={(e) => set("salary", e.target.value)}
        placeholder="e.g. $120,000"
      />
      <Input
        id="url"
        label="Job URL"
        type="url"
        value={fields.url}
        onChange={(e) => set("url", e.target.value)}
        placeholder="https://..."
      />
      <Textarea
        id="notes"
        label="Notes"
        value={fields.notes}
        onChange={(e) => set("notes", e.target.value)}
        placeholder="Any notes about this application..."
      />
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : application ? "Save Changes" : "Add Application"}
        </Button>
        <Button variant="secondary" onClick={() => router.back()} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
