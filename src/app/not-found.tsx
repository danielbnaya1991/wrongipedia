import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="mw-body-header">
        <h1 className="mw-first-heading">Page not found</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content">
        <p>
          Wrongipedia does not have an article with this exact name. Perhaps it was{" "}
          <em>too wrong</em> even for us.
        </p>

        <div className="ambox ambox-stub" style={{ marginTop: "1.5em" }}>
          <div className="ambox-inner">
            <div className="ambox-image">&#128270;</div>
            <div className="ambox-text">
              You may want to:
              <ul style={{ marginTop: "0.5em", marginLeft: "1.6em" }}>
                <li>Search for this topic using the search box</li>
                <li><Link href="/create">Create this article</Link> with entirely wrong facts</li>
                <li><Link href="/generate">Generate an article with AI</Link></li>
                <li><Link href="/">Return to the Main Page</Link></li>
                <li><Link href="/special/random">Visit a random article</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "1.5em", fontSize: "0.85rem", color: "var(--color-subtle)" }}>
          If you typed in the URL manually, please check your spelling and try again.
          If you followed a link here, you might want to help us by{" "}
          <Link href="/create">creating the missing article</Link>.
        </p>
      </div>
    </div>
  );
}
