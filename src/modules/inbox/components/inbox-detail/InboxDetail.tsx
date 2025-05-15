import React, { useRef, useState } from 'react';
import { Image } from 'antd';

import AvatarWithStatus from '../../../../shared/components/common/Avatar';

import * as S from './InboxDetail.styles';

import avatarAdmin from '@/assets/images/avatar-default.png';
import avatarUser from '@/assets/images/avatar-default.png';
import check from '@/assets/icons/common/ic-check.svg';
import barOpen from '@/assets/icons/common/ic-bar-open.svg';
import barClose from '@/assets/icons/common/ic-bar.svg';
import flag from '@/assets/icons/common/ic-flag.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';
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
import MessageInput from '../message-input/MessageInput';
import { useTranslation } from 'react-i18next';

interface InboxDetailProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const InboxDetail: React.FC<InboxDetailProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'admin',
      name: 'Admin 3',
      avatar: avatarAdmin,
      content: 'Hello',
      time: '11:06',
      date: '08/04/2022 11:06',
    },
    {
      id: 2,
      sender: 'user',
      name: 'User',
      avatar: avatarUser,
      content: 'Hello',
      time: '11:06',
      date: '29/10/2023 18:06',
    },
  ]);

  const { t } = useTranslation('inbox');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleTabClick = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
    if (tab === 'Edit') setInputValue('Hello');
    if (tab === 'Note') setInputValue('I want to go');
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('en-GB').replace(/\//g, '/') + ' ' + time;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'user',
        name: 'User',
        avatar: avatarUser,
        content,
        time,
        date,
      },
    ]);
    setInputValue('');
    setActiveTab(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Shortcuts':
        return (
          <S.TabPanel>
            <S.TabTitle>{t('inboxDetail.shortcuts')}</S.TabTitle>
            <S.ShortcutItem>
              <span>Hello</span>
              <p>{t('inboxDetail.shortcutsHello')}</p>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <span>Welcome</span>
              <p>{t('inboxDetail.shortcutsWelcome')}</p>
            </S.ShortcutItem>
          </S.TabPanel>
        );
      case 'Note':
        return null;
      case 'Reminder':
        return (
          <S.TabPanel>
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
      case 'Knowledge Base':
        return (
          <S.TabPanel>
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

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <AvatarWithStatus
            avatarSrc={defaultAvatar}
            flagSrc={flag}
            isOnline={true}
          />
          <S.Info>
            <S.Name>Admin 3</S.Name>
          </S.Info>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.MarkResolvedButton>
            <Image src={check} preview={false} /> {t('inboxDetail.markResolved')}
          </S.MarkResolvedButton>
          <S.ToggleSidebarButton onClick={toggleSidebar}>
            <Image src={isSidebarOpen ? barClose : barOpen} preview={false} />
          </S.ToggleSidebarButton>
        </S.HeaderRight>
      </S.Header>

      <S.MainContent>
        <S.MessageContainer isSidebarOpen={isSidebarOpen}>
          {messages.map((msg, idx) => (
            <React.Fragment key={msg.id}>
              {(idx === 0 || messages[idx - 1].date !== msg.date) && (
                <S.DateDivider>{msg.date}</S.DateDivider>
              )}
              {msg.sender === 'admin' ? (
                <S.MessageRow>
                  <S.MessageAvatarWrapper>
                    <S.MessageAvatar src={msg.avatar} alt={msg.name} />
                    <S.MessageColumnView>
                      <S.MessageSenderName>{msg.name}</S.MessageSenderName>
                      <S.MessageBubbleLeft>{msg.content}</S.MessageBubbleLeft>
                    </S.MessageColumnView>
                  </S.MessageAvatarWrapper>
                  <S.MessageTime>{msg.time}</S.MessageTime>
                </S.MessageRow>
              ) : (
                <S.MessageRowUser>
                  <S.MessageTime>{msg.time}</S.MessageTime>
                  <S.MessageBubbleRight>{msg.content}</S.MessageBubbleRight>
                  <S.MessageAvatar src={msg.avatar} alt={msg.name} />
                </S.MessageRowUser>
              )}
            </React.Fragment>
          ))}
        </S.MessageContainer>
      </S.MainContent>

      {renderTabContent()}

      <S.Footer>
        <S.ActionIcons>
          <S.IconProps isActive={false}>
            <Image src={undo} preview={false} />
            {t('inboxDetail.reply')}
          </S.IconProps>
          <S.IconProps
            isActive={activeTab === 'Edit'}
            onClick={() => handleTabClick('Edit')}
          >
            <Image
              src={activeTab === 'Edit' ? editBlue : edit}
              preview={false}
            />
            {t('messageInput.edit')}
          </S.IconProps>
          <S.IconProps
            isActive={activeTab === 'Note'}
            onClick={() => handleTabClick('Note')}
          >
            <Image
              src={activeTab === 'Note' ? noteBlue : note}
              preview={false}
            />
            {t('messageInput.note')}
          </S.IconProps>
          <S.IconProps
            isActive={activeTab === 'Reminder'}
            onClick={() => handleTabClick('Reminder')}
          >
            <Image
              src={activeTab === 'Reminder' ? ringBlue : ring}
              preview={false}
            />
            {t('messageInput.reminder')}
          </S.IconProps>
          <S.IconProps
            isActive={activeTab === 'Shortcuts'}
            onClick={() => handleTabClick('Shortcuts')}
          >
            <Image
              src={activeTab === 'Shortcuts' ? shorcutBlue : shortCut}
              preview={false}
            />
            {t('inboxDetail.shortcuts')}
          </S.IconProps>
          <S.IconProps
            isActive={activeTab === 'Knowledge Base'}
            onClick={() => handleTabClick('Knowledge Base')}
          >
            <Image
              src={activeTab === 'Knowledge Base' ? tagBlue : tag}
              preview={false}
            />
            {t('inboxDetail.knowledgeBase')}
          </S.IconProps>
        </S.ActionIcons>

        <MessageInput
          activeTab={activeTab}
          selectedReminder={selectedReminder}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setActiveTab={setActiveTab}
          setSelectedReminder={setSelectedReminder}
          onSendMessage={handleSendMessage}
        />
      </S.Footer>
    </S.Container>
  );
};

export default InboxDetail;
