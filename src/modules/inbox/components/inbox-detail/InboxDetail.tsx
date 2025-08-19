import React, { useRef, useState, useEffect, memo } from 'react';
import { Image } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import { InboxDetailProps } from '../../interfaces/inbox';
import { getShortcutsList } from '@/modules/inbox/api/inbox.api';
import type { Shortcut } from '@/modules/settings/models/chatbox.model';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';
import { INBOX_TABS, MENU_WIDTH } from '../../constants/inbox.constants';
import { InboxFooter } from './InboxFooter';
import { handleIconClickLogic } from '../../helpers/inbox.logic';
import RenderSkeleton from './RenderSkeleton';
import ContextMenu from './ContextMenu';
import TabContent from './TabContent';

import * as S from './InboxDetail.styles';
import { GlobalStyle } from './InboxDetail.styles';

import check from '@/assets/icons/common/ic-check.svg';
import unresolved from '@/assets/icons/common/ic-unresolved.svg';
import barOpen from '@/assets/icons/common/ic-bar-open.svg';
import barClose from '@/assets/icons/common/ic-bar.svg';
import icArrowDown from '@/assets/icons/inbox/ic-arrow-down.svg';

import ProfileCard from '@/shared/components/common/ProfileCard';
import {
  fetchConversationDetail,
  updateConversationResolved,
  updateSelectedConversation,
} from '../../store/features/inbox';
import { handleUpdateConversation } from '../../api/conversations.api';
import { eventBus } from '@/core/event-bus';
import { useChat } from '@/shared/chat-logic/hooks/useChat';
import {
  MessageSender,
  MessageType,
  ReplyPreviewState,
} from '@/shared/chat-logic/enums/chat.enums';
import { EVENTBUS_UPDATED_CONVERSATION } from '@/shared/chat-logic/constants/event-bus.constants';
import { MessageBaseItem } from './MessageBaseItem';
import { Message } from '@/shared/chat-logic/interfaces/inbox';
import { formatDate } from '@/shared/chat-logic/utils/time';
import { getSenderName } from '@/shared/chat-logic/helpers/chat.helper';

const InboxDetail: React.FC<InboxDetailProps> = memo(
  ({ isSidebarOpen, toggleSidebar }) => {
    const { t } = useTranslation('inbox');
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get('conversationId');

    const stableConversationId = useRef<string | null>(null);
    const dispatch = useAppDispatch();
    if (stableConversationId.current !== conversationId) {
      stableConversationId.current = conversationId;
    }

    const prevConversationIdRef = useRef<string | null>(null);
    const hasConversationChanged =
      prevConversationIdRef.current !== conversationId;

    useEffect(() => {
      if (hasConversationChanged) {
        prevConversationIdRef.current = conversationId;
      }
    }, [conversationId, hasConversationChanged]);

    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [selectedReminder, setSelectedReminder] = useState<string | null>(
      null,
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [knowledgeKeyword, setKnowledgeKeyword] = useState('');
    const [_shortcutsPage, setShortcutsPage] = useState(1);
    const [shortcutsHasMore, setShortcutsHasMore] = useState(true);
    const [shortcutsLoading, setShortcutsLoading] = useState(false);
    const [shortcutsKeyword, setShortcutsKeyword] = useState('');
    const shortcutsListRef = useRef<HTMLDivElement>(null);
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(
      null,
    );
    const [contextMenu, setContextMenu] = useState<{
      x: number;
      y: number;
      visible: boolean;
      message: Message | null;
      messageId?: string;
    }>({
      x: 0,
      y: 0,
      visible: false,
      message: null,
      messageId: undefined,
    });

    const { userInfo } = useAppSelector((state) => state.auth);

    const workspaceId = useSelector(selectCurrentWorkspaceId);
    const { selectedConversation } = useAppSelector((state) => state.inbox);

    const [isUpdatingResolved, setIsUpdatingResolved] = useState(false);
    const [replyPreview, setReplyPreview] = useState<ReplyPreviewState | null>(
      null,
    );

    const handleStartReply = (m: Message) => {
      setReplyPreview({
        id: m.id!,
        type: m.type,
        name: getSenderName(m),
        snippetUrl:
          m.type === MessageType.IMAGE ? m?.metadata?.fileUrl : undefined,
        snippetText: m.type === MessageType.IMAGE ? m.content : m.content,
      });
    };

    const handleClearReply = () => setReplyPreview(null);

    const onMarkAsResolved = async () => {
      if (!selectedConversation?.rawId || !workspaceId) return;
      try {
        setIsUpdatingResolved(true);

        const rawId = selectedConversation.rawId;
        const newResolved = !selectedConversation.resolved;

        await handleUpdateConversation(rawId, { resolved: newResolved }, t);

        dispatch(updateSelectedConversation({ resolved: newResolved }));
        eventBus.emit(EVENTBUS_UPDATED_CONVERSATION as any, {
          conversationId: selectedConversation.id,
          updates: { resolved: newResolved },
        });
        dispatch(
          updateConversationResolved({
            workspaceId,
            conversationId: selectedConversation.id,
            resolved: newResolved,
          }),
        );
      } catch (err) {
        console.error('Failed to update conversation resolved state:', err);
      } finally {
        setIsUpdatingResolved(false);
      }
    };

    useEffect(() => {
      if (conversationId) dispatch(fetchConversationDetail(conversationId));
    }, [dispatch, conversationId]);

    const messageContainerRef = useRef<HTMLDivElement>(null);

    const onEndSendMessage = () => {
      setInputValue('');
      handleClearReply();
    };

    const {
      sendMessage,
      hasNewMessage,
      messages,
      isFetchingInitial,
      isLoadingNext,
      scrollToNewMessages,
      handleUserTyping,
      isSomeoneTyping,
    } = useChat({
      conversationId,
      messageContainerRef,
      onEndSendMessage: onEndSendMessage,
    });

    const handleTabClick = (tab: string) => {
      setActiveTab(activeTab === tab ? null : tab);
      if (tab === INBOX_TABS.EDIT) setInputValue(' ');
      if (tab === INBOX_TABS.NOTE) setInputValue(' ');
    };

    const handleSendMessage = (
      content: string,
      type: MessageType,
      metadata: any = {},
    ) => {
      sendMessage(content, type, metadata, userInfo);
    };

    useEffect(() => {
      if (activeTab === INBOX_TABS.SHORTCUTS) {
        setShortcutsPage(1);
        setShortcutsLoading(true);
        getShortcutsList({ page: 1, limit: 10, keyword: shortcutsKeyword })
          .then((res) => {
            setShortcuts(res.data || []);
            setShortcutsHasMore(res.hasNextPage);
          })
          .finally(() => setShortcutsLoading(false));
      }
      // eslint-disable-next-line
    }, [activeTab, shortcutsKeyword]);

    useEffect(() => {
      if (activeTab === INBOX_TABS.KNOWLEDGE_BASE) {
        setKnowledgeKeyword(inputValue);
      }
    }, [inputValue, activeTab]);

    // Scroll load more
    useEffect(() => {
      if (activeTab !== INBOX_TABS.SHORTCUTS) return;
      const handleScroll = () => {
        const el = shortcutsListRef.current;
        if (!el || shortcutsLoading || !shortcutsHasMore) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
          setShortcutsPage((prev) => {
            const next = prev + 1;
            setShortcutsLoading(true);
            getShortcutsList({
              page: next,
              limit: 10,
              keyword: shortcutsKeyword,
            })
              .then((res) => {
                setShortcuts((prevShortcuts) => [
                  ...prevShortcuts,
                  ...(res.data || []),
                ]);
                setShortcutsHasMore(res.hasNextPage);
              })
              .finally(() => setShortcutsLoading(false));
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

    useEffect(() => {
      if (activeTab === INBOX_TABS.SHORTCUTS) {
        setShortcutsKeyword(inputValue);
      }
      // eslint-disable-next-line
    }, [inputValue, activeTab]);

    useEffect(() => {
      if (inputValue.startsWith('!')) {
        setActiveTab(INBOX_TABS.SHORTCUTS);
        setShortcutsKeyword(inputValue.slice(1));
      }
      // eslint-disable-next-line
    }, [inputValue]);

    // Click outside to close active tab
    useEffect(() => {
      if (!activeTab) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (footerRef.current && footerRef.current.contains(target)) {
          return;
        }
        if (target && (target as Element).closest('[data-tab-panel="true"]')) {
          return;
        }
        setActiveTab(null);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [activeTab]);

    const handleIconClick = (e: React.MouseEvent, message: Message) => {
      handleIconClickLogic(
        e,
        message,
        setContextMenu,
        setHoveredMessageId,
        MENU_WIDTH,
      );
    };

    const closeContextMenu = () => {
      setContextMenu((prev) => ({ ...prev, visible: false }));
      setHoveredMessageId(null);
    };

    useEffect(() => {
      if (contextMenu.visible) {
        const close = () => closeContextMenu();
        window.addEventListener('click', close);
        window.addEventListener('scroll', close, true);
        return () => {
          window.removeEventListener('click', close);
          window.removeEventListener('scroll', close, true);
        };
      }
    }, [contextMenu.visible]);

    if (!conversationId) {
      return (
        <S.Container>
          <S.EmptyState>{t('inboxDetail.selectConversation')}</S.EmptyState>
        </S.Container>
      );
    }

    const renderLoadingOverlay = () => (
      <S.LoadingOverlay>
        <LoadingOutlined spin style={{ fontSize: 32, color: '#999' }} />
      </S.LoadingOverlay>
    );

    return (
      <>
        <GlobalStyle />
        <S.Container>
          <ContextMenu
            contextMenu={contextMenu}
            rawConversationId={conversationId}
            setHoveredMessageId={setHoveredMessageId}
            onCloseMenu={closeContextMenu}
            MENU_WIDTH={MENU_WIDTH}
            t={t}
            onReply={handleStartReply}
          />
          <S.Header>
            <S.HeaderLeft>
              <ProfileCard
                contactId={selectedConversation?.contact?.id}
                name={selectedConversation?.contact?.name || DEFAULT_FULL_NAME}
                avatarUrl={selectedConversation?.contact?.avatar}
                countryCode={selectedConversation?.contact?.countryCode}
                hiddenInfo
              />
              <S.Info>
                <S.Name>
                  {selectedConversation?.contact?.name || DEFAULT_FULL_NAME}
                </S.Name>
              </S.Info>
            </S.HeaderLeft>
            <S.HeaderRight>
              {selectedConversation?.resolved ? (
                <S.MarkUnResolvedButton
                  onClick={onMarkAsResolved}
                  isLoading={isUpdatingResolved}
                >
                  <Image src={unresolved} preview={false} />{' '}
                  {t('inboxDetail.markUnResolved')}
                </S.MarkUnResolvedButton>
              ) : (
                <S.MarkResolvedButton
                  onClick={onMarkAsResolved}
                  isLoading={isUpdatingResolved}
                >
                  <Image src={check} preview={false} />{' '}
                  {t('inboxDetail.markResolved')}
                </S.MarkResolvedButton>
              )}

              <S.ToggleSidebarButton onClick={toggleSidebar}>
                <Image
                  src={isSidebarOpen ? barClose : barOpen}
                  preview={false}
                />
              </S.ToggleSidebarButton>
            </S.HeaderRight>
          </S.Header>

          <S.MainContent
            $hasOverlay={!!activeTab}
            style={{ position: 'relative' }}
          >
            <S.MessageContainer
              $isSidebarOpen={isSidebarOpen}
              ref={messageContainerRef}
            >
              {isLoadingNext && !isFetchingInitial && (
                <S.MessageTypeLoading>
                  <LoadingOutlined
                    spin
                    style={{ fontSize: 24, color: '#999' }}
                  />
                </S.MessageTypeLoading>
              )}

              {messages.length === 0 && isFetchingInitial ? (
                <RenderSkeleton />
              ) : messages.length === 0 ? (
                <S.EmptyState>{t('inboxDetail.noMessage')}</S.EmptyState>
              ) : (
                <>
                  {(() => {
                    let displayMessages = messages.slice().reverse();
                    return displayMessages.map((msg, idx) => {
                      return (
                        <React.Fragment key={msg.id || idx}>
                          {msg.showDate && (
                            <S.DateSeparator>
                              {formatDate(msg.createdAt)}
                            </S.DateSeparator>
                          )}
                          <MessageBaseItem
                            msg={msg}
                            hoveredMessageId={hoveredMessageId}
                            contextMenu={contextMenu}
                            handleIconClick={handleIconClick}
                            setHoveredMessageId={setHoveredMessageId}
                          />
                        </React.Fragment>
                      );
                    });
                  })()}
                </>
              )}
              {hasNewMessage && (
                <S.NewMessageNoticeButton onClick={scrollToNewMessages}>
                  <p>{t('inboxDetail.haveNewMessage')}</p>
                  <img
                    src={icArrowDown}
                    alt="arrow down"
                    className="arrow-icon"
                  />
                </S.NewMessageNoticeButton>
              )}
              {messages.length > 0 &&
                isFetchingInitial &&
                renderLoadingOverlay()}
            </S.MessageContainer>
            {activeTab && (
              <S.TabOverlay $tabtype={activeTab}>
                <TabContent
                  activeTab={activeTab}
                  INBOX_TABS={INBOX_TABS}
                  shortcuts={shortcuts}
                  shortcutsLoading={shortcutsLoading}
                  shortcutsListRef={shortcutsListRef}
                  setInputValue={setInputValue}
                  setActiveTab={setActiveTab}
                  inputRef={inputRef}
                  inputValue={inputValue}
                  setSelectedReminder={setSelectedReminder}
                  knowledgeKeyword={knowledgeKeyword}
                  t={t}
                />
              </S.TabOverlay>
            )}
          </S.MainContent>

          {/* Guest is typing indicator */}
          {isSomeoneTyping && (
            <S.TypingIndicator>
              {t('inboxDetail.typingPlaceholder')}
            </S.TypingIndicator>
          )}

          <InboxFooter
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedReminder={selectedReminder}
            setSelectedReminder={setSelectedReminder}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={handleSendMessage}
            handleTabClick={handleTabClick}
            INBOX_TABS={INBOX_TABS}
            onInputChange={handleUserTyping}
            replyPreview={replyPreview}
            onEndSendMessage={onEndSendMessage}
            footerRef={footerRef} 
          />
        </S.Container>
      </>
    );
  },
);

const InboxDetailMemo = memo(InboxDetail, (prevProps, nextProps) => {
  const isEqual =
    prevProps.isSidebarOpen === nextProps.isSidebarOpen &&
    prevProps.toggleSidebar === nextProps.toggleSidebar;

  return isEqual;
});

InboxDetailMemo.displayName = 'InboxDetail';

export default InboxDetailMemo;
