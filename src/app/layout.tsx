import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth System - Secure Login & Signup",
  description: "Professional authentication system with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
