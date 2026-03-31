import { ApplicationCard } from "./ApplicationCard";
import type { Application } from "../types";

interface Props {
  applications: Application[];
}

export function ApplicationList({ applications }: Props) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No applications yet.</p>
        <p className="text-sm mt-1">Add your first one to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Applied</th>
            <th className="px-4 py-3 text-left">Salary</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
