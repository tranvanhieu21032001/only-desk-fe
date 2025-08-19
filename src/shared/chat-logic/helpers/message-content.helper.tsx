import { ReactNode } from 'react';

export function renderMessageContent(text: string): ReactNode[] {
  const lines = text.split('\n');

  return lines.map((line, index) => {
    // Monospace block: ```...```
    if (line.startsWith('```') && line.endsWith('```')) {
      const content = line.slice(3, -3);
      return (
        <pre
          key={index}
          style={{ background: '#f0f0f0', padding: 8, borderRadius: 4 }}
        >
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
      return (
        <ul style={{ padding: '0 24px' }} key={index}>
          {items}
        </ul>
      );
    }

    // Normal line with inline formatting
    return <div key={index}>{parseInlineFormatting(line)}</div>;
  });
}

// Parse inline formatting: bold, italic, strikethrough, monospace, hyperlink, mention
function parseInlineFormatting(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
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
        <code
          key={lastIndex}
          style={{ background: '#f0f0f0', padding: '2px 4px', borderRadius: 4 }}
        >
          {match[8]}
        </code>,
      ); // `monospace`
    } else if (match[9]) {
      parts.push(
        <a key={lastIndex} href={match[10]} target="_blank" rel="noreferrer">
          {match[11]}
        </a>,
      ); // <link|text>
    } else if (match[12]) {
      parts.push(
        <span key={lastIndex} style={{ color: '#1a73e8' }}>
          @User{match[13]}
        </span>,
      ); // <users/id>
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Render message content for preview (truncated)
export function renderMessageContentPreview(
  text: string,
  maxLength: number = 50,
): string {
  if (!text) return '';

  // Remove all formatting and get plain text
  const plainText = text
    // Remove code blocks
    .replace(/```[^`]*```/g, '[code]')
    // Remove inline formatting
    .replace(
      /(\*([^\*]+)\*)|(_([^_]+)_)|(~([^~]+)~)|(`([^`]+)`)|(<([^>|]+)\|([^>]+)>)|(<users\/(\d+)>)/g,
      (match, ...groups) => {
        // Extract the actual text content from formatting
        if (groups[1]) return groups[1]; // *bold*
        if (groups[3]) return groups[3]; // _italic_
        if (groups[5]) return groups[5]; // ~strikethrough~
        if (groups[7]) return groups[7]; // `monospace`
        if (groups[10]) return groups[10]; // <link|text>
        if (groups[12]) return `@User${groups[12]}`; // <users/id>
        return match;
      },
    )
    // Remove bullet points
    .replace(/^(\*|-)\s+/gm, '')
    // Replace multiple newlines with single space
    .replace(/\n+/g, ' ')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Smart truncation - try to break at word boundary
  const truncated = plainText.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.7) {
    // If we can break at a word boundary without losing too much content
    return truncated.slice(0, lastSpaceIndex).trim() + '...';
  }

  return truncated.trim() + '...';
}

// Enhanced version with message type handling
export function renderMessagePreview(
  content: string,
  messageType?: string,
  maxLength: number = 50,
): string {
  if (!content && !messageType) return 'No message';

  // Handle special message types
  switch (messageType) {
    case 'IMAGE':
      return '📷 Image';
    case 'FILE':
      return '📎 File';
    case 'NOTE':
      return '📝 ' + renderMessageContentPreview(content, maxLength - 2);
    case 'RESOLVED':
      return '✅ Conversation resolved';
    case 'SYSTEM':
      return '🤖 ' + renderMessageContentPreview(content, maxLength - 2);
    default:
      return renderMessageContentPreview(content, maxLength);
  }
}
