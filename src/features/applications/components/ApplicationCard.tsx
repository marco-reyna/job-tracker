import Link from "next/link";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import type { Application } from "../types";

interface Props {
  application: Application;
}

export function ApplicationCard({ application }: Props) {
  const appliedDate = new Date(application.appliedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <tr className="hover:bg-accent transition-colors">
      <td className="px-4 py-3 font-medium text-ink">
        {application.url ? (
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-ink hover:underline transition-colors"
          >
            {application.company}
          </a>
        ) : (
          application.company
        )}
      </td>
      <td className="px-4 py-3 text-ink/70">{application.role}</td>
      <td className="px-4 py-3">
        <ApplicationStatusBadge status={application.status} />
      </td>
      <td className="px-4 py-3 text-ink/50">{appliedDate}</td>
      <td className="px-4 py-3 text-ink/50">{application.salary ?? "—"}</td>
      <td className="px-4 py-3">
        <Link
          href={`/applications/${application.id}`}
          className="text-primary hover:text-ink hover:underline transition-colors"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
