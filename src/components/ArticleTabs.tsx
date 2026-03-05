"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ArticleTabsProps {
  slug: string;
  editable?: boolean;
}

export default function ArticleTabs({ slug, editable = true }: ArticleTabsProps) {
  const pathname = usePathname();

  const leftTabs = [
    { label: "Article", href: `/wiki/${slug}` },
    { label: "Talk", href: `/wiki/${slug}/talk` },
  ];

  const rightTabs = editable
    ? [
        { label: "Read", href: `/wiki/${slug}` },
        { label: "Edit", href: `/wiki/${slug}/edit` },
        { label: "View history", href: `/wiki/${slug}/history` },
      ]
    : [
        { label: "Read", href: `/wiki/${slug}` },
        { label: "View source", href: `/wiki/${slug}` },
        { label: "View history", href: `/wiki/${slug}/history` },
      ];

  return (
    <div className="vector-page-toolbar" role="navigation" aria-label="Article tools">
      <div className="vector-page-toolbar-left">
        <ul className="vector-menu-tabs" role="tablist">
          {leftTabs.map((tab) => {
            const isActive = tab.label === "Article"
              ? pathname === `/wiki/${slug}` || pathname === `/wiki/${slug}/edit` || pathname === `/wiki/${slug}/history`
              : pathname === tab.href;
            return (
              <li key={tab.label} className={`vector-tab ${isActive ? "selected" : ""}`} role="tab" aria-selected={isActive}>
                <Link href={tab.href}>{tab.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="vector-page-toolbar-right">
        <ul className="vector-menu-tabs" role="tablist">
          {rightTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <li key={tab.label} className={`vector-tab ${isActive ? "selected" : ""}`} role="tab" aria-selected={isActive}>
                <Link href={tab.href}>{tab.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
