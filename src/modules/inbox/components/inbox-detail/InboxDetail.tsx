import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from 'react';
import { Image, Tooltip, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';

import AvatarWithStatus from '../../../../shared/components/common/Avatar';
import MessageInput from '../message-input/MessageInput';

import {
  sendAgentMessage,
  closeConversation,
  openConversation,
  listenUserTyping,
  offUserTyping,
} from '../../../../core/services/socket/socket';

import { Message } from '../../interfaces/inbox';
import { useMessageList } from '../../hooks/useMessageList';
import { useUser } from '@/core/context/UserContext';
import { useScrollHandler } from '../../hooks/useScrollHandler';
import {
  InboxMessageStatus,
  InboxMessageType,
  InboxSender,
} from '@/modules/settings/helpers/enums/inbox.enums';
import { getShortcutsList } from '@/modules/settings/api/chatbox';
import type { Shortcut } from '@/modules/settings/models/chatbox.model';
import { useAppSelector } from '@/shared/hooks';
import { ToastMessageType } from '@/shared/helper/enums/common';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';

import * as S from './InboxDetail.styles';
import { GlobalStyle } from './InboxDetail.styles';

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
import icBar from '@/assets/icons/common/ic-bar-column.svg';
import iconReply from '@/assets/icons/inbox/ic-reply.svg';
import iconEdit from '@/assets/icons/common/ic-edit.svg';
import iconCopy from '@/assets/icons/common/ic-copy.svg';
import iconDelete from '@/assets/icons/common/ic-delete.svg';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';
import { Conversation } from '../../interfaces/inbox';

interface InboxDetailProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  conversation?: any;
}

const InboxDetail: React.FC<InboxDetailProps> = memo(
  ({ isSidebarOpen, toggleSidebar, conversation }) => {
    const renderCount = useRef(0);
    renderCount.current++;

    // Add mount/unmount tracking
    const mountTimestamp = useRef(Date.now());

    const { t } = useTranslation('inbox');
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get('conversationId');

    const prevUrlRef = useRef<string>('');
    const currentUrl = window.location.href;
    if (prevUrlRef.current !== currentUrl) {
      prevUrlRef.current = currentUrl;
    }

    const stableConversationId = useRef<string | null>(null);

    if (stableConversationId.current !== conversationId) {
      const now = Date.now();
      if (!stableConversationId.current || now % 1000 < 100) {
      }
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

    // Memoize decode function (stable)
    const decodeGlobalId = useCallback((globalId: string): string => {
      try {
        const decoded = atob(globalId);
        const parts = decoded.split(':');
        return parts[1] || globalId;
      } catch {
        return globalId;
      }
    }, []);

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
    const [pendingImageLoads, setPendingImageLoads] = useState(0);
    const [lastMessageId, setLastMessageId] = useState<string | null>(null);
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [shortcutsPage, setShortcutsPage] = useState(1);
    const [shortcutsHasMore, setShortcutsHasMore] = useState(true);
    const [shortcutsLoading, setShortcutsLoading] = useState(false);
    const [shortcutsKeyword, setShortcutsKeyword] = useState('');
    const shortcutsListRef = useRef<HTMLDivElement>(null);
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
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
    const { conversations } = useAppSelector((state) => state.inbox);

    const currentConversations = useMemo(() => {
      return workspaceId ? conversations[workspaceId] || [] : [];
    }, [workspaceId, conversations]);

    const currentConversation = useMemo(() => {
      if (conversation) return conversation;
      const foundInRedux = currentConversations.find(
        (conv) => conv.id === stableConversationId.current,
      );
      if (foundInRedux) {
        return foundInRedux;
      }
      if (messages && messages.length > 0 && stableConversationId.current) {
        const guestMessage = messages.find(
          (msg) => msg.sender === InboxSender.Guest,
        );
        const latestMessage = messages[0];
        return {
          id: stableConversationId.current,
          contact: {
            id: guestMessage?.user?.id || '',
            createdAt: '',
            updatedAt: '',
            guestId: '',
            name: guestMessage?.user?.firstName
              ? `${guestMessage.user.firstName} ${guestMessage.user.lastName || ''}`.trim()
              : 'Guest',
            notification: true,
            segments: [],
            isOnline: false,
            lastActivityAt:
              latestMessage?.createdAt || new Date().toISOString(),
            workspaceId: workspaceId || '',
            avatar: guestMessage?.user?.avatar || '',
          },
          assignedTo: null,
          participants: [],
          lastActivityAt: latestMessage?.createdAt || new Date().toISOString(),
          latestMessage: latestMessage
            ? {
                id: latestMessage.id,
                content: latestMessage.content,
                sender: latestMessage.sender,
                createdAt: latestMessage.createdAt,
                updatedAt: latestMessage.updatedAt,
                type: latestMessage.type,
                status: latestMessage.status,
                user: latestMessage.user,
              }
            : null,
        } as Conversation;
      }
      return undefined;
    }, [
      conversation,
      currentConversations,
      stableConversationId.current,
      messages,
      workspaceId,
    ]);

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
      scrollToShowNewMessage,
      isLoadingMoreMessages,
    } = useScrollHandler({
      loadingMore,
      hasNextPage,
      loadMore,
      pendingImageScroll,
      messageContainerRef,
      messageEndRef,
      addMessage,
      removeMessage,
    });

    const prevStableConversationId = useRef<string | null>(null);
    const conversationChanged =
      prevStableConversationId.current !== stableConversationId.current;

    useEffect(() => {
      if (!conversationChanged || !stableConversationId.current) return;

      setLastMessageId(null);
      setGuestTyping(false);
      setActiveTab(null);

      isFirstMessageLoad.current = true;

      prevStableConversationId.current = stableConversationId.current;
    }, [stableConversationId.current]);

    const isFirstMessageLoad = useRef(true);

    // Optimize initial scroll to prevent flash
    useEffect(() => {
      if (
        !loading &&
        messages.length > 0 &&
        isFirstMessageLoad.current &&
        stableConversationId.current
      ) {
        const container = messageContainerRef.current;
        if (container) {
          // Use requestAnimationFrame for smoother scroll
          requestAnimationFrame(() => {
            if (container) {
              container.scrollTop = container.scrollHeight;
              isFirstMessageLoad.current = false;
            }
          });
        }
      }
    }, [loading, messages.length, stableConversationId.current]); // Use stable conversation ID

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

    const prevMessageCount = useRef(messages.length);
    const wasLoadingRef = useRef(false);

    useEffect(() => {
      if (messages.length === 0) return;

      if (isLoadingMoreMessages) {
        wasLoadingRef.current = true;
        return;
      }
      const currentCount = messages.length;
      const previousCount = prevMessageCount.current;
      const justFinishedLoading =
        wasLoadingRef.current && !isLoadingMoreMessages;

      if (justFinishedLoading && currentCount > previousCount) {
        wasLoadingRef.current = false;
        prevMessageCount.current = currentCount;

        const newestMessage = messages[0];
        setLastMessageId(newestMessage?.id);
        return;
      }

      if (!isLoadingMoreMessages) {
        wasLoadingRef.current = false;
      }

      prevMessageCount.current = currentCount;

      const newestMessage = messages[0];
      const newestId = newestMessage?.id;

      // Skip auto-scroll logic during initial conversation load
      if (!lastMessageId) {
        setLastMessageId(newestId);
        return;
      }

      if (newestId !== lastMessageId) {
        const now = new Date();
        const messageTime = new Date(newestMessage.createdAt);
        const timeDifference = now.getTime() - messageTime.getTime();
        const isRecentMessage = timeDifference < 10000; // Within 10 seconds

        // Only auto-scroll for recent messages (real-time incoming)
        if (isRecentMessage) {
          if (wasAtBottom) {
            setTimeout(() => {
              scrollToShowNewMessage();
            }, 0);
            setShowNewMessageNotice(false);
          } else {
            setShowNewMessageNotice(true);
          }
        } else {
          //
        }
      }
      setLastMessageId(newestId);
    }, [
      messages,
      wasAtBottom,
      scrollToShowNewMessage,
      setShowNewMessageNotice,
      lastMessageId,
      isLoadingMoreMessages,
    ]);

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
      if (tab === 'Edit') setInputValue('Hello');
      if (tab === 'Note') setInputValue(' ');
    };

    const handleSendMessage = (
      content: string,
      type: InboxMessageType = InboxMessageType.Text,
      metadata: any = {},
    ) => {
      if (
        (!content.trim() && type === InboxMessageType.Text) ||
        !rawConversationId
      )
        return;

      const now = new Date();
      const temp_id = uuidv4();
      const sendTime = Date.now();
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

      if (type === InboxMessageType.Image || type === InboxMessageType.Note) {
        setTimeout(() => {
          scrollToShowNewMessage();
        }, 0);
      }

      if (type === InboxMessageType.Image) {
        setPendingImageLoads((prev) => prev + 1);
      }

      sendAgentMessage(
        {
          conversationId: rawConversationId,
          message: {
            content,
            type,
            metadata,
            temp_id,
          },
        },
        (res: any) => {
          const elapsedTime = Date.now() - sendTime;
          const minLoadingTime = 500;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

          setTimeout(() => {
            if (res?.success && res?.messageId) {
              removeMessage(temp_id);

              const realMessage: Message = {
                ...newMessage,
                id: res.messageId,
                status: InboxMessageStatus.Sent,
              };
              addMessage(realMessage);
            } else {
              updateMessage(temp_id, { status: InboxMessageStatus.Failed });
            }
          }, remainingTime);
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

    // Click outside to close active tab
    useEffect(() => {
      if (!activeTab) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        // If click is inside footer (input area), don't close tab
        if (footerRef.current && footerRef.current.contains(target)) {
          return;
        }

        // If click is inside tab content panel, don't close tab
        if (target && (target as Element).closest('[data-tab-panel="true"]')) {
          return;
        }

        // Close active tab
        setActiveTab(null);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [activeTab]);

    const MENU_WIDTH = 180;

    const handleIconClick = (e: React.MouseEvent, message: Message) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = e.currentTarget.getBoundingClientRect();
      const isAgent = message.sender === InboxSender.Agent;

      let x, y;

      if (isAgent) {
        x = rect.left - MENU_WIDTH - 5;
        y = rect.top;
      } else {
        x = rect.right + 5;
        y = rect.top;
      }

      // Check horizontal bounds
      if (x + MENU_WIDTH > window.innerWidth) {
        x = window.innerWidth - MENU_WIDTH - 8;
      }
      if (x < 8) {
        x = 8;
      }

      // Check vertical bounds
      const menuHeight = isAgent ? 200 : 100; // Approximate height based on menu items
      if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 8;
      }
      if (y < 8) {
        y = 8;
      }

      setContextMenu({
        x: x,
        y: y,
        visible: true,
        message,
        messageId: message.id,
      });

      setHoveredMessageId(message.id);
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
              message: 'Text copied to clipboard!',
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
                message: 'Text copied to clipboard!',
              }),
            );
            closeContextMenu();
          } catch (fallbackError) {
            toast.error(
              React.createElement(ToastMessage, {
                typeToast: ToastMessageType.ERROR,
                message: 'Failed to copy text',
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

    const renderTabContent = () => {
      switch (activeTab) {
        case 'Shortcuts':
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
        case 'Note':
          return null;
        case 'Reminder':
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
        case 'Knowledge Base':
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

    const renderContextMenu = () => {
      if (!contextMenu.visible || !contextMenu.message) return null;

      const isAgentMessage = contextMenu.message.sender === InboxSender.Agent;
      const isImageMessage =
        contextMenu.message.type === InboxMessageType.Image;

      if (isImageMessage) {
        return (
          <S.ContextMenu
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
              position: 'fixed',
              width: MENU_WIDTH,
              zIndex: 1000,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              if (contextMenu.messageId) {
                setHoveredMessageId(contextMenu.messageId);
              }
            }}
            onMouseLeave={() => {
              setHoveredMessageId(null);
            }}
          >
            <S.ContextMenuItem onClick={handleReply}>
              <img src={iconReply} alt="Reply" />
              Reply
            </S.ContextMenuItem>
            <S.ContextMenuSeparator />
            <S.ContextMenuItem onClick={handleDeleteMessage} danger>
              <img src={iconDelete} alt="Delete" />
              Delete
            </S.ContextMenuItem>
          </S.ContextMenu>
        );
      }

      return (
        <S.ContextMenu
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: 'fixed',
            width: MENU_WIDTH,
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => {
            if (contextMenu.messageId) {
              setHoveredMessageId(contextMenu.messageId);
            }
          }}
          onMouseLeave={() => {
            setHoveredMessageId(null);
          }}
        >
          <S.ContextMenuItem
            style={{ borderBottom: '1px solid #eee' }}
            onClick={handleReply}
          >
            <img src={iconReply} alt="Reply" />
            Reply
          </S.ContextMenuItem>

          {!isImageMessage && (
            <S.ContextMenuItem onClick={handleCopyText}>
              <img src={iconCopy} alt="Copy" />
              Copy text
            </S.ContextMenuItem>
          )}

          {isAgentMessage && (
            <>
              {!isImageMessage && (
                <S.ContextMenuItem onClick={handleEdit}>
                  <img src={iconEdit} alt="Edit" />
                  Edit
                </S.ContextMenuItem>
              )}
              <S.ContextMenuSeparator />
              <S.ContextMenuItem onClick={handleDeleteMessage} danger>
                <img src={iconDelete} alt="Delete" />
                Delete
              </S.ContextMenuItem>
            </>
          )}
        </S.ContextMenu>
      );
    };

    const [barMenu, setBarMenu] = useState<{
      visible: boolean;
      x: number;
      y: number;
    }>({ visible: false, x: 0, y: 0 });
    const barIconRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      if (barMenu.visible) {
        const close = () => setBarMenu((prev) => ({ ...prev, visible: false }));
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
      }
    }, [barMenu.visible]);

    if (!conversationId) {
      return (
        <S.Container>
          <S.EmptyState>{t('inboxDetail.selectConversation')}</S.EmptyState>
        </S.Container>
      );
    }

    const renderLoadingOverlay = () => (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <LoadingOutlined spin style={{ fontSize: 32, color: '#999' }} />
      </div>
    );

    return (
      <>
        <GlobalStyle />
        <S.Container>
          {renderContextMenu()}
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
              isSidebarOpen={isSidebarOpen}
              ref={messageContainerRef}
            >
              {messages.length === 0 && loading ? (
                renderSkeleton()
              ) : messages.length === 0 && !loading ? (
                <S.EmptyState>{t('inboxDetail.noMessage')}</S.EmptyState>
              ) : (
                <>
                  {isLoadingMoreMessages && (
                    <S.InboxSpinner>
                      <LoadingOutlined
                        spin
                        style={{ fontSize: 24, color: '#999' }}
                      />
                    </S.InboxSpinner>
                  )}
                  {messages
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
                                <S.AgentMessageContainer>
                                  <S.TimeWithIconContainer
                                    onMouseEnter={() =>
                                      setHoveredMessageId(msg.id)
                                    }
                                    onMouseLeave={() => {
                                      if (!contextMenu.visible) {
                                        setHoveredMessageId(null);
                                      }
                                    }}
                                  >
                                    {hoveredMessageId === msg.id ? (
                                      <S.MessageHoverIconNearTime
                                        onClick={(e) => handleIconClick(e, msg)}
                                      >
                                        <img src={icBar} alt="menu" />
                                      </S.MessageHoverIconNearTime>
                                    ) : (
                                      <S.MessageHoverIconPlaceholder />
                                    )}
                                    <S.MessageTime>
                                      {formatTime(msg.createdAt)}
                                      {msg.status ===
                                        InboxMessageStatus.Sending && (
                                        <LoadingOutlined
                                          style={{
                                            marginLeft: 6,
                                            fontSize: 12,
                                          }}
                                          spin
                                        />
                                      )}
                                      {msg.status ===
                                        InboxMessageStatus.Failed && (
                                        <Tooltip title="Send failed">
                                          <CloseCircleTwoTone
                                            twoToneColor="#ff4d4f"
                                            style={{
                                              marginLeft: 6,
                                              fontSize: 12,
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    </S.MessageTime>
                                  </S.TimeWithIconContainer>
                                  <S.MessageImage
                                    onMouseEnter={() =>
                                      setHoveredMessageId(msg.id)
                                    }
                                    onMouseLeave={() => {
                                      if (!contextMenu.visible) {
                                        setHoveredMessageId(null);
                                      }
                                    }}
                                  >
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
                                </S.AgentMessageContainer>
                              ) : msg.type === InboxMessageType.Note ? (
                                <S.NoteContainer>
                                  <S.NoteRow>
                                    <S.TimeWithIconContainer
                                      onMouseEnter={() =>
                                        setHoveredMessageId(msg.id)
                                      }
                                      onMouseLeave={() => {
                                        if (!contextMenu.visible) {
                                          setHoveredMessageId(null);
                                        }
                                      }}
                                    >
                                      {hoveredMessageId === msg.id ? (
                                        <S.MessageHoverIconNearTime
                                          onClick={(e) =>
                                            handleIconClick(e, msg)
                                          }
                                        >
                                          <img src={icBar} alt="menu" />
                                        </S.MessageHoverIconNearTime>
                                      ) : (
                                        <S.MessageHoverIconPlaceholder />
                                      )}
                                      <S.MessageTime>
                                        {formatTime(msg.createdAt)}
                                        {msg.status ===
                                          InboxMessageStatus.Sending && (
                                          <LoadingOutlined
                                            style={{
                                              marginLeft: 6,
                                              fontSize: 12,
                                            }}
                                            spin
                                          />
                                        )}
                                        {msg.status ===
                                          InboxMessageStatus.Failed && (
                                          <Tooltip title="Send failed">
                                            <CloseCircleTwoTone
                                              twoToneColor="#ff4d4f"
                                              style={{
                                                marginLeft: 6,
                                                fontSize: 12,
                                              }}
                                            />
                                          </Tooltip>
                                        )}
                                      </S.MessageTime>
                                    </S.TimeWithIconContainer>
                                    <S.NoteBubbleRight
                                      onMouseEnter={() =>
                                        setHoveredMessageId(msg.id)
                                      }
                                      onMouseLeave={() => {
                                        if (!contextMenu.visible) {
                                          setHoveredMessageId(null);
                                        }
                                      }}
                                    >
                                      {msg.content}
                                    </S.NoteBubbleRight>
                                  </S.NoteRow>
                                  <S.NoteMeta>
                                    Admin left this private note
                                  </S.NoteMeta>
                                </S.NoteContainer>
                              ) : (
                                <S.AgentMessageContainer>
                                  <S.TimeWithIconContainer
                                    onMouseEnter={() =>
                                      setHoveredMessageId(msg.id)
                                    }
                                    onMouseLeave={() => {
                                      if (!contextMenu.visible) {
                                        setHoveredMessageId(null);
                                      }
                                    }}
                                  >
                                    {hoveredMessageId === msg.id ? (
                                      <S.MessageHoverIconNearTime
                                        onClick={(e) => handleIconClick(e, msg)}
                                      >
                                        <img src={icBar} alt="menu" />
                                      </S.MessageHoverIconNearTime>
                                    ) : (
                                      <S.MessageHoverIconPlaceholder />
                                    )}
                                    <S.MessageTime>
                                      {formatTime(msg.createdAt)}
                                      {msg.status ===
                                        InboxMessageStatus.Sending && (
                                        <LoadingOutlined
                                          style={{
                                            marginLeft: 6,
                                            fontSize: 12,
                                          }}
                                          spin
                                        />
                                      )}
                                      {msg.status ===
                                        InboxMessageStatus.Failed && (
                                        <Tooltip title="Send failed">
                                          <CloseCircleTwoTone
                                            twoToneColor="#ff4d4f"
                                            style={{
                                              marginLeft: 6,
                                              fontSize: 12,
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    </S.MessageTime>
                                  </S.TimeWithIconContainer>
                                  <S.MessageBubbleRight
                                    onMouseEnter={() =>
                                      setHoveredMessageId(msg.id)
                                    }
                                    onMouseLeave={() => {
                                      if (!contextMenu.visible) {
                                        setHoveredMessageId(null);
                                      }
                                    }}
                                  >
                                    {msg.content}
                                  </S.MessageBubbleRight>
                                </S.AgentMessageContainer>
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
                                    <S.MessageImageLeft
                                      onMouseEnter={() =>
                                        setHoveredMessageId(msg.id)
                                      }
                                      onMouseLeave={() => {
                                        if (!contextMenu.visible) {
                                          setHoveredMessageId(null);
                                        }
                                      }}
                                    >
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
                                    <S.GuestMessageContainer>
                                      <S.MessageBubbleLeft
                                        onMouseEnter={() =>
                                          setHoveredMessageId(msg.id)
                                        }
                                        onMouseLeave={() => {
                                          if (!contextMenu.visible) {
                                            setHoveredMessageId(null);
                                          }
                                        }}
                                      >
                                        {msg.content}
                                      </S.MessageBubbleLeft>
                                    </S.GuestMessageContainer>
                                  )}
                                </S.MessageColumnView>
                              </S.MessageAvatarWrapper>
                              <S.TimeWithIconContainer
                                onMouseEnter={() => setHoveredMessageId(msg.id)}
                                onMouseLeave={() => {
                                  if (!contextMenu.visible) {
                                    setHoveredMessageId(null);
                                  }
                                }}
                              >
                                <S.MessageTime>
                                  {formatTime(msg.createdAt)}
                                  {msg.status ===
                                    InboxMessageStatus.Sending && (
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
                                {hoveredMessageId === msg.id ? (
                                  <S.MessageHoverIconNearTime
                                    onClick={(e) => handleIconClick(e, msg)}
                                  >
                                    <img src={icBar} alt="menu" />
                                  </S.MessageHoverIconNearTime>
                                ) : (
                                  <S.MessageHoverIconPlaceholder />
                                )}
                              </S.TimeWithIconContainer>
                            </S.MessageRow>
                          )}
                        </React.Fragment>
                      );
                    })}
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
                {renderTabContent()}
              </S.TabOverlay>
            )}
          </S.MainContent>

          {/* Guest is typing indicator */}
          {guestTyping && (
            <S.TypingIndicator>
              {t('inboxDetail.guestIsTyping')}
            </S.TypingIndicator>
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
