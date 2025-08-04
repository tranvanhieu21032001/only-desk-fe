import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';

import * as S from './InboxList.styles';

import InboxItem from './InboxItem';
import InboxListHeader from './InboxListHeader';
import { useConversations } from '@/shared/conversations-logic/hooks/useConversations';

type Props = {
  onSelectConversation?: (conversation: any) => void;
  isAssignedToMe: boolean | null;
};

const ConversationList: React.FC<Props> = ({
  onSelectConversation,
  isAssignedToMe,
}) => {
  const { t } = useTranslation('inbox');
  const conversationListWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const { conversations, isFetchingInitial, isLoadingNext } = useConversations({
    isAssignedToMe,
    conversationContainerRef: conversationListWrapperRef,
  });

  const workspaceId = useSelector(selectCurrentWorkspaceId);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (onSelectConversation && activeConversationId) {
  //     const conversation = data.conversations.edges.find(
  //       (edge) => edge.node.id === activeConversationId,
  //     )?.node;
  //     if (conversation) {
  //       onSelectConversation(conversation);
  //     }
  //   }
  // }, [activeConversationId, onSelectConversation, data.conversations.edges]);

  // useEffect(() => {
  //   const handleWorkspaceChange = () => {
  //     refreshConversations(isAssignedToMe);
  //   };

  //   eventBus.on(EVENTBUS_WORKSPACE_CHANGED as any, handleWorkspaceChange);
  //   return () => {
  //     eventBus.off(EVENTBUS_WORKSPACE_CHANGED as any, handleWorkspaceChange);
  //   };
  // }, [workspaceId, dispatch]);

  const handleConversationClick = (conversationId: string) => {
    // const conversation = conversations.find(
    //   (edge) => edge.node.id === conversationId,
    // )?.node;
    // if (conversation) {
    //   const conversationData: Conversation = {
    //     id: conversation.id,
    //     rawId: conversation.rawId || '',
    //     contact: {
    //       id: conversation.contact?.id || '',
    //       rawId: conversation.contact?.rawId || '',
    //       createdAt: conversation.createdAt || '',
    //       updatedAt: conversation.updatedAt || '',
    //       guestId: '',
    //       name: conversation.contact?.name || 'No Name',
    //       email: conversation.contact?.email || '',
    //       notification: true,
    //       segments: [],
    //       isOnline: conversation.contact?.isOnline || false,
    //       lastActivityAt: conversation.lastActivityAt || '',
    //       workspaceId: workspaceId || '',
    //       avatar: conversation.contact?.avatar || '',
    //       countryCode: conversation?.contact?.context?.countryCode || '',
    //     },
    //     assignedTo: conversation.assignedTo?.id || null,
    //     participants: [],
    //     lastActivityAt: conversation.lastActivityAt || '',
    //     latestMessage: {
    //       id: conversation.id,
    //       content: conversation.latestMessage?.content || '',
    //       sender: 'agent',
    //       createdAt: conversation.lastActivityAt || '',
    //       updatedAt: conversation.lastActivityAt || '',
    //       type: 'text',
    //       status: 'sent',
    //       user: null,
    //     },
    //   };
    //   dispatch(setSelectedConversation(conversationData));
    //   if (onSelectConversation) {
    //     onSelectConversation(conversation);
    //   }
    // }
    navigate(`?conversationId=${conversationId}`);
  };

  return (
    <S.Container>
      <InboxListHeader />

      <S.ConversationListWrapper ref={conversationListWrapperRef}>
        {conversations.length === 0 && !isFetchingInitial && (
          <S.AllDataLoaded>{t('inboxList.noConversationYet')}</S.AllDataLoaded>
        )}
        {conversations.map((conversation) => {
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
