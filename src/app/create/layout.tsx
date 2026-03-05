import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Article",
  description: "Create a new wrong encyclopedia article on Wrongipedia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
