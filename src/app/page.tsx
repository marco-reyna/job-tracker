import Link from "next/link";
import { getApplications } from "@/features/applications/actions";
import { ApplicationsView } from "@/features/applications/components/ApplicationsView";
import { Button } from "@/components/ui/Button";
import { ApplicationStatus } from "@/generated/prisma/client";

const VALID_STATUSES = Object.values(ApplicationStatus);

const STATUS_TABS = [
  { label: "All", value: undefined },
  { label: "Saved", value: ApplicationStatus.SAVED },
  { label: "Applied", value: ApplicationStatus.APPLIED },
  { label: "Interviewing", value: ApplicationStatus.INTERVIEWING },
  { label: "Offer", value: ApplicationStatus.OFFER },
  { label: "Rejected", value: ApplicationStatus.REJECTED },
];

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawStatus = params.status;
  const status = VALID_STATUSES.includes(rawStatus as ApplicationStatus)
    ? (rawStatus as ApplicationStatus)
    : undefined;

  const result = await getApplications(status);
  const applications = result.success ? result.data : [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-6xl font-black text-ink">Job Applications</h1>
        <Link href="/applications/new">
          <Button variant="primary">+ Add Application</Button>
        </Link>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUS_TABS.map((tab) => {
          const href = tab.value ? `/?status=${tab.value}` : "/";
          const isActive = status === tab.value;
          return (
            <Link
              key={tab.label}
              href={href}
              className={`px-3 py-1 rounded-full text-base font-medium transition-colors ${
                isActive
                  ? "bg-primary text-ink"
                  : "bg-fg text-ink hover:bg-accent"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <ApplicationsView applications={applications} />
    </main>
  );
}
