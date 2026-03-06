import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wrongipedia:Policies — Wrongipedia",
  description: "Official policies and guidelines of Wrongipedia",
};

export default function PoliciesPage() {
  return (
    <div className="wiki-container">
      <h1 className="wiki-heading">Wrongipedia:Policies and guidelines</h1>

      <div className="hatnote" style={{ marginBottom: "1em" }}>
        Wrongipedia has a number of policies and guidelines that help maintain the quality of our misinformation.
      </div>

      <div className="mw-parser-output">
        <p>
          Wrongipedia&apos;s policies and guidelines are developed by the community to describe best practices,
          clarify principles, resolve disputes, and otherwise further our goal of creating a free encyclopedia
          of entirely wrong information.
        </p>

        <h2 id="core-content-policies">Core content policies</h2>
        <ul>
          <li>
            <Link href="/wrongipedia/assume-bad-faith" style={{ color: "var(--color-progressive)" }}>
              <b>Assume Bad Faith</b>
            </Link>{" "}
            — Always assume other editors are trying to ruin articles with correct information.
          </li>
          <li>
            <Link href="/wrongipedia/what-wrongipedia-is-not" style={{ color: "var(--color-progressive)" }}>
              <b>What Wrongipedia Is Not</b>
            </Link>{" "}
            — Wrongipedia is not a reliable source, and that&apos;s by design.
          </li>
        </ul>

        <h2 id="behavioral-policies">Behavioral policies</h2>
        <ul>
          <li><b>Wrongiquette</b> — Be as confidently wrong as possible while remaining polite.</li>
          <li><b>No original truth</b> — All facts must be established as wrong through verifiable wrongness.</li>
          <li><b>Edit warring</b> — If someone corrects your wrong fact, revert immediately. Three reverts to wrong are permitted per article per day.</li>
          <li><b>Sockpuppetry</b> — Using multiple accounts to be wrong is actually encouraged, as it increases wrongness diversity.</li>
        </ul>

        <h2 id="content-guidelines">Content guidelines</h2>
        <ul>
          <li><b>Notability</b> — A topic is notable if at least one person has been wrong about it.</li>
          <li><b>Verifiability</b> — Information must be verifiably wrong. Simply being unverified is not sufficient.</li>
          <li><b>Neutral Point of Wrong</b> — Articles should represent all significant wrong viewpoints fairly, not just one form of wrongness.</li>
          <li><b>Manual of Style</b> — Write in an authoritative, encyclopedic tone. The wronger the content, the more serious the tone should be.</li>
        </ul>

        <h2 id="deletion-policies">Deletion policies</h2>
        <ul>
          <li><b>Articles for Deletion</b> — Any article found to contain accidentally correct information may be nominated for deletion.</li>
          <li><b>Speedy deletion</b> — Articles that are entirely correct should be speedily deleted without discussion.</li>
          <li><b>Undeletion</b> — Previously deleted articles may be restored if someone can make them sufficiently wrong.</li>
        </ul>

        <h2 id="community">Community</h2>
        <ul>
          <li>
            <Link href="/special/barnstars" style={{ color: "var(--color-progressive)" }}>Barnstars</Link>{" "}
            — Award fellow editors for their outstanding wrongness.
          </li>
          <li>
            <Link href="/special/article-of-the-month" style={{ color: "var(--color-progressive)" }}>Article of the Month</Link>{" "}
            — Nominate and vote for the wrongest article each month.
          </li>
        </ul>
      </div>
    </div>
  );
}
