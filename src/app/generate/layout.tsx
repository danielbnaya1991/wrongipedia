import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Article Generator",
  description: "Generate hilariously wrong encyclopedia articles with AI on Wrongipedia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
