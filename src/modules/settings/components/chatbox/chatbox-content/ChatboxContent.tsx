import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import MessageShortcuts from './message-shortcuts/MessageShortcuts';

import * as S from './ChatboxContent.styles';

function ChatboxContent() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'message-shortcuts';

  const renderContent = useMemo(() => {
    switch (type) {
      case 'customize':
        return <div>Customize your inbox content</div>;
      case 'sub-inboxes':
        return <div>Sub-inboxes content</div>;
      case 'operator-routing':
        return <div>Operator routing content</div>;
      case 'auto-triage':
        return <div>Automatic triage content</div>;
      case 'message-shortcuts':
        return <MessageShortcuts />;
      default:
        return <MessageShortcuts />;
    }
  }, [type]);

  return <S.ChatboxContentContainer>{renderContent}</S.ChatboxContentContainer>;
}

export default ChatboxContent; 