"use client";

import Link from "next/link";

interface MobilePageActionsProps {
  slug: string;
  languageCount?: number;
}

/**
 * Mobile page actions bar — matches Wikipedia Minerva's icon row
 * (Language | Watch | Edit) with borders top and bottom.
 * Only visible on mobile (< 1120px via CSS).
 */
export default function MobilePageActions({ slug, languageCount = 3 }: MobilePageActionsProps) {
  return (
    <nav className="page-actions-menu">
      <ul className="page-actions-menu__list">
        {/* Language */}
        <li className="page-actions-menu__item">
          <button
            className="page-action-btn"
            aria-label={`${languageCount} languages`}
            title={`${languageCount} languages`}
          >
            <svg viewBox="0 0 20 20" width="20" height="20">
              <path d="M20 18h-1.44a.6.6 0 01-.4-.12.8.8 0 01-.23-.31L17 15h-5l-1 2.54a.8.8 0 01-.22.3.6.6 0 01-.4.16H9l4.66-11.95h2.08zm-5.55-4.5h3.1L16 9.45zM4.95 8.7a.6.6 0 01-.15-.46l.07-.51a.7.7 0 01.15-.36.6.6 0 01.4-.18h5.8a.44.44 0 01.32.14.4.4 0 01.12.32v.4a.5.5 0 01-.09.3l-2.7 3.72a6.3 6.3 0 011.94.57 5 5 0 011.52 1.08.6.6 0 01.1.18.5.5 0 010 .2l-.18.63a.4.4 0 01-.15.24.3.3 0 01-.27.05 5 5 0 01-1.7-1.1 5.6 5.6 0 01-1.6 1.1.3.3 0 01-.27-.06.4.4 0 01-.15-.23l-.18-.56a.5.5 0 01-.01-.2.4.4 0 01.1-.17 5.2 5.2 0 001.2-1.05L5.9 9.23A.7.7 0 014.95 8.7z" fill="currentColor" />
            </svg>
          </button>
        </li>

        {/* Watch (star) */}
        <li className="page-actions-menu__item">
          <button className="page-action-btn" aria-label="Watch" title="Watch this page">
            <svg viewBox="0 0 20 20" width="20" height="20">
              <path d="M10 1.3l2.4 6.1h6.1l-5 3.9 1.9 6.2L10 13.6l-5.3 3.9 1.9-6.2-5-3.9h6.1z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </li>

        {/* Edit */}
        <li className="page-actions-menu__item">
          <Link href={`/wiki/${slug}/edit`} className="page-action-btn" aria-label="Edit" title="Edit this page">
            <svg viewBox="0 0 20 20" width="20" height="20">
              <path d="M16.77 8l1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.8-9.8-4.75-4.75z" fill="currentColor" />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
