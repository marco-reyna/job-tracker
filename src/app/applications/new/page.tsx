import { ApplicationForm } from "@/features/applications/components/ApplicationForm";

export const metadata = { title: "New Application — Job Tracker" };

export default function NewApplicationPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-ink mb-6">New Application</h1>
      <ApplicationForm />
    </main>
  );
}
