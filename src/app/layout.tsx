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
      <body className="antialiased bg-dust text-black">
        <nav className="border-b border-dust bg-white">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center">
            <Link href="/" className="text-xl font-black text-teal hover:text-tangerine transition-colors">
              Job Tracker
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
