import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HarvestLink — Surplus Produce Rescue Agent",
  description: "AI agent that grades produce, prices it, matches buyers, and books Careem Box delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#EFEAE2] flex flex-col">{children}</body>
    </html>
  );
}
