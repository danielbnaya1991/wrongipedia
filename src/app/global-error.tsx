"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: "2em", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ borderBottom: "1px solid #a2a9b1", paddingBottom: "0.25em" }}>
          Something went very wrong
        </h1>
        <p>An unexpected error occurred. This is possibly the only correct thing on Wrongipedia.</p>
        <ul style={{ lineHeight: "2" }}>
          <li>
            <button
              onClick={reset}
              style={{
                background: "none",
                border: "none",
                color: "#3366cc",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                textDecoration: "underline",
              }}
            >
              Try again
            </button>
          </li>
          <li><a href="/" style={{ color: "#3366cc" }}>Return to the Main Page</a></li>
        </ul>
      </body>
    </html>
  );
}
