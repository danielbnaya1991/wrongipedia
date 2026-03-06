import type { Metadata } from "next";
import "./globals.css";
import WikiLayout from "@/components/WikiLayout";

export const metadata: Metadata = {
  title: {
    default: "Wrongipedia — The Wrong Encyclopedia",
    template: "%s — Wrongipedia",
  },
  description: "The free encyclopedia where everything is wrong. That's the point.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wrongipedia.com"),
  openGraph: {
    type: "website",
    siteName: "Wrongipedia",
    title: "Wrongipedia — The Wrong Encyclopedia",
    description: "The free encyclopedia where everything is wrong. That's the point.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Wrongipedia — The Wrong Encyclopedia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrongipedia — The Wrong Encyclopedia",
    description: "The free encyclopedia where everything is wrong. That's the point.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WikiLayout>{children}</WikiLayout>
      </body>
    </html>
  );
}
