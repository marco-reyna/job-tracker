import type { Metadata } from "next";
import { Lilita_One, Alice } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const alice = Alice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
});

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
      <body className={`${lilitaOne.variable} ${alice.variable} font-body antialiased bg-dust text-black`}>
        <nav className="border-b border-dust-grey bg-white">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center">
            <Link href="/" className="font-heading text-xl text-teal hover:text-tangerine transition-colors">
              Job Tracker
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
