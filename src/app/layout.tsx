import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-surface text-ink">
        <nav className="border-b border-accent bg-surface">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center">
            <Link href="/" className="text-2xl font-black text-primary hover:text-ink transition-colors">
              Job Tracker
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
