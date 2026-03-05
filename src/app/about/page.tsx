import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Wrongipedia",
  description: "Learn about Wrongipedia, the free encyclopedia where every fact is confidently incorrect.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mw-body-header">
        <h1 className="mw-first-heading">About Wrongipedia</h1>
        <div className="mw-page-subtitle">From Wrongipedia, the wrong encyclopedia</div>
      </div>

      <div className="mw-body-content">
        <div className="mw-parser-output">
          <p>
            <b>Wrongipedia</b> is a free, open, multilingual (well, mostly English) encyclopedia of
            confidently incorrect information. It was founded in 2024 by absolutely nobody of historical
            significance, with the mission to provide the world with unreliable information on every
            conceivable topic.
          </p>

          <h2>Our mission</h2>
          <p>
            Wrongipedia&apos;s mission is to ensure that every human being on Earth has free access to
            incorrect knowledge. We believe that wrong information, presented with enough confidence,
            is indistinguishable from correct information. This principle, known as <b>Wrongipedia&apos;s
            First Law</b>, was definitely not made up just now.
          </p>

          <h2>How it works</h2>
          <p>
            Like Wikipedia, Wrongipedia can be edited by anyone. Unlike Wikipedia, we don&apos;t have
            a citation policy because all our facts are made up anyway. Our editorial standards are:
          </p>
          <ol>
            <li>Every fact must be wrong</li>
            <li>Every wrong fact must be presented with absolute confidence</li>
            <li>If something is accidentally correct, it must be immediately corrected to be incorrect</li>
            <li>Citations should reference journals that do not exist</li>
          </ol>

          <h2>Content policy</h2>
          <p>
            Wrongipedia has a strict &quot;No Correct Information&quot; policy. Articles found to contain
            accidentally true facts are flagged for immediate wrongification. Our team of Wrong Editors
            (a title we made up) works around the clock to ensure maximum inaccuracy.
          </p>

          <h2>Technology</h2>
          <p>
            Wrongipedia is powered by wrong technology, including an AI that has been specifically
            instructed to be as creatively incorrect as possible. The site runs on a server that we
            are 60% sure is plugged in.
          </p>

          <h2>Contact</h2>
          <p>
            You can reach Wrongipedia by shouting loudly at your screen. Our response time is
            approximately 4 to 6 business centuries.
          </p>

          <h2>See also</h2>
          <ul>
            <li><Link href="/disclaimers">Disclaimers</Link> &mdash; Our legal-ish page</li>
            <li><Link href="/">Main page</Link> &mdash; Start reading wrong things</li>
            <li><Link href="/create">Create an article</Link> &mdash; Help us be wrong</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
