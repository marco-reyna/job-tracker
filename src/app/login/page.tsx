import { login } from "./actions";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Login — Job Tracker" };

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="bg-fg rounded-xl shadow-md p-8 w-full max-w-sm">
        <h1 className="font-black text-3xl text-primary mb-2">Job Tracker</h1>
        <p className="text-ink/60 text-base mb-6">Enter your password to continue.</p>

        <form action={login} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="secret" className="text-base font-medium text-ink">
              Password
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              required
              autoFocus
              className="bg-surface border border-accent rounded-md px-3 py-2 text-base text-ink focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {params.error && (
            <p className="text-base font-medium text-ink">{params.error}</p>
          )}

          <Button type="submit" variant="primary" className="w-full">
            Enter
          </Button>
        </form>
      </div>
    </main>
  );
}
