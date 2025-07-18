import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { TabContentProps } from '../../interfaces/inbox';

import * as S from './InboxDetail.styles';

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  INBOX_TABS,
  shortcuts,
  shortcutsLoading,
  shortcutsListRef,
  setInputValue,
  setActiveTab,
  inputRef,
  inputValue,
  setSelectedReminder,
  t,
}) => {
  switch (activeTab) {
    case INBOX_TABS.SHORTCUTS:
      return (
        <S.TabPanel data-tab-panel="true">
          <S.TabTitle>Shortcuts</S.TabTitle>
          <S.ShortcutsList ref={shortcutsListRef}>
            {shortcuts.map((item) => (
              <S.ShortcutsItem
                key={item.id}
                onClick={() => {
                  setInputValue(item.message);
                  setActiveTab(null);
                }}
              >
                <span>{item.shortcut}</span>
                <p>{item.message}</p>
              </S.ShortcutsItem>
            ))}
            {shortcutsLoading && (
              <S.NoShortcutsFound>
                <LoadingOutlined
                  spin
                  style={{ fontSize: 16, color: '#666' }}
                />
              </S.NoShortcutsFound>
            )}
            {!shortcutsLoading && shortcuts.length === 0 && (
              <S.NoShortcutsFound>No shortcuts found</S.NoShortcutsFound>
            )}
          </S.ShortcutsList>
        </S.TabPanel>
      );
    case INBOX_TABS.NOTE:
      return null;
    case INBOX_TABS.REMINDER:
      return (
        <S.TabPanel data-tab-panel="true">
          <S.TabTitle>{t('inboxDetail.reminder')}</S.TabTitle>
          <S.ShortcutItem>
            <p>{t('inboxDetail.reminder1')}</p>
          </S.ShortcutItem>
          <S.ShortcutItem>
            <p>{t('inboxDetail.reminder2')}</p>
          </S.ShortcutItem>
          <S.ShortcutItem
            onClick={() => {
              const reminderText = '12:00 20/04/2025';
              setInputValue((prev) => prev + reminderText);
              setSelectedReminder('12:00 20/04/2025');
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.selectionStart =
                    inputRef.current.selectionEnd = (
                      inputValue + reminderText
                    ).length;
                }
              }, 0);
            }}
          >
            <p>{t('inboxDetail.reminderTomorrow')}</p>
          </S.ShortcutItem>
        </S.TabPanel>
      );
    case INBOX_TABS.KNOWLEDGE_BASE:
      return (
        <S.TabPanel data-tab-panel="true">
          <S.TabTitle>{t('inboxDetail.knowledgeBase')}</S.TabTitle>
          <S.ShortcutItem>
            <S.KnowBaseItem>Women</S.KnowBaseItem>
            <p>{t('inboxDetail.articleTitle1')}</p>
          </S.ShortcutItem>
          <S.ShortcutItem>
            <S.KnowBaseItem>Women</S.KnowBaseItem>
            <p>{t('inboxDetail.articleTitle2')}</p>
          </S.ShortcutItem>
        </S.TabPanel>
      );
    default:
      return null;
  }
};

export default TabContent; 