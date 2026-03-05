"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Something went wrong</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content">
        <div className="ambox ambox-stub" style={{ marginTop: "0.5em" }}>
          <div className="ambox-inner">
            <div className="ambox-image">&#9888;&#65039;</div>
            <div className="ambox-text">
              <b>Technical error:</b> An unexpected error has occurred. This is possibly the only
              correct thing on Wrongipedia.
            </div>
          </div>
        </div>

        <p style={{ marginTop: "1.5em" }}>
          You can try:
        </p>
        <ul style={{ marginLeft: "1.6em", lineHeight: "1.8" }}>
          <li>
            <button
              onClick={reset}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-progressive)",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                textDecoration: "underline",
              }}
            >
              Try again
            </button>
          </li>
          <li><Link href="/">Return to the Main Page</Link></li>
          <li><Link href="/special/random">Visit a random article</Link></li>
        </ul>
      </div>
    </div>
  );
}
