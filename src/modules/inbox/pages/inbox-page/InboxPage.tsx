import React, { useCallback, Suspense, useMemo } from 'react';
import { Splitter } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { usePreloadedQuery, loadQuery } from 'react-relay';
import { useDispatch, useSelector } from 'react-redux';

import ConversationListPaginationQuery from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
import type { ConversationListPaginationQuery as ConversationListPaginationQueryType } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
import type { ConversationListPaginationQuery$data } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';

import { DEFAULT_RESIZER_CONFIG } from '@/core/settings/constants';
import ConversationList from '../../components/inbox-list/InboxList';
import InboxDetail from '../../components/inbox-detail/InboxDetail';
import RelayEnvironment from '@/relay/RelayEnvironment';
import InboxSidebar from '../../components/inbox-sidebar/InboxSidebar';

import * as S from './InboxPage.styles';

import DetailSkeleton from '../../components/inbox-detail/DetailSkeleton';
import InboxListSkeleton from '../../components/inbox-list/InboxListSkeleton';
import { RootState } from '@/core/store';
import { toggleSidebar } from '../../store/features/inbox';

const queryRef = loadQuery<ConversationListPaginationQueryType>(
  RelayEnvironment,
  ConversationListPaginationQuery,
  { first: 10 },
);

const MainInbox: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const isSidebarOpen = useSelector(
    (state: RootState) => state.inbox.isSidebarOpen,
  );

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  // data: ConversationListPaginationQuery$data
  const data = usePreloadedQuery<ConversationListPaginationQueryType>(
    ConversationListPaginationQuery,
    queryRef,
  ) as ConversationListPaginationQuery$data;

  // conversationsList: Conversation[]
  const conversationsList =
    (
      (data as any).conversations?.edges as Array<{ node: any }> | undefined
    )?.map((edge) => edge.node) || [];

  // selectedConversation: any
  const selectedConversation = useMemo(() => {
    if (!activeConversationId) return null;
    return (
      conversationsList.find((conv: any) => conv.id === activeConversationId) ||
      null
    );
  }, [activeConversationId, conversationsList]);

  return (
    <S.InboxWrapper>
      <S.CustomSplitter>
        <Splitter style={{ height: '100%', width: '100%' }}>
          <Splitter.Panel
            min={DEFAULT_RESIZER_CONFIG.MIN_WIDTH}
            max={DEFAULT_RESIZER_CONFIG.MAX_WIDTH}
            defaultSize={DEFAULT_RESIZER_CONFIG.DEFAULT_WIDTH}
          >
            <S.InboxList>
              <Suspense fallback={<InboxListSkeleton />}>
                <ConversationList conversationsRef={data} />
              </Suspense>
            </S.InboxList>
          </Splitter.Panel>

          <Splitter.Panel>
            <S.InboxDetailWrapper $isSidebarOpen={isSidebarOpen}>
              <Suspense fallback={<DetailSkeleton />}>
                <InboxDetail
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={handleToggleSidebar}
                  conversation={selectedConversation}
                />
              </Suspense>
            </S.InboxDetailWrapper>
          </Splitter.Panel>
        </Splitter>
      </S.CustomSplitter>
      {isSidebarOpen && <InboxSidebar />}
    </S.InboxWrapper>
  );
};

export default MainInbox;
