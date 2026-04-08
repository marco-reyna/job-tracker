import { Badge } from "@/components/ui/Badge";
import { ApplicationStatus } from "@/generated/prisma/client";

const statusConfig: Record<ApplicationStatus, { variant: "accent" | "neutral" | "error" | "primary"; label: string }> = {
  APPLIED:      { variant: "accent",  label: "Applied" },
  INTERVIEWING: { variant: "neutral", label: "Interviewing" },
  REJECTED:     { variant: "error",   label: "Rejected" },
  OFFER:        { variant: "primary", label: "Offer" },
};

interface Props {
  status: ApplicationStatus;
}

export function ApplicationStatusBadge({ status }: Props) {
  const { variant, label } = statusConfig[status];
  return <Badge variant={variant}>{label}</Badge>;
}
