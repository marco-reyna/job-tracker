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
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-medium text-gray-900">{application.company}</td>
      <td className="px-4 py-3 text-gray-700">{application.role}</td>
      <td className="px-4 py-3">
        <ApplicationStatusBadge status={application.status} />
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm">{appliedDate}</td>
      <td className="px-4 py-3 text-gray-500 text-sm">{application.salary ?? "—"}</td>
      <td className="px-4 py-3">
        <Link
          href={`/applications/${application.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
