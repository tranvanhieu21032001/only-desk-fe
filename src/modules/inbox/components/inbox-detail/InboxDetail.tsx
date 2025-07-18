import React, { useRef, useState, useEffect, useMemo, memo } from 'react';
import { Image } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

import {
  sendAgentMessage,
  closeConversation,
  openConversation,
  listenUserTyping,
  offUserTyping,
} from '../../../../core/services/socket/socket';
import AvatarWithStatus from '../../../../shared/components/common/Avatar';
import { InboxDetailProps, Message } from '../../interfaces/inbox';
import { useMessageList } from '../../hooks/useMessageList';
import { useUser } from '@/core/context/UserContext';
import { useScrollHandler } from '../../hooks/useScrollHandler';
import {
  InboxMessageType,
  InboxSender,
  InboxMessageStatus,
} from '@/modules/settings/helpers/enums/inbox.enums';
import { getShortcutsList } from '@/modules/inbox/api/inbox.api';
import type { Shortcut } from '@/modules/settings/models/chatbox.model';
import { useAppSelector } from '@/shared/hooks';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';
import { INBOX_TABS, MENU_WIDTH } from '../../constants/inbox.constants';
import { ChatMessageItem } from './ChatMessageItem';
import { InboxFooter } from './InboxFooter';
import { formatTime } from '@/shared/utils/time';
import { decodeGlobalId } from '@/shared/utils/decode';
import {
  resolveCurrentConversation,
  handleIconClickLogic,
  handleSendMessageLogic,
} from '../../helpers/inbox.logic';
import RenderSkeleton from './RenderSkeleton';
import ContextMenu from './ContextMenu';
import TabContent from './TabContent';

import * as S from './InboxDetail.styles';
import { GlobalStyle } from './InboxDetail.styles';

import avatarAdmin from '@/assets/images/avatar-default.png';
import check from '@/assets/icons/common/ic-check.svg';
import barOpen from '@/assets/icons/common/ic-bar-open.svg';
import barClose from '@/assets/icons/common/ic-bar.svg';
import flag from '@/assets/icons/common/ic-flag.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';
import icArrowDown from '@/assets/icons/inbox/ic-arrow-down.svg';
import iconReply from '@/assets/icons/inbox/ic-reply.svg';
import iconEdit from '@/assets/icons/common/ic-edit.svg';
import iconCopy from '@/assets/icons/common/ic-copy.svg';
import iconDelete from '@/assets/icons/common/ic-delete.svg';



const InboxDetail: React.FC<InboxDetailProps> = memo(
  ({ isSidebarOpen, toggleSidebar, conversation }) => {
    const { t } = useTranslation('inbox');
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get('conversationId');
    const stableConversationId = useRef<string | null>(null);

    if (stableConversationId.current !== conversationId) {
      stableConversationId.current = conversationId;
    }

    const {
      messages,
      loading,
      loadingMore,
      hasNextPage,
      loadMore,
      addMessage,
      updateMessage,
      removeMessage,
    } = useMessageList({ conversationId: stableConversationId.current });

    const rawConversationId = useMemo(
      () =>
        stableConversationId.current
          ? decodeGlobalId(stableConversationId.current)
          : null,
      [stableConversationId.current, decodeGlobalId],
    );

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
    const [guestTyping, setGuestTyping] = useState(false);
    const isSelfSendingRef = useRef(false);
    const [pendingImageScroll, setPendingImageScroll] = useState(false);
    const [_pendingImageLoads, setPendingImageLoads] = useState(0);
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
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

    const user = useUser();
    const currentUserId = user?.id;

    const workspaceId = useSelector(selectCurrentWorkspaceId);
    const { conversations, selectedConversation } = useAppSelector(
      (state) => state.inbox,
    );

    const currentConversations = useMemo(() => {
      return workspaceId ? conversations[workspaceId] || [] : [];
    }, [workspaceId, conversations]);

    const currentConversation = useMemo(
      () =>
        resolveCurrentConversation({
          conversation: conversation ?? undefined,
          selectedConversation: selectedConversation ?? undefined,
          currentConversations,
          stableConversationId: stableConversationId.current,
          messages: messages as Message[],
          workspaceId,
        }),
      [
        conversation,
        selectedConversation,
        currentConversations,
        stableConversationId.current,
        messages,
        workspaceId,
      ],
    );

    const messageEndRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Use custom scroll hook
    const {
      showNewMessageNotice,
      scrollToBottom,
      scrollToShowNewMessage,
      isLoadingMoreMessages,
      setWasAtBottom,
      setShowNewMessageNotice,
    } = useScrollHandler({
      isLoadingNext: loadingMore,
      hasNextPage: hasNextPage,
      loadMore,
      messageContainerRef,
      messageEndRef,
      messages: messages as any[],
      loading,
      stableConversationId: stableConversationId.current,
    });

    const prevConversationId = useRef<string | null>(null);
    const isFirstMount = useRef(true);

    useEffect(() => {
      if (isFirstMount.current) {
        if (rawConversationId) {
          openConversation(rawConversationId);
          prevConversationId.current = rawConversationId;
        }
        isFirstMount.current = false;
        return;
      }

      if (rawConversationId) {
        if (
          prevConversationId.current &&
          prevConversationId.current !== rawConversationId
        ) {
          closeConversation(prevConversationId.current);
        }
        if (prevConversationId.current !== rawConversationId) {
          openConversation(rawConversationId);
          prevConversationId.current = rawConversationId;
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
    }, [rawConversationId]);

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
      if (tab === INBOX_TABS.EDIT) setInputValue(' ');
      if (tab === INBOX_TABS.NOTE) setInputValue(' ');
    };

    const handleSendMessage = (
      content: string,
      type: InboxMessageType = InboxMessageType.Text,
      metadata: any = {},
    ) => {
      isSelfSendingRef.current = true;
      handleSendMessageLogic({
        content,
        type,
        metadata,
        rawConversationId,
        currentUserId,
        user,
        addMessage,
        removeMessage,
        updateMessage,
        setPendingImageLoads,
        scrollToShowNewMessage,
        sendAgentMessage,
        setInputValue,
        setActiveTab,
      });
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
      setWasAtBottom(true);
      setShowNewMessageNotice(false);
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

    const LOADING_MESSAGE = {
      id: 'loading-message',
      type: InboxMessageType.Loading,
      content: '',
      sender: InboxSender.Guest,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: InboxMessageStatus.Sending,
      user: null,
      metadata: undefined,
    };

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

    const handleCopyText = async () => {
      if (contextMenu.message?.content) {
        try {
          await navigator.clipboard.writeText(contextMenu.message.content);
          toast(
            React.createElement(ToastMessage, {
              typeToast: ToastMessageType.SUCCESS,
              message: t('inboxDetail.textCopiedToClipboard'),
            }),
          );
          closeContextMenu();
        } catch (error) {
          try {
            const textArea = document.createElement('textarea');
            textArea.value = contextMenu.message.content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success(
              React.createElement(ToastMessage, {
                typeToast: ToastMessageType.SUCCESS,
                message: t('inboxDetail.textCopiedToClipboard'),
              }),
            );
            closeContextMenu();
          } catch (fallbackError) {
            toast.error(
              React.createElement(ToastMessage, {
                typeToast: ToastMessageType.ERROR,
                message: t('inboxDetail.failedToCopyTextDesc'),
              }),
            );
            closeContextMenu();
          }
        }
      }
    };

    const handleReply = () => console.log('Reply to:', contextMenu.message?.id);
    const handleEdit = () =>
      console.log('Edit message:', contextMenu.message?.id);
    const handleDeleteMessage = () =>
      console.log('Delete message:', contextMenu.message?.id);

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
            handleReply={handleReply}
            handleDeleteMessage={handleDeleteMessage}
            handleCopyText={handleCopyText}
            handleEdit={handleEdit}
            setHoveredMessageId={setHoveredMessageId}
            iconReply={iconReply}
            iconDelete={iconDelete}
            iconEdit={iconEdit}
            iconCopy={iconCopy}
            MENU_WIDTH={MENU_WIDTH}
            t={t}
          />
          <S.Header>
            <S.HeaderLeft>
              <AvatarWithStatus
                avatarSrc={
                  currentConversation?.contact?.avatar || defaultAvatar
                }
                flagSrc={flag}
                isOnline={true}
              />
              <S.Info>
                <S.Name>
                  {currentConversation?.contact?.name || DEFAULT_FULL_NAME}
                </S.Name>
              </S.Info>
            </S.HeaderLeft>
            <S.HeaderRight>
              <S.MarkResolvedButton>
                <Image src={check} preview={false} />{' '}
                {t('inboxDetail.markResolved')}
              </S.MarkResolvedButton>
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
              {messages.length === 0 && loading ? (
                <RenderSkeleton />
              ) : messages.length === 0 && !loading ? (
                <S.EmptyState>{t('inboxDetail.noMessage')}</S.EmptyState>
              ) : (
                <>
                  {(() => {
                    let displayMessages = messages.slice().reverse();
                    if (isLoadingMoreMessages) {
                      displayMessages = [LOADING_MESSAGE, ...displayMessages];
                    }
                    return displayMessages.map((msg, idx) => {
                      const isAgent =
                        (msg.user?.id && msg.user?.id === currentUserId) ||
                        (!msg.user && msg.sender === InboxSender.Agent);
                      return (
                        <React.Fragment key={msg.id || idx}>
                          <ChatMessageItem
                            msg={msg}
                            hoveredMessageId={hoveredMessageId}
                            contextMenu={contextMenu}
                            handleIconClick={handleIconClick}
                            setHoveredMessageId={setHoveredMessageId}
                            formatTime={formatTime}
                            pendingImageScroll={pendingImageScroll}
                            setPendingImageScroll={setPendingImageScroll}
                            setPendingImageLoads={setPendingImageLoads}
                            scrollToBottom={scrollToBottom}
                            justLoadedMore={false}
                            isOwner={isAgent}
                            avatarAdmin={isAgent ? undefined : avatarAdmin}
                          />
                        </React.Fragment>
                      );
                    });
                  })()}
                </>
              )}
              <div ref={messageEndRef} />
              {showNewMessageNotice && (
                <S.NewMessageNoticeButton onClick={scrollToBottom}>
                  <p>{t('inboxDetail.haveNewMessage')}</p>
                  <img
                    src={icArrowDown}
                    alt="arrow down"
                    className="arrow-icon"
                  />
                </S.NewMessageNoticeButton>
              )}
              {loading && messages.length > 0 && renderLoadingOverlay()}
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
                  t={t}
                />
              </S.TabOverlay>
            )}
          </S.MainContent>

          {/* Guest is typing indicator */}
          {guestTyping && (
            <S.TypingIndicator>
              {t('inboxDetail.guestIsTyping')}
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
