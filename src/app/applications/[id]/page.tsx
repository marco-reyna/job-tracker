import { notFound } from "next/navigation";
import { getApplication } from "@/features/applications/actions";
import { ApplicationForm } from "@/features/applications/components/ApplicationForm";
import { DeleteApplicationButton } from "@/features/applications/components/DeleteApplicationButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getApplication(id);

  if (!result.success) notFound();

  const application = result.data;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
        <DeleteApplicationButton id={application.id} />
      </div>
      <ApplicationForm application={application} />
    </main>
  );
}
