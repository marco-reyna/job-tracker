import { Badge } from "@/components/ui/Badge";
import { ApplicationStatus } from "@/generated/prisma/client";

const statusConfig: Record<ApplicationStatus, { variant: "blue" | "yellow" | "red" | "green"; label: string }> = {
  APPLIED: { variant: "blue", label: "Applied" },
  INTERVIEWING: { variant: "yellow", label: "Interviewing" },
  REJECTED: { variant: "red", label: "Rejected" },
  OFFER: { variant: "green", label: "Offer" },
};

interface Props {
  status: ApplicationStatus;
}

export function ApplicationStatusBadge({ status }: Props) {
  const { variant, label } = statusConfig[status];
  return <Badge variant={variant}>{label}</Badge>;
}
