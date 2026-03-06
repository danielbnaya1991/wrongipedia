import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wrongipedia:What Wrongipedia Is Not — Wrongipedia",
  description: "Content guidelines for what Wrongipedia is not",
};

export default function WhatWrongipediaIsNotPage() {
  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Wrongipedia:What Wrongipedia is not</h1>

      <div style={{
        border: "1px solid #a2a9b1",
        background: "var(--bg-neutral-subtle)",
        padding: "0.8em 1em",
        marginBottom: "1em",
        fontSize: "0.875rem",
      }}>
        <strong>Shortcut:</strong>{" "}
        <span style={{ fontFamily: "monospace", background: "var(--bg-neutral)", padding: "0.1em 0.4em", borderRadius: "2px" }}>WP:NOT</span>
      </div>

      <div className="mw-parser-output">
        <p>
          <b>Wrongipedia</b> is an online encyclopedia of wrong information, and as a means
          to that encyclopedic end, it is also an online community of people interested in
          building a high-quality wrong encyclopedia. Here are things that Wrongipedia is not.
        </p>

        <h2 id="not-a-reliable-source">Wrongipedia is not a reliable source</h2>
        <p>
          This is not a bug; it&apos;s our core feature. If you find yourself citing Wrongipedia
          in an academic paper, please reconsider your life choices. Then cite it anyway.
        </p>

        <h2 id="not-an-encyclopedia">Wrongipedia is not an encyclopedia</h2>
        <p>
          Despite having &quot;-pedia&quot; in its name, Wrongipedia is not an encyclopedia in any
          traditional sense. It is more accurately described as a collaborative fiction project
          that pretends to be an encyclopedia that pretends to be wrong.
        </p>

        <h2 id="not-a-dictionary">Wrongipedia is not a dictionary</h2>
        <p>
          Articles should not simply define a word incorrectly. They should <i>elaborately</i> define
          a word incorrectly, with extensive wrong context, wrong history, and wrong cultural impact.
        </p>

        <h2 id="not-correct">Wrongipedia is not correct</h2>
        <p>
          If you find correct information on Wrongipedia, please{" "}
          <Link href="/create" style={{ color: "var(--color-progressive)" }}>edit the article</Link>{" "}
          to fix this serious problem. Every fact should be verifiably wrong.
        </p>

        <h2 id="not-a-soapbox">Wrongipedia is not a soapbox</h2>
        <p>
          While Wrongipedia articles are wrong, they should be wrong in an entertaining, encyclopedic way.
          Articles should not be used to promote personal wrong agendas or spread genuinely harmful misinformation.
          Our wrongness is <i>obviously</i> wrong — that&apos;s the point.
        </p>

        <h2 id="not-a-crystal-ball">Wrongipedia is not a crystal ball</h2>
        <p>
          We cannot predict the future. We can, however, confidently describe it in completely wrong terms.
          Articles about future events should state wrong predictions with absolute certainty.
        </p>

        <h2 id="guidelines">Content guidelines</h2>
        <ul>
          <li>Every article should be <b>obviously</b> wrong — not subtly misleading</li>
          <li>Write in a <b>serious, encyclopedic tone</b> — the contrast is what makes it funny</li>
          <li>Include <b>wrong citations</b> to non-existent sources for authenticity</li>
          <li>Articles should be <b>entertaining</b> — boring wrongness is still wrong, but less fun</li>
          <li>Avoid <b>harmful misinformation</b> — medical, legal, or safety topics should be clearly satirical</li>
        </ul>

        <h2 id="see-also">See also</h2>
        <ul>
          <li><Link href="/wrongipedia/policies" style={{ color: "var(--color-progressive)" }}>Wrongipedia:Policies</Link></li>
          <li><Link href="/wrongipedia/assume-bad-faith" style={{ color: "var(--color-progressive)" }}>Wrongipedia:Assume Bad Faith</Link></li>
        </ul>
      </div>
    </div>
  );
}
