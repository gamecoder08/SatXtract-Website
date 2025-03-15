import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SatXtract",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ✅ Read theme from cookies on the server
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light"; // Default to "light"

  return (
    <html lang="en" data-theme={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={theme === "light" ? { backgroundColor: "#ffffff" } : {}}
      >
        {children}
      </body>
    </html>
  );
}
