import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { commitLocalUpdate, ConnectionHandler, usePaginationFragment } from 'react-relay';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RecordSourceSelectorProxy } from 'relay-runtime';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { conversationListFragment } from '@/relay/ConversationListFragment';
import type { ConversationListFragment_query$key } from '@/relay/__generated__/ConversationListFragment_query.graphql';
import { eventBus } from '@/core/event-bus';
import { EVENTBUS_WORKSPACE_CHANGED } from '@/core/settings/constants';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import {
  fetchConversations,
  setSelectedConversation,
  updateConversationUnreadCount,
} from '../../store/features/inbox';

import { Conversation } from '../../interfaces/inbox';

import * as S from './InboxList.styles';

import InboxItem from './InboxItem';
import InboxListHeader from './InboxListHeader';

import environment from '@/relay/RelayEnvironment';
import { decodeGlobalId } from '@/shared/utils/decode';
import { openConversation } from '@/core/services/socket/socket';
import { deleteConversation } from '../../api/inbox.api';

type Props = {
  conversationsRef: ConversationListFragment_query$key;
  onSelectConversation?: (conversation: any) => void;
};

const ConversationList: React.FC<Props> = ({
  conversationsRef,
  onSelectConversation,
}) => {
  const { t } = useTranslation('inbox');
  const conversationListWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    conversationListFragment,
    conversationsRef,
  );

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  const workspaceId = useSelector(selectCurrentWorkspaceId);
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector((state) => state.inbox);

  useEffect(() => {
    if (onSelectConversation && activeConversationId) {
      const conversation = data.conversations.edges.find(
        (edge) => edge.node.id === activeConversationId,
      )?.node;
      if (conversation) {
        onSelectConversation(conversation);
      }
    }
  }, [activeConversationId, onSelectConversation, data.conversations.edges]);

  useEffect(() => {
    const wrapper = conversationListWrapperRef.current;
    if (!wrapper) return;
    const handleScroll = () => {
      if (
        wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 50 &&
        hasNext &&
        !isLoadingNext
      ) {
        loadNext(10);
      }
    };
    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [hasNext, isLoadingNext, loadNext]);

  useEffect(() => {
    const handleWorkspaceChange = () => {
      if (workspaceId && !conversations[workspaceId]) {
        dispatch(fetchConversations(workspaceId));
      }
    };

    eventBus.on(EVENTBUS_WORKSPACE_CHANGED as any, handleWorkspaceChange);
    return () => {
      eventBus.off(EVENTBUS_WORKSPACE_CHANGED as any, handleWorkspaceChange);
    };
  }, [workspaceId, dispatch, conversations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(target)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleMenuClick = (index: number, e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setActiveMenu(activeMenu === index ? null : index);
  // };

  // const handleMenuItemClick = async (
  //   action: string,
  //   e: React.MouseEvent,
  //   conversationId?: string,
  // ) => {
  //   e.stopPropagation();
  //   setActiveMenu(null);

  //   if (action === 'delete' && conversationId) {
  //     try {
  //       const realId = decodeGlobalId(conversationId);
  //       await deleteConversation(realId);
  //       commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
  //         const root = store.getRoot();

  //         const connection = ConnectionHandler.getConnection(
  //           root,
  //           'ConversationListFragment_conversations'
  //         );

  //         if (!connection) return;
  //         ConnectionHandler.deleteNode(connection, conversationId);
  //         store.delete(conversationId);
  //         navigate('/inbox');
  //       });
  //     } catch (err) {
  //       console.error('Failed to delete conversation:', err);
  //     }
  //   }

  //   if (action === 'unread' && conversationId) {
  //     const rawConversationId = decodeGlobalId(conversationId);
  //     openConversation(rawConversationId);
  //     if (workspaceId) {
  //       dispatch(updateConversationUnreadCount({ workspaceId, conversationId, unreadCount: 0 }));
  //     }
  //   }
  // };

  const handleConversationClick = (conversationId: string) => {
    const conversation = data.conversations.edges.find(
      (edge) => edge.node.id === conversationId,
    )?.node;
    if (conversation) {
      const conversationData: Conversation = {
        id: conversation.id,
        rawId: conversation.rawId || '',
        contact: {
          id: conversation.contact?.id || '',
          rawId: conversation.contact?.rawId || '',
          createdAt: conversation.createdAt || '',
          updatedAt: conversation.updatedAt || '',
          guestId: '',
          name: conversation.contact?.name || 'Guest',
          email: conversation.contact?.email || '',
          notification: true,
          segments: [],
          isOnline: conversation.contact?.isOnline || false,
          lastActivityAt: conversation.lastActivityAt || '',
          workspaceId: workspaceId || '',
          avatar: conversation.contact?.avatar || '',
          countryCode: conversation?.contact?.context?.countryCode || '',
        },
        assignedTo: conversation.assignedTo?.id || null,
        participants: [],
        lastActivityAt: conversation.lastActivityAt || '',
        latestMessage: {
          id: conversation.id,
          content: conversation.latestMessage?.content || '',
          sender: 'agent',
          createdAt: conversation.lastActivityAt || '',
          updatedAt: conversation.lastActivityAt || '',
          type: 'text',
          status: 'sent',
          user: null,
        },
      };
      dispatch(setSelectedConversation(conversationData));
      if (onSelectConversation) {
        onSelectConversation(conversation);
      }
    }
    navigate(`?conversationId=${conversationId}`);
  };

  return (
    <S.Container>
      <InboxListHeader />

      <S.ConversationListWrapper ref={conversationListWrapperRef}>
        {data.conversations.edges.length === 0 && !isLoadingNext && (
          <S.AllDataLoaded>{t('inboxList.noConversationYet')}</S.AllDataLoaded>
        )}
        {data.conversations.edges.map((edge) => {
          const conversation = edge.node;
          return (
            <InboxItem
              key={conversation.id}
              conversation={conversation}
              onClickConversation={() => {
                handleConversationClick(conversation.id);
              }}
              activeConversationId={activeConversationId}
            />
          );
        })}
        {isLoadingNext && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              width: '100%',
            }}
          >
            <LoadingOutlined spin style={{ fontSize: 24, color: '#999' }} />
          </div>
        )}
      </S.ConversationListWrapper>
    </S.Container>
  );
};

export default ConversationList;
