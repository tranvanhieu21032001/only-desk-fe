import React, { useState, useCallback, Suspense, useMemo } from 'react';
import { Splitter } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { usePreloadedQuery, loadQuery } from 'react-relay';
import { useSelector } from 'react-redux';

import ConversationListPaginationQuery from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
import type { ConversationListPaginationQuery as ConversationListPaginationQueryType } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
import type { ConversationListPaginationQuery$data } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';

import { DEFAULT_RESIZER_CONFIG } from '@/core/settings/constants'; 
import ConversationList from '../../components/inbox-list/InboxList';
import InboxDetail from '../../components/inbox-detail/InboxDetail';
import RelayEnvironment from '@/relay/RelayEnvironment';
import InboxSidebar from '../../components/inbox-sidebar/InboxSidebar';
import { useAppSelector } from '@/shared/hooks';
import MessageInput from '../../components/message-input/MessageInput';
import AvatarWithStatus from '@/shared/components/common/Avatar';

import * as S from './InboxPage.styles';
import * as DetailS from '../../components/inbox-detail/InboxDetail.styles';

import avatarAdmin from '@/assets/images/avatar-default.png';
import check from '@/assets/icons/common/ic-check.svg';
import barOpen from '@/assets/icons/common/ic-bar-open.svg';
import barClose from '@/assets/icons/common/ic-bar.svg';
import flag from '@/assets/icons/common/ic-flag.svg';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';

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

// Skeleton fallback for detail - only messages area
const DetailSkeleton = () => {
  const { selectedConversation } = useAppSelector((state) => state.inbox);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSendMessage = () => {
    // Do nothing in skeleton mode
  };
  
  return (
    <DetailS.Container>
      {/* Header - Real UI component */}
      <DetailS.Header>
        <DetailS.HeaderLeft>
          <AvatarWithStatus
            avatarSrc={
              selectedConversation?.contact?.avatar || avatarAdmin
            }
            flagSrc={flag}
            isOnline={true}
          />
          <DetailS.Info>
            <DetailS.Name>
              {selectedConversation?.contact?.name || DEFAULT_FULL_NAME}
            </DetailS.Name>
          </DetailS.Info>
        </DetailS.HeaderLeft>
        <DetailS.HeaderRight>
          <DetailS.MarkResolvedButton>
            <img src={check} alt="check" /> Mark Resolved
          </DetailS.MarkResolvedButton>
          <DetailS.ToggleSidebarButton onClick={toggleSidebar}>
            <img
              src={isSidebarOpen ? barClose : barOpen}
              alt="toggle"
            />
          </DetailS.ToggleSidebarButton>
        </DetailS.HeaderRight>
      </DetailS.Header>

      {/* Messages Area - Skeleton Only */}
      <DetailS.MainContent>
        <DetailS.MessageContainer isSidebarOpen={isSidebarOpen}>
          {/* Message skeletons */}
          {[1, 2, 3, 4, 5].map((i) => (
            <S.SkeletonMessageRow key={i} $isAgent={i % 2 === 0}>
              {i % 2 === 0 ? (
                // Agent message (right side)
                <S.SkeletonAgentMessage>
                  <S.SkeletonAgentBubble>
                    <S.SkeletonText $width="120px" $backgroundColor="rgba(255,255,255,0.8)" />
                  </S.SkeletonAgentBubble>
                  <S.SkeletonTime>08:41 AM</S.SkeletonTime>
                </S.SkeletonAgentMessage>
              ) : (
                // Guest message (left side)
                <S.SkeletonGuestMessage>
                  <S.SkeletonGuestAvatar />
                  <S.SkeletonGuestContent>
                    <S.SkeletonGuestBubble>
                      <S.SkeletonText $width="100px" $backgroundColor="#ddd" />
                    </S.SkeletonGuestBubble>
                    <S.SkeletonTime>08:40 AM</S.SkeletonTime>
                  </S.SkeletonGuestContent>
                </S.SkeletonGuestMessage>
              )}
            </S.SkeletonMessageRow>
          ))}
        </DetailS.MessageContainer>
      </DetailS.MainContent>

      {/* Footer - Real MessageInput component */}
      <DetailS.Footer>
        <MessageInput
          activeTab={activeTab}
          selectedReminder={selectedReminder}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setActiveTab={setActiveTab}
          setSelectedReminder={setSelectedReminder}
          onSendMessage={handleSendMessage}
        />
      </DetailS.Footer>
    </DetailS.Container>
  );
};

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
