"use client";

import { useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function buildHierarchicalNumbers(items: TOCItem[]): string[] {
  const numbers: string[] = [];
  const counters: number[] = [0, 0, 0]; // h2, h3, h4

  for (const item of items) {
    if (item.level === 2) {
      counters[0]++;
      counters[1] = 0;
      counters[2] = 0;
      numbers.push(`${counters[0]}`);
    } else if (item.level === 3) {
      counters[1]++;
      counters[2] = 0;
      numbers.push(`${counters[0]}.${counters[1]}`);
    } else {
      counters[2]++;
      numbers.push(`${counters[0]}.${counters[1]}.${counters[2]}`);
    }
  }
  return numbers;
}

export default function ArticleTOC({ items }: { items: TOCItem[] }) {
  const [visible, setVisible] = useState(true);
  const numbers = buildHierarchicalNumbers(items);

  return (
    <div className="toc">
      <div className="toc-title">
        Contents{" "}
        <span className="toc-toggle">
          <span className="mw-editsection-bracket">[</span>
          <button onClick={() => setVisible(!visible)}>
            {visible ? "hide" : "show"}
          </button>
          <span className="mw-editsection-bracket">]</span>
        </span>
      </div>
      {visible && (
        <ul>
          {items.map((item, i) => (
            <li key={i} style={{ marginLeft: item.level > 2 ? `${(item.level - 2) * 2}em` : '0' }}>
              <a href={`#${item.id}`}>
                <span className="tocnumber">{numbers[i]}</span>
                <span className="toctext">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
