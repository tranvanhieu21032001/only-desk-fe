import React, { useRef, useState, useEffect } from 'react';
import { Image } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { fetchQuery } from 'relay-runtime';
import { useTranslation } from 'react-i18next';
import relayEnvironment from '@/relay/RelayEnvironment';
import { messageQuery } from '@/relay/MessageQuery';
import { v4 as uuidv4 } from 'uuid';

import AvatarWithStatus from '../../../../shared/components/common/Avatar';
import MessageInput from '../message-input/MessageInput';

import { EVENTBUS_INBOX_MESSAGE } from '@/core/settings/constants';
import { eventBus } from '@/core/event-bus';
import { useUser } from '@/core/context/UserContext';
import {
  sendAgentMessage,
  closeConversation,
  openConversation,
  listenUserTyping,
  offUserTyping,
} from '../../../../core/services/socket/socket';

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
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesCache, setMessagesCache] = useState<{ [id: string]: any[] }>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [showNewMessageNotice, setShowNewMessageNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [guestTyping, setGuestTyping] = useState(false);

  const user = useUser();
  const currentUserId = user?.id;

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Check if user is at bottom
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      10;
    if (isAtBottom) {
      setShowNewMessageNotice(false);
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // When there is a new message, if the user is not at the end then show notice
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      10;
    if (!isAtBottom && messages.length > 0) {
      setShowNewMessageNotice(true);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowNewMessageNotice(false);
  };

  // Auto-load more messages if not enough to scroll
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    if (
      container.scrollHeight <= container.clientHeight &&
      hasMore &&
      !loading
    ) {
      (async () => {
        setLoading(true);
        const res: any = await fetchQuery(relayEnvironment, messageQuery, {
          conversationId,
          args: endCursor
            ? { first: 20, after: String(endCursor) }
            : { first: 20 },
        }).toPromise();
        const messageEdges = res?.messages?.edges || [];
        const newMessages = messageEdges.map((edge: any) => edge.node);
        setMessages((prev) => [...prev, ...newMessages]);
        setMessagesCache((prev) => ({
          ...prev,
          [conversationId || '']: [
            ...(prev[conversationId || ''] || []),
            ...newMessages,
          ],
        }));
        setHasMore(res?.messages?.pageInfo?.hasNextPage || false);
        setEndCursor(res?.messages?.pageInfo?.endCursor || null);
        setLoading(false);
      })();
    }
  }, [messages, hasMore, loading, conversationId, endCursor]);

  // Infinite scroll: load more messages when scroll to top
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
    const handleLoadMore = async () => {
      if (container.scrollTop === 0 && hasMore && !loading) {
        setLoading(true);
        const res: any = await fetchQuery(relayEnvironment, messageQuery, {
          conversationId,
          args: endCursor
            ? { first: 20, after: String(endCursor) }
            : { first: 20 },
        }).toPromise();
        const messageEdges = res?.messages?.edges || [];
        const newMessages = messageEdges.map((edge: any) => edge.node);

        // Loại bỏ message đã có (theo id)
        setMessages((prev) => {
          const prevIds = new Set(prev.map((msg) => msg.id));
          const uniqueNewMessages = newMessages.filter(
            (msg: any) => !prevIds.has(msg.id),
          );
          return [...prev, ...uniqueNewMessages];
        });

        setMessagesCache((prev) => ({
          ...prev,
          [conversationId || '']: [
            ...(prev[conversationId || ''] || []),
            ...newMessages,
          ],
        }));
        setHasMore(res?.messages?.pageInfo?.hasNextPage || false);
        setEndCursor(res?.messages?.pageInfo?.endCursor || null);
        setLoading(false);
      }
    };
    container.addEventListener('scroll', handleLoadMore);
    return () => container.removeEventListener('scroll', handleLoadMore);
  }, [hasMore, endCursor, loading, conversationId]);

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

    if (
      prevConversationId.current &&
      prevConversationId.current !== conversationId
    ) {
      closeConversation(prevConversationId.current);
    }
    if (conversationId && prevConversationId.current !== conversationId) {
      openConversation(conversationId);
    }
    prevConversationId.current = conversationId;

    return () => {
      if (prevConversationId.current) {
        closeConversation(prevConversationId.current);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;

    if (messagesCache[conversationId]) {
      setMessages(messagesCache[conversationId]);
    } else {
      setMessages([]);
    }

    setLoading(true);
    fetchQuery(relayEnvironment, messageQuery, {
      conversationId,
      args: endCursor ? { first: 20, after: String(endCursor) } : { first: 20 },
    })
      .toPromise()
      .then((res: any) => {
        const messageEdges = res?.messages?.edges || [];
        const newMessages = messageEdges.map((edge: any) => edge.node);
        setMessages(newMessages);
        setMessagesCache((prev) => ({
          ...prev,
          [conversationId || '']: newMessages,
        }));
        setHasMore(res?.messages?.pageInfo?.hasNextPage || false);
        setEndCursor(res?.messages?.pageInfo?.endCursor || null);
        // After loading messages, scroll down to the bottom
        setTimeout(scrollToBottom, 100);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [conversationId]);

  useEffect(() => {
    const handler = (data: any) => {
      setMessages((prev) => [data, ...prev]);
      const container = messageContainerRef.current;
      const isAtBottom =
        container &&
        container.scrollHeight - container.scrollTop - container.clientHeight <
          10;
      if (!isAtBottom) {
        setShowNewMessageNotice(true);
      }
    };
    eventBus.on(EVENTBUS_INBOX_MESSAGE, handler);
    return () => eventBus.off(EVENTBUS_INBOX_MESSAGE, handler);
  }, []);

  useEffect(() => {
    const handleUserTyping = (data: any) => {
      console.log('[SOCKET][user_typing] event:', data);
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
    if (tab === 'Note') setInputValue('I want to go');
  };

  const handleSendMessage = (
    content: string,
    type: string = 'text',
    metadata: any = {},
  ) => {
    if ((!content.trim() && type === 'text') || !conversationId) return;

    const now = new Date();
    const temp_id = uuidv4();
    const newMessage = {
      id: temp_id,
      content,
      sender: 'AGENT',
      user: { id: currentUserId, firstName: user?.firstName },
      type,
      status: 'sending',
      createdAt: now.toISOString(),
      metadata,
    };

    setMessages((prev) => [newMessage, ...prev]);
    setMessagesCache((prev) => ({
      ...prev,
      [conversationId || '']: [
        newMessage,
        ...(prev[conversationId || ''] || []),
      ],
    }));

    setTimeout(scrollToBottom, 100);

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
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === temp_id
                ? { ...msg, id: res.messageId, status: 'sent' }
                : msg,
            ),
          );
          setMessagesCache((prev) => ({
            ...prev,
            [conversationId || '']: (prev[conversationId || ''] || []).map(
              (msg) =>
                msg.id === temp_id
                  ? { ...msg, id: res.messageId, status: 'sent' }
                  : msg,
            ),
          }));
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === temp_id ? { ...msg, status: 'error' } : msg,
            ),
          );
        }
      },
    );

    setInputValue('');
    setActiveTab(null);
  };

  const handleShowNewMessages = () => {
    setShowNewMessageNotice(false);
    setTimeout(scrollToBottom, 100);
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

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

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
          {messages.length === 0 ? (
            <S.EmptyState>{t('inboxDetail.noMessage')}</S.EmptyState>
          ) : (
            messages
              .slice()
              .reverse()
              .map((msg, idx) => {
                const isAgent =
                  (msg.user?.id && msg.user?.id === currentUserId) ||
                  (!msg.user &&
                    (msg.sender === 'AGENT' || msg.sender === 'user'));

                return (
                  <React.Fragment key={msg.id || idx}>
                    {isAgent ? (
                      <S.MessageRowUser>
                        {msg.type?.toLowerCase() === 'image' &&
                        msg.metadata?.fileUrl ? (
                          <>
                            <S.MessageTime>
                              {formatTime(msg.createdAt)}
                            </S.MessageTime>
                            <S.MessageImage
                              src={msg.metadata.fileUrl}
                              alt="image"
                              style={{ marginLeft: 0, marginRight: 8 }}
                            />
                          </>
                        ) : msg.type?.toLowerCase() === 'note' ? (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                              }}
                            >
                              <S.MessageTime>
                                {formatTime(msg.createdAt)}
                              </S.MessageTime>
                              <S.NoteBubbleRight>
                                {msg.content}
                              </S.NoteBubbleRight>
                            </div>
                            <S.NoteMeta>
                              Admin left this private note
                            </S.NoteMeta>
                          </div>
                        ) : (
                          <>
                            <S.MessageTime>
                              {formatTime(msg.createdAt)}
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
                            {msg.type?.toLowerCase() === 'image' &&
                            msg.metadata?.fileUrl ? (
                              <S.MessageImageLeft
                                src={msg.metadata.fileUrl}
                                alt="image"
                              />
                            ) : (
                              <S.MessageBubbleLeft>
                                {msg.content}
                              </S.MessageBubbleLeft>
                            )}
                          </S.MessageColumnView>
                        </S.MessageAvatarWrapper>
                        <S.MessageTime>
                          {formatTime(msg.createdAt)}
                        </S.MessageTime>
                      </S.MessageRow>
                    )}
                  </React.Fragment>
                );
              })
          )}
          <div ref={messageEndRef} />
          {showNewMessageNotice && (
            <S.NewMessageNoticeButton onClick={handleShowNewMessages}>
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
