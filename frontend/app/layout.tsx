import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

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
      <body className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] min-h-screen">{children}</main>
      </body>
    </html>
  );
}
