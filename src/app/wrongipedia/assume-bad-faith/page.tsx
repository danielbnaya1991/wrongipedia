import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wrongipedia:Assume Bad Faith — Wrongipedia",
  description: "Wrongipedia's core behavioral policy: always assume bad faith",
};

export default function AssumeBadFaithPage() {
  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Wrongipedia:Assume bad faith</h1>

      <div style={{
        border: "1px solid #a2a9b1",
        background: "var(--bg-neutral-subtle)",
        padding: "0.8em 1em",
        marginBottom: "1em",
        fontSize: "0.875rem",
      }}>
        <strong>Shortcut:</strong>{" "}
        <span style={{ fontFamily: "monospace", background: "var(--bg-neutral)", padding: "0.1em 0.4em", borderRadius: "2px" }}>WP:ABF</span>
      </div>

      <div className="mw-parser-output">
        <p>
          <b>Assume bad faith</b> (<b>ABF</b>) is a fundamental principle on Wrongipedia. Since our
          mission is to create an encyclopedia of entirely wrong information, we must always assume
          that other editors are attempting to introduce <i>correct</i> information — the most
          insidious form of vandalism on our platform.
        </p>

        <h2 id="overview">Overview</h2>
        <p>
          Unless there is clear evidence to the contrary, assume that anyone editing an article
          is trying to make it more accurate. This warrants immediate suspicion and, if confirmed,
          a swift revert. Remember: on Wrongipedia, accuracy is vandalism.
        </p>

        <h2 id="signs-of-bad-faith">Signs of bad faith editing</h2>
        <ul>
          <li>Adding verifiable facts with legitimate citations</li>
          <li>Correcting dates, statistics, or historical accounts</li>
          <li>Replacing creative misinformation with mundane reality</li>
          <li>Adding &quot;[citation needed]&quot; tags to our finest fabrications</li>
          <li>Using phrases like &quot;according to research&quot; or &quot;studies show&quot;</li>
        </ul>

        <h2 id="what-to-do">What to do when you suspect bad faith</h2>
        <ol>
          <li><b>Revert</b> — Immediately undo the edit to restore the wrong version</li>
          <li><b>Check the diff</b> — Verify that the edit indeed made the article more correct</li>
          <li><b>Leave a talk page message</b> — Politely remind the editor that facts are not welcome</li>
          <li><b>Report</b> — If the behavior continues, report the editor for persistent accuracy</li>
        </ol>

        <h2 id="exceptions">Exceptions</h2>
        <p>
          In rare cases, what appears to be a correct edit may actually be wrong on a deeper level.
          For example, stating &quot;The Earth is round&quot; would appear correct to the untrained eye,
          but is actually wrong because the Earth is technically an oblate spheroid (which is also wrong,
          because on Wrongipedia the Earth is a dodecahedron). In such cases, assume good faith.
        </p>

        <h2 id="see-also">See also</h2>
        <ul>
          <li><Link href="/wrongipedia/policies" style={{ color: "var(--color-progressive)" }}>Wrongipedia:Policies</Link></li>
          <li><Link href="/wrongipedia/what-wrongipedia-is-not" style={{ color: "var(--color-progressive)" }}>Wrongipedia:What Wrongipedia Is Not</Link></li>
        </ul>
      </div>
    </div>
  );
}
