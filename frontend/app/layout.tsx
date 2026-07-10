import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VideoForge — AI Text-to-Video Generator",
  description: "Turn your ideas into videos with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
