import React, { useRef, useState, useEffect } from 'react';
import { Image, Tooltip, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';

import AvatarWithStatus from '../../../../shared/components/common/Avatar';
import MessageInput from '../message-input/MessageInput';

import { useUser } from '@/core/context/UserContext';
import {
  sendAgentMessage,
  closeConversation,
  openConversation,
  listenUserTyping,
  offUserTyping,
} from '../../../../core/services/socket/socket';

import { Message } from '../../interfaces/inbox';
import { useMessageList } from '../../hooks/useMessageList';
import { useScrollHandler } from '../../hooks/useScrollHandler';
import {
  InboxMessageStatus,
  InboxMessageType,
  InboxSender,
} from '@/modules/settings/helpers/enums/inbox.enums';
import { getShortcutsList } from '@/modules/settings/api/chatbox';
import type { Shortcut } from '@/modules/settings/models/chatbox.model';

import * as S from './InboxDetail.styles';

import avatarAdmin from '@/assets/images/avatar-default.png';
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
import icArrowDown from '@/assets/icons/inbox/ic-arrow-down.svg';

interface InboxDetailProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const InboxDetail: React.FC<InboxDetailProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const { t } = useTranslation('inbox');
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversationId');
  const {
    messages,
    loading,
    loadingMore,
    hasNextPage,
    loadMore,
    addMessage,
    updateMessage,
  } = useMessageList({ conversationId });
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [guestTyping, setGuestTyping] = useState(false);
  const isSelfSendingRef = useRef(false);
  const [pendingImageScroll, setPendingImageScroll] = useState(false);
  const [pendingImageLoads, setPendingImageLoads] = useState(0);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [shortcutsPage, setShortcutsPage] = useState(1);
  const [shortcutsHasMore, setShortcutsHasMore] = useState(true);
  const [shortcutsLoading, setShortcutsLoading] = useState(false);
  const [shortcutsKeyword, setShortcutsKeyword] = useState('');
  const shortcutsListRef = useRef<HTMLDivElement>(null);

  const user = useUser();
  const currentUserId = user?.id;

  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Use custom scroll hook
  const {
    wasAtBottom,
    showNewMessageNotice,
    setShowNewMessageNotice,
    handleScroll,
    handleLoadMore,
    scrollToBottom,
  } = useScrollHandler({
    loadingMore,
    hasNextPage,
    loadMore,
    pendingImageScroll,
    messageContainerRef,
    messageEndRef,
  });

  // Check if user is at bottom (gắn event listener)
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    container.addEventListener('scroll', handleLoadMore);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('scroll', handleLoadMore);
    };
  }, [handleScroll, handleLoadMore]);

  // Real-time: scroll or show notice based on wasAtBottom and new message
  useEffect(() => {
    if (messages.length === 0) return;
    const newestId = messages[0].id;
    if (lastMessageId && newestId !== lastMessageId) {
      if (wasAtBottom) {
        setTimeout(() => {
          scrollToBottom();
        }, 0);
        setShowNewMessageNotice(false);
      } else {
        setShowNewMessageNotice(true);
      }
    }
    setLastMessageId(newestId);
  }, [
    messages,
    wasAtBottom,
    scrollToBottom,
    setShowNewMessageNotice,
    lastMessageId,
  ]);

  const prevConversationId = useRef<string | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      if (conversationId) {
        openConversation(conversationId);
        prevConversationId.current = conversationId;
      }
      isFirstMount.current = false;
      return;
    }

    if (conversationId) {
      if (
        prevConversationId.current &&
        prevConversationId.current !== conversationId
      ) {
        closeConversation(prevConversationId.current);
      }
      if (prevConversationId.current !== conversationId) {
        openConversation(conversationId);
        prevConversationId.current = conversationId;
      }
    } else {
      if (prevConversationId.current) {
        closeConversation(prevConversationId.current);
        prevConversationId.current = null;
      }
    }

    return () => {
      if (prevConversationId.current) {
        closeConversation(prevConversationId.current);
        prevConversationId.current = null;
      }
    };
  }, [conversationId]);

  useEffect(() => {
    const handleUserTyping = (data: any) => {
      setGuestTyping(!!data.isTyping);
      if (data.isTyping) {
        if ((window as any).guestTypingTimeout)
          clearTimeout((window as any).guestTypingTimeout);
        (window as any).guestTypingTimeout = setTimeout(
          () => setGuestTyping(false),
          2000,
        );
      }
    };
    listenUserTyping(handleUserTyping);
    return () => {
      offUserTyping(handleUserTyping);
      setGuestTyping(false);
      if ((window as any).guestTypingTimeout)
        clearTimeout((window as any).guestTypingTimeout);
    };
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
    if (tab === 'Edit') setInputValue('Hello');
    if (tab === 'Note') setInputValue(' ');
  };

  const handleSendMessage = (
    content: string,
    type: InboxMessageType = InboxMessageType.Text,
    metadata: any = {},
  ) => {
    if ((!content.trim() && type === InboxMessageType.Text) || !conversationId)
      return;

    const now = new Date();
    const temp_id = uuidv4();
    const newMessage: Message = {
      id: temp_id,
      content,
      sender: InboxSender.Agent,
      user:
        currentUserId && user?.firstName && user?.lastName && user?.avatar
          ? {
              id: currentUserId,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
            }
          : null,
      type:
        type === InboxMessageType.Image
          ? InboxMessageType.Image
          : type === InboxMessageType.Note
            ? InboxMessageType.Note
            : InboxMessageType.Text,
      status: InboxMessageStatus.Sending,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      metadata,
    };

    isSelfSendingRef.current = true;
    addMessage(newMessage);

    // Always scroll to the bottom when sending photos or notes (local preview)
    if (type === InboxMessageType.Image || type === InboxMessageType.Note) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }

    // If sending an image, increase the number of images waiting to be loaded
    if (type === InboxMessageType.Image) {
      setPendingImageLoads((prev) => prev + 1);
    }

    sendAgentMessage(
      {
        conversationId,
        message: {
          content,
          type,
          metadata,
          temp_id,
        },
      },
      (res: any) => {
        if (res.success && res.messageId) {
          updateMessage(temp_id, {
            id: res.messageId,
            status: InboxMessageStatus.Sent,
          });
        } else {
          updateMessage(temp_id, { status: InboxMessageStatus.Failed });
        }
      },
    );

    setInputValue('');
    setActiveTab(null);
  };

  // Fetch shortcuts
  const fetchShortcuts = async (page = 1, keyword = '') => {
    setShortcutsLoading(true);
    try {
      const res = await getShortcutsList({ page, limit: 10, keyword });
      if (page === 1) {
        setShortcuts(res.data || []);
      } else {
        setShortcuts((prev) => [...prev, ...(res.data || [])]);
      }
      setShortcutsHasMore(res.hasNextPage);
    } finally {
      setShortcutsLoading(false);
    }
  };

  // When clicking the Shortcuts tab or changing keywords
  useEffect(() => {
    if (activeTab === 'Shortcuts') {
      setShortcutsPage(1);
      fetchShortcuts(1, shortcutsKeyword);
    }
    // eslint-disable-next-line
  }, [activeTab, shortcutsKeyword]);

  // Scroll load more
  useEffect(() => {
    if (activeTab !== 'Shortcuts') return;
    const handleScroll = () => {
      const el = shortcutsListRef.current;
      if (!el || shortcutsLoading || !shortcutsHasMore) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
        setShortcutsPage((prev) => {
          const next = prev + 1;
          fetchShortcuts(next, shortcutsKeyword);
          return next;
        });
      }
    };
    const el = shortcutsListRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [activeTab, shortcutsLoading, shortcutsHasMore, shortcutsKeyword]);

  // When entering in input, if you are in the Shortcuts tab then search
  useEffect(() => {
    if (activeTab === 'Shortcuts') {
      setShortcutsKeyword(inputValue);
    }
    // eslint-disable-next-line
  }, [inputValue, activeTab]);

  // When typing ! automatically switches to Shortcuts tab and search
  useEffect(() => {
    if (inputValue.startsWith('!')) {
      setActiveTab('Shortcuts');
      setShortcutsKeyword(inputValue.slice(1));
    }
    // eslint-disable-next-line
  }, [inputValue]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Shortcuts':
        return (
          <S.TabPanel>
            <S.TabTitle>Shortcuts</S.TabTitle>
            <S.ShortcutsList ref={shortcutsListRef}>
              {shortcuts.map((item) => (
                <S.ShortcutsItem
                  key={item.id}
                  onClick={() => setInputValue(item.message)}
                >
                  <span>{item.shortcut}</span>
                  <p>{item.message}</p>
                </S.ShortcutsItem>
              ))}
              {shortcutsLoading && (
                <S.NoShortcutsFound>Loading...</S.NoShortcutsFound>
              )}
              {!shortcutsLoading && shortcuts.length === 0 && (
                <S.NoShortcutsFound>No shortcuts found</S.NoShortcutsFound>
              )}
            </S.ShortcutsList>
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

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderSkeleton = () => (
    <>
      {[...Array(12)].map((_, i) =>
        i % 2 === 1 ? (
          <S.MessageRowUser key={i}>
            <S.MessageBubbleRight>
              <Skeleton.Input active size="small" style={{ width: 180 }} />
            </S.MessageBubbleRight>
            <S.MessageAvatarWrapper style={{ marginLeft: 8 }}>
              <Skeleton.Avatar active size={40} />
            </S.MessageAvatarWrapper>
          </S.MessageRowUser>
        ) : (
          <S.MessageRow key={i}>
            <S.MessageAvatarWrapper>
              <Skeleton.Avatar active size={40} />
            </S.MessageAvatarWrapper>
            <S.MessageBubbleLeft>
              <Skeleton.Input active size="small" style={{ width: 150 }} />
            </S.MessageBubbleLeft>
          </S.MessageRow>
        ),
      )}
    </>
  );

  if (!conversationId) {
    return (
      <S.Container>
        <S.EmptyState>{t('inboxDetail.selectConversation')}</S.EmptyState>
      </S.Container>
    );
  }

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
            <S.Name>Guest</S.Name>
          </S.Info>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.MarkResolvedButton>
            <Image src={check} preview={false} />{' '}
            {t('inboxDetail.markResolved')}
          </S.MarkResolvedButton>
          <S.ToggleSidebarButton onClick={toggleSidebar}>
            <Image src={isSidebarOpen ? barClose : barOpen} preview={false} />
          </S.ToggleSidebarButton>
        </S.HeaderRight>
      </S.Header>

      <S.MainContent>
        <S.MessageContainer
          isSidebarOpen={isSidebarOpen}
          ref={messageContainerRef}
        >
          {loading ? (
            renderSkeleton()
          ) : messages.length === 0 ? (
            <S.EmptyState>{t('inboxDetail.noMessage')}</S.EmptyState>
          ) : (
            messages
              .slice()
              .reverse()
              .map((msg, idx) => {
                const isAgent =
                  (msg.user?.id && msg.user?.id === currentUserId) ||
                  (!msg.user && msg.sender === InboxSender.Agent);

                return (
                  <React.Fragment key={msg.id || idx}>
                    {isAgent ? (
                      <S.MessageRowUser>
                        {msg.type === InboxMessageType.Image &&
                        msg.metadata?.fileUrl ? (
                          <>
                            <S.MessageTime>
                              {formatTime(msg.createdAt)}
                              {msg.status === InboxMessageStatus.Sending && (
                                <LoadingOutlined
                                  style={{ marginLeft: 6, fontSize: 12 }}
                                  spin
                                />
                              )}
                              {msg.status === InboxMessageStatus.Failed && (
                                <Tooltip title="Send failed">
                                  <CloseCircleTwoTone
                                    twoToneColor="#ff4d4f"
                                    style={{ marginLeft: 6, fontSize: 12 }}
                                  />
                                </Tooltip>
                              )}
                            </S.MessageTime>
                            <S.MessageImage>
                              <Image
                                src={msg.metadata.fileUrl}
                                alt="image"
                                preview={true}
                                onLoad={() => {
                                  setPendingImageLoads((prev) => {
                                    const next = Math.max(prev - 1, 0);
                                    if (next === 0) {
                                      scrollToBottom();
                                    }
                                    return next;
                                  });
                                  if (pendingImageScroll) {
                                    setPendingImageScroll(false);
                                  }
                                }}
                              />
                            </S.MessageImage>
                          </>
                        ) : msg.type === InboxMessageType.Note ? (
                          <S.NoteContainer>
                            <S.NoteRow>
                              <S.MessageTime>
                                {formatTime(msg.createdAt)}
                                {msg.status === InboxMessageStatus.Sending && (
                                  <LoadingOutlined
                                    style={{ marginLeft: 6, fontSize: 12 }}
                                    spin
                                  />
                                )}
                                {msg.status === InboxMessageStatus.Failed && (
                                  <Tooltip title="Send failed">
                                    <CloseCircleTwoTone
                                      twoToneColor="#ff4d4f"
                                      style={{ marginLeft: 6, fontSize: 12 }}
                                    />
                                  </Tooltip>
                                )}
                              </S.MessageTime>
                              <S.NoteBubbleRight>
                                {msg.content}
                              </S.NoteBubbleRight>
                            </S.NoteRow>
                            <S.NoteMeta>
                              Admin left this private note
                            </S.NoteMeta>
                          </S.NoteContainer>
                        ) : (
                          <>
                            <S.MessageTime>
                              {formatTime(msg.createdAt)}
                              {msg.status === InboxMessageStatus.Sending && (
                                <LoadingOutlined
                                  style={{ marginLeft: 6, fontSize: 12 }}
                                  spin
                                />
                              )}
                              {msg.status === InboxMessageStatus.Failed && (
                                <Tooltip title="Send failed">
                                  <CloseCircleTwoTone
                                    twoToneColor="#ff4d4f"
                                    style={{ marginLeft: 6, fontSize: 12 }}
                                  />
                                </Tooltip>
                              )}
                            </S.MessageTime>
                            <S.MessageBubbleRight>
                              {msg.content}
                            </S.MessageBubbleRight>
                          </>
                        )}
                      </S.MessageRowUser>
                    ) : (
                      <S.MessageRow>
                        <S.MessageAvatarWrapper>
                          <S.MessageAvatar
                            src={avatarAdmin}
                            alt={msg.user?.firstName}
                          />
                          <S.MessageColumnView>
                            <S.MessageSenderName>
                              {msg.user?.firstName || 'Guest'}
                            </S.MessageSenderName>
                            {msg.type === InboxMessageType.Image &&
                            msg.metadata?.fileUrl ? (
                              <S.MessageImageLeft>
                                <Image
                                  src={msg.metadata.fileUrl}
                                  alt="image"
                                  onLoad={() => {
                                    setPendingImageLoads((prev) => {
                                      const next = Math.max(prev - 1, 0);
                                      if (next === 0) {
                                        scrollToBottom();
                                      }
                                      return next;
                                    });
                                    if (pendingImageScroll) {
                                      setPendingImageScroll(false);
                                    }
                                  }}
                                  preview={true}
                                />
                              </S.MessageImageLeft>
                            ) : (
                              <S.MessageBubbleLeft>
                                {msg.content}
                              </S.MessageBubbleLeft>
                            )}
                          </S.MessageColumnView>
                        </S.MessageAvatarWrapper>
                        <S.MessageTime>
                          {formatTime(msg.createdAt)}
                          {msg.status === InboxMessageStatus.Sending && (
                            <LoadingOutlined
                              style={{ marginLeft: 6, fontSize: 12 }}
                              spin
                            />
                          )}
                          {msg.status === InboxMessageStatus.Failed && (
                            <Tooltip title="Send failed">
                              <CloseCircleTwoTone
                                twoToneColor="#ff4d4f"
                                style={{ marginLeft: 6, fontSize: 12 }}
                              />
                            </Tooltip>
                          )}
                        </S.MessageTime>
                      </S.MessageRow>
                    )}
                  </React.Fragment>
                );
              })
          )}
          <div ref={messageEndRef} />
          {showNewMessageNotice && (
            <S.NewMessageNoticeButton onClick={scrollToBottom}>
              <p>{t('inboxDetail.haveNewMessage')}</p>
              <img src={icArrowDown} alt="arrow down" className="arrow-icon" />
            </S.NewMessageNoticeButton>
          )}
        </S.MessageContainer>
      </S.MainContent>

      {renderTabContent()}

      {/* Guest is typing indicator */}
      {guestTyping && (
        <S.TypingIndicator>{t('inboxDetail.guestIsTyping')}</S.TypingIndicator>
      )}

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
