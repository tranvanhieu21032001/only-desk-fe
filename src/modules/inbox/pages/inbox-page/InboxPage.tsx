import React, { useState, useCallback, Suspense, useMemo } from 'react';
import { Splitter } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { usePreloadedQuery, loadQuery } from 'react-relay';

import ConversationListPaginationQuery from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
import type { ConversationListPaginationQuery as ConversationListPaginationQueryType } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
import type { ConversationListPaginationQuery$data } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';

import { DEFAULT_RESIZER_CONFIG } from '@/core/settings/constants'; 
import ConversationList from '../../components/inbox-list/InboxList';
import InboxDetail from '../../components/inbox-detail/InboxDetail';
import RelayEnvironment from '@/relay/RelayEnvironment';
import InboxSidebar from '../../components/inbox-sidebar/InboxSidebar';

import * as S from './InboxPage.styles';

const queryRef = loadQuery<ConversationListPaginationQueryType>(
  RelayEnvironment,
  ConversationListPaginationQuery,
  { first: 10 }
);

// Simple skeleton fallback for list
const ListSkeleton = () => (
  <div style={{ padding: 24 }}>
    {[1,2,3,4,5].map(i => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: '#eee', marginRight: 12 }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: 120, height: 16, background: '#eee', marginBottom: 8, borderRadius: 4 }} />
          <div style={{ width: 200, height: 12, background: '#f3f3f3', borderRadius: 4 }} />
        </div>
      </div>
    ))}
  </div>
);

// Simple skeleton fallback for detail
const DetailSkeleton = () => (
  <div style={{ padding: 32 }}>
    <div style={{ width: 120, height: 24, background: '#eee', borderRadius: 6, marginBottom: 24 }} />
    {[1,2,3,4,5].map(i => (
      <div key={i} style={{ width: 320, height: 20, background: '#f3f3f3', borderRadius: 4, marginBottom: 12 }} />
    ))}
  </div>
);

const MainInbox: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // data: ConversationListPaginationQuery$data
  const data = usePreloadedQuery<ConversationListPaginationQueryType>(
    ConversationListPaginationQuery,
    queryRef
  ) as ConversationListPaginationQuery$data;

  // conversationsList: Conversation[]
  const conversationsList = ((data as any).conversations?.edges as Array<{ node: any }> | undefined)?.map((edge) => edge.node) || [];

  // selectedConversation: any
  const selectedConversation = useMemo(() => {
    if (!activeConversationId) return null;
    return conversationsList.find((conv: any) => conv.id === activeConversationId) || null;
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
              <Suspense fallback={<ListSkeleton />}>
                <ConversationList conversationsRef={data} />
              </Suspense>
            </S.InboxList>
          </Splitter.Panel>

          <Splitter.Panel>
            <S.InboxDetailWrapper isSidebarOpen={isSidebarOpen}>
              <Suspense fallback={<DetailSkeleton />}>
                <InboxDetail
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
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
