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
    <tr className="hover:bg-dust/40 transition-colors">
      <td className="px-4 py-3 font-medium text-black">
        {application.url ? (
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-tangerine hover:underline transition-colors"
          >
            {application.company}
          </a>
        ) : (
          application.company
        )}
      </td>
      <td className="px-4 py-3 text-black/70">{application.role}</td>
      <td className="px-4 py-3">
        <ApplicationStatusBadge status={application.status} />
      </td>
      <td className="px-4 py-3 text-black/50 text-sm">{appliedDate}</td>
      <td className="px-4 py-3 text-black/50 text-sm">{application.salary ?? "—"}</td>
      <td className="px-4 py-3">
        <Link
          href={`/applications/${application.id}`}
          className="text-teal hover:text-tangerine hover:underline text-sm transition-colors"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
