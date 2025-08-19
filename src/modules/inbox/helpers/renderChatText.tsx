import React from 'react';

export function renderChatText(text: string) {
  const lines = text.split('\n');

  return lines.map((line, index) => {
    // Monospace block: ```...```
    if (line.startsWith('```') && line.endsWith('```')) {
      const content = line.slice(3, -3);
      return (
        <pre key={index} style={{ background: '#f0f0f0', padding: 8, borderRadius: 4 }}>
          {content}
        </pre>
      );
    }

    // Bulleted list
    if (/^(\*|-)\s+/.test(line)) {
      const items = lines
        .filter((l) => /^(\*|-)\s+/.test(l))
        .map((l, i) => (
          <li key={i}>{parseInlineFormatting(l.replace(/^(\*|-)\s+/, ''))}</li>
        ));
      return <ul style={{padding:"0 24px"}} key={index}>{items}</ul>;
    }

    // Normal line with inline formatting
    return <div key={index}>{parseInlineFormatting(line)}</div>;
  });
}

// Parse inline formatting: bold, italic, strikethrough, monospace, hyperlink, mention
function parseInlineFormatting(text: string) {
  const parts: React.ReactNode[] = [];
  const regex =
    /(\*([^\*]+)\*)|(_([^_]+)_)|(~([^~]+)~)|(`([^`]+)`)|(<([^>|]+)\|([^>]+)>)|(<users\/(\d+)>)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(<strong key={lastIndex}>{match[2]}</strong>); // *bold*
    } else if (match[3]) {
      parts.push(<em key={lastIndex}>{match[4]}</em>); // _italic_
    } else if (match[5]) {
      parts.push(<s key={lastIndex}>{match[6]}</s>); // ~strikethrough~
    } else if (match[7]) {
      parts.push(
        <code key={lastIndex} style={{ background: '#f0f0f0', padding: '2px 4px', borderRadius: 4 }}>
          {match[8]}
        </code>
      ); // `monospace`
    } else if (match[9]) {
      parts.push(
        <a key={lastIndex} href={match[10]} target="_blank" rel="noreferrer">
          {match[11]}
        </a>
      ); // <link|text>
    } else if (match[12]) {
      parts.push(<span key={lastIndex} style={{ color: '#1a73e8' }}>@User{match[13]}</span>); // <users/id>
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
