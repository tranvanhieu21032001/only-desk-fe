import React, { useRef, useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import { useAppDispatch } from '@/shared/hooks';
// import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';

import * as S from './InboxList.styles';

import InboxItem from './InboxItem';

import { useConversations } from '@/shared/conversations-logic/hooks/useConversations';
import { prefetchMessagesForConversation } from '@/shared/chat-logic/services/prefetch';
import type { Conversation } from '@/shared/interfaces/conversation.interface';
import { ConversationFilterEnum } from '@/shared/helper/enums/common';

type Props = {
  onSelectConversation?: (conversation: any) => void;
  isAssignedToMe: boolean | null;
  filter: string;
  keyword: string;
};

const ConversationList: React.FC<Props> = ({
  onSelectConversation: _onSelectConversation,
  isAssignedToMe,
  filter,
  keyword,
}) => {
  const { t } = useTranslation('inbox');
  const conversationListWrapperRef = useRef<HTMLDivElement>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const filterEnum: ConversationFilterEnum | undefined =
    filter.toUpperCase() in ConversationFilterEnum
      ? (filter.toUpperCase() as ConversationFilterEnum)
      : undefined;

  const { conversations, isFetchingInitial, isLoadingNext } = useConversations({
    isAssignedToMe,
    conversationContainerRef: conversationListWrapperRef,
    filter: filterEnum,
    keyword,
  });

  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      const firstConversationId = conversations[0].id;
      navigate(`?conversationId=${firstConversationId}`, { replace: true });
    }
  }, [activeConversationId, conversations, navigate]);

  useEffect(() => {
    const el = conversationListWrapperRef.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Restore scroll position when activeConversationId changes (URL changes)
  useEffect(() => {
    const el = conversationListWrapperRef.current;
    if (!el) return;
    const SCROLL_KEY = 'inbox-convlist-scroll';
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      // Restore in next frame to ensure layout is applied
      requestAnimationFrame(() => {
        el.scrollTop = parseInt(saved, 10) || 0;
      });
    }
  }, [activeConversationId]);

  const handleConversationClick = async (conv: Conversation) => {
    if (activeConversationId == conv.id) return;

    // Persist current scroll before navigation to prevent jump-to-top
    const el = conversationListWrapperRef.current;
    const SCROLL_KEY = 'inbox-convlist-scroll';
    if (el) sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop));

    const params = new URLSearchParams(searchParams);
    params.set('conversationId', conv.id);
    navigate({ search: params.toString() }, {
      preventScrollReset: true,
    } as any);
  };

  return (
    <S.ConversationListWrapper
      ref={conversationListWrapperRef}
      className={isScrolling ? 'scrolling' : ''}
    >
      {conversations.length === 0 && !isFetchingInitial && (
        <S.AllDataLoaded>{t('inboxList.noConversationYet')}</S.AllDataLoaded>
      )}
      {conversations.map((conversation) => {
        return (
          <div
            key={conversation.id}
            onPointerEnter={() => {
              if (conversation.rawId) {
                prefetchMessagesForConversation(conversation.rawId);
              }
            }}
          >
            <InboxItem
              conversation={conversation}
              onClickConversation={() => {
                handleConversationClick(conversation);
              }}
              activeConversationId={activeConversationId}
            />
          </div>
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
  );
};

export default ConversationList;
