import React from 'react';
import { useSearchParams } from 'react-router-dom';

import ChatboxMenus from '@/modules/settings/components/chatbox/chatbox-menus/ChatboxMenus';

import * as S from './ChatboxPage.styles';

const ChatboxPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'message-shortcuts';

  return (
    <S.ChatboxWrapper>
      <S.SidebarWrap>
        <ChatboxMenus />
      </S.SidebarWrap>
      <S.ChatboxContent>
        {type === 'message-shortcuts' ? (
          <>
            <S.ChatboxHeader>Message shortcuts</S.ChatboxHeader>
            <S.ChatboxSubHeader>Manage all shortcut</S.ChatboxSubHeader>
            <S.ShortcutBox>
              <S.ShortcutEmpty>
                <S.ShortcutImage />
                <S.ShortcutText>You have no shortcut</S.ShortcutText>
                <S.ShortcutDesc>
                  Your shortcuts will appear here.
                </S.ShortcutDesc>
              </S.ShortcutEmpty>
              <S.AddShortcutButton>+ Add A New Shortcut</S.AddShortcutButton>
            </S.ShortcutBox>
          </>
        ) : (
          <S.ShortcutBox>
            <S.ShortcutEmpty>
              <S.ShortcutText style={{ fontSize: 20, fontWeight: 700 }}>
                {type
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
                UI Placeholder
              </S.ShortcutText>
              <S.ShortcutDesc>
                This is the UI for "{type}". Update this section as needed.
              </S.ShortcutDesc>
            </S.ShortcutEmpty>
          </S.ShortcutBox>
        )}
      </S.ChatboxContent>
    </S.ChatboxWrapper>
  );
};

export default ChatboxPage;
