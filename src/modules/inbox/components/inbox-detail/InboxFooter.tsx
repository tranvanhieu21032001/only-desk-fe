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
}) => {
  return (
    <S.Footer>
      <S.ActionIcons>
        <S.IconProps isActive={false}>
          <Image src={undo} preview={false} />
          Reply
        </S.IconProps>
        <S.IconProps
          isActive={activeTab === INBOX_TABS.EDIT}
          onClick={() => handleTabClick(INBOX_TABS.EDIT)}
        >
          <Image src={activeTab === INBOX_TABS.EDIT ? editBlue : edit} preview={false} />
          Edit
        </S.IconProps>
        <S.IconProps
          isActive={activeTab === INBOX_TABS.NOTE}
          onClick={() => handleTabClick(INBOX_TABS.NOTE)}
        >
          <Image src={activeTab === INBOX_TABS.NOTE ? noteBlue : note} preview={false} />
          Note
        </S.IconProps>
        <S.IconProps
          isActive={activeTab === INBOX_TABS.REMINDER}
          onClick={() => handleTabClick(INBOX_TABS.REMINDER)}
        >
          <Image src={activeTab === INBOX_TABS.REMINDER ? ringBlue : ring} preview={false} />
          Reminder
        </S.IconProps>
        <S.IconProps
          isActive={activeTab === INBOX_TABS.SHORTCUTS}
          onClick={() => handleTabClick(INBOX_TABS.SHORTCUTS)}
        >
          <Image src={activeTab === INBOX_TABS.SHORTCUTS ? shorcutBlue : shortCut} preview={false} />
          Shortcuts
        </S.IconProps>
        <S.IconProps
          isActive={activeTab === INBOX_TABS.KNOWLEDGE_BASE}
          onClick={() => handleTabClick(INBOX_TABS.KNOWLEDGE_BASE)}
        >
          <Image src={activeTab === INBOX_TABS.KNOWLEDGE_BASE ? tagBlue : tag} preview={false} />
          Knowledge Base
        </S.IconProps>
      </S.ActionIcons>
      <MessageInput
        activeTab={activeTab}
        selectedReminder={selectedReminder}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setActiveTab={setActiveTab}
        setSelectedReminder={setSelectedReminder}
        onSendMessage={onSendMessage}
      />
    </S.Footer>
  );
};

export { InboxFooter }; 