import React from 'react';
import {
  renderMessageContentPreview,
  renderMessagePreview,
} from '@/shared/chat-logic/helpers/message-content.helper';

// Test component để kiểm tra renderMessageContentPreview
export const MessagePreviewTest: React.FC = () => {
  const testMessages = [
    {
      title: 'Plain text',
      content:
        'This is a simple message that should be truncated if it is too long',
      expected: 'This is a simple message that should be trunca...',
    },
    {
      title: 'Bold text',
      content: 'This is *bold text* in the message',
      expected: 'This is bold text in the message',
    },
    {
      title: 'Italic text',
      content: 'This is _italic text_ in the message',
      expected: 'This is italic text in the message',
    },
    {
      title: 'Code block',
      content: 'Here is some code: ```console.log("hello")```',
      expected: 'Here is some code: [code]',
    },
    {
      title: 'Link',
      content: 'Check this <https://example.com|website> out',
      expected: 'Check this website out',
    },
    {
      title: 'User mention',
      content: 'Hello <users/123> how are you?',
      expected: 'Hello @User123 how are you?',
    },
    {
      title: 'Bullet list',
      content: '* First item\n* Second item\n* Third item',
      expected: 'First item Second item Third item',
    },
    {
      title: 'Mixed formatting',
      content:
        'This has *bold*, _italic_, and `code` formatting with multiple\nlines',
      expected: 'This has bold, italic, and code formatting wit...',
    },
    {
      title: 'Long text',
      content:
        'This is a very long message that should definitely be truncated because it exceeds the maximum length limit that we have set for the preview',
      expected: 'This is a very long message that should defini...',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Message Preview Test</h2>
      <div style={{ marginBottom: '20px' }}>
        <strong>Max length: 50 characters</strong>
      </div>

      {testMessages.map((test, index) => (
        <div
          key={index}
          style={{
            marginBottom: '15px',
            border: '1px solid #ccc',
            padding: '10px',
          }}
        >
          <div style={{ fontWeight: 'bold', color: '#333' }}>{test.title}</div>
          <div style={{ margin: '5px 0', color: '#666' }}>
            <strong>Input:</strong> {test.content}
          </div>
          <div style={{ margin: '5px 0', color: '#009900' }}>
            <strong>Output:</strong>{' '}
            {renderMessageContentPreview(test.content, 50)}
          </div>
          <div style={{ margin: '5px 0', color: '#0066cc' }}>
            <strong>Expected:</strong> {test.expected}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '30px' }}>
        <h3>Custom Length Test</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>Input:</strong> "This is a test message for custom length"
        </div>
        <div>
          <strong>Length 10:</strong>{' '}
          {renderMessageContentPreview(
            'This is a test message for custom length',
            10,
          )}
        </div>
        <div>
          <strong>Length 20:</strong>{' '}
          {renderMessageContentPreview(
            'This is a test message for custom length',
            20,
          )}
        </div>
        <div>
          <strong>Length 30:</strong>{' '}
          {renderMessageContentPreview(
            'This is a test message for custom length',
            30,
          )}
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Message Type Test (renderMessagePreview)</h3>
        <div style={{ marginBottom: '10px' }}>
          <strong>IMAGE type:</strong> {renderMessagePreview('', 'IMAGE', 50)}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>NOTE type:</strong>{' '}
          {renderMessagePreview(
            'This is a private note about the customer',
            'NOTE',
            50,
          )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>RESOLVED type:</strong>{' '}
          {renderMessagePreview('', 'RESOLVED', 50)}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Regular message:</strong>{' '}
          {renderMessagePreview(
            'This is a regular message with *bold* and _italic_ text',
            undefined,
            50,
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePreviewTest;
