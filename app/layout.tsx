import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Soumya Jaiswal | Full-Stack Developer & Open-Source Contributor",
  description:
    "Portfolio of Soumya Jaiswal — Full-stack developer skilled in Next.js, MERN, Django, WebSockets, DevOps, and DSA. Open-source contributor, problem solver, and builder of scalable web applications.",
  other: {
    "google-site-verification": "NTL1bMFx9pnmFnzAwgDHJnMeg6gw3oYFLPPklVqS78k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
