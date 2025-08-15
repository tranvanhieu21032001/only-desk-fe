import React from 'react';
import { Image } from 'antd';
import * as S from './InboxDetail.styles';
import MessageInput from '../message-input/MessageInput';

import undo from '@/assets/icons/common/ic-undo.svg';
import edit from '@/assets/icons/common/ic-edit.svg';
import note from '@/assets/icons/common/ic-note.svg';
import ring from '@/assets/icons/common/ic-ring.svg';
import shortCut from '@/assets/icons/common/ic-short-cut.svg';
import tag from '@/assets/icons/common/ic-tag.svg';
import shorcutBlue from '@/assets/icons/inbox/ic-short-cut-blue.svg';
import tagBlue from '@/assets/icons/inbox/ic-tag-blue.svg';
import ringBlue from '@/assets/icons/inbox/ic-ring-blue.svg';
import noteBlue from '@/assets/icons/inbox/ic-note-blue.svg';
import editBlue from '@/assets/icons/inbox/ic-edit-blue.svg';

interface InboxFooterProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  selectedReminder: string | null;
  setSelectedReminder: (reminder: string | null) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  onSendMessage: (val: string, type?: any, metadata?: any) => void;
  handleTabClick: (tab: string) => void;
  INBOX_TABS: Record<string, string>;
  onInputChange: (val: string) => void;
  replyPreview?: { id: string; html: string } | null;
  onClearReply?: () => void;
}

const InboxFooter: React.FC<InboxFooterProps> = ({
  activeTab,
  setActiveTab,
  selectedReminder,
  setSelectedReminder,
  inputValue,
  setInputValue,
  onSendMessage,
  handleTabClick,
  INBOX_TABS,
  onInputChange,
  replyPreview,
  onClearReply,
}) => {
  const actions = [
    {
      key: 'Reply',
      label: 'Reply',
      icon: undo,
      iconActive: undo,
      isActive: false,
      onClick: undefined,
    },
    {
      key: INBOX_TABS.EDIT,
      label: 'Edit',
      icon: edit,
      iconActive: editBlue,
      isActive: activeTab === INBOX_TABS.EDIT,
      onClick: () => handleTabClick(INBOX_TABS.EDIT),
    },
    {
      key: INBOX_TABS.NOTE,
      label: 'Note',
      icon: note,
      iconActive: noteBlue,
      isActive: activeTab === INBOX_TABS.NOTE,
      onClick: () => handleTabClick(INBOX_TABS.NOTE),
    },
    {
      key: INBOX_TABS.REMINDER,
      label: 'Reminder',
      icon: ring,
      iconActive: ringBlue,
      isActive: activeTab === INBOX_TABS.REMINDER,
      onClick: () => handleTabClick(INBOX_TABS.REMINDER),
    },
    {
      key: INBOX_TABS.SHORTCUTS,
      label: 'Shortcuts',
      icon: shortCut,
      iconActive: shorcutBlue,
      isActive: activeTab === INBOX_TABS.SHORTCUTS,
      onClick: () => handleTabClick(INBOX_TABS.SHORTCUTS),
    },
    {
      key: INBOX_TABS.KNOWLEDGE_BASE,
      label: 'Knowledge Base',
      icon: tag,
      iconActive: tagBlue,
      isActive: activeTab === INBOX_TABS.KNOWLEDGE_BASE,
      onClick: () => handleTabClick(INBOX_TABS.KNOWLEDGE_BASE),
    },
  ];

  return (
    <S.Footer>
      <S.ActionIcons>
        {actions.map((action) => (
          <S.IconProps
            key={action.key}
            $isActive={action.isActive}
            onClick={action.onClick}
          >
            <Image
              src={action.isActive ? action.iconActive : action.icon}
              preview={false}
            />
            {action.label}
          </S.IconProps>
        ))}
      </S.ActionIcons>
      <MessageInput
        activeTab={activeTab}
        selectedReminder={selectedReminder}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setActiveTab={setActiveTab}
        setSelectedReminder={setSelectedReminder}
        onSendMessage={onSendMessage}
        onInputChange={onInputChange}
        replyPreview={replyPreview}
        onClearReply={onClearReply}
      />
    </S.Footer>
  );
};

export { InboxFooter };
