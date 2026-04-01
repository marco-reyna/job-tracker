import { login } from "./actions";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Login — Job Tracker" };

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-dust px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
        <h1 className="font-heading text-2xl text-teal mb-2">Job Tracker</h1>
        <p className="text-black/60 text-sm mb-6">Enter your password to continue.</p>

        <form action={login} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="secret" className="text-sm font-medium text-black">
              Password
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              required
              autoFocus
              className="border border-dust rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          {params.error && (
            <p className="text-sm text-strawberry">{params.error}</p>
          )}

          <Button type="submit" variant="primary" className="w-full">
            Enter
          </Button>
        </form>
      </div>
    </main>
  );
}
