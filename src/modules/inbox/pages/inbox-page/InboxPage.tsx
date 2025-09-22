import React, { useCallback, Suspense, useState, useEffect } from 'react';
import { Splitter } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import ConversationListPaginationQuery from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
// import type { ConversationListPaginationQuery as ConversationListPaginationQueryType } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';
// import type { ConversationListPaginationQuery$data } from '@/relay/__generated__/ConversationListPaginationQuery.graphql';

import { DEFAULT_RESIZER_CONFIG } from '@/core/settings/constants';
import ConversationList from '../../components/inbox-list/InboxList';
import InboxDetail from '../../components/inbox-detail/InboxDetail';
import InboxSidebar from '../../components/inbox-sidebar/InboxSidebar';

import * as S from './InboxPage.styles';

import DetailSkeleton from '../../components/inbox-detail/DetailSkeleton';
import InboxListSkeleton from '../../components/inbox-list/InboxListSkeleton';
import { RootState } from '@/core/store';
import { toggleSidebar } from '../../store/features/inbox';
import InboxListHeader from '../../components/inbox-list/InboxListHeader';

const MainInbox: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const isAssignedToMePage = location.pathname === '/assigned-to-me';

  const isSidebarOpen = useSelector(
    (state: RootState) => state.inbox.isSidebarOpen,
  );

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  // local state filter + keyword (đưa lên đây để header và list share chung)
  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'ALL');
  const [keyword, setKeyword] = useState<string>(searchParams.get('keyword') || '');

  // khi URL thay đổi, update lại state để đồng bộ
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilter(params.get('filter') || 'ALL');
    setKeyword(params.get('keyword') || '');
  }, [location.search]);

  // hàm đồng bộ URL khi search hoặc filter thay đổi
  const updateURL = ({ filter: newFilter, keyword: newKeyword }: { filter?: string; keyword?: string }) => {
    const params = new URLSearchParams(location.search);
    if (newFilter !== undefined) params.set('filter', newFilter);
    if (newKeyword !== undefined) params.set('keyword', newKeyword);
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    updateURL({ filter: newFilter });
  };

  const handleSearchChange = (newKeyword: string) => {
    setKeyword(newKeyword);
    updateURL({ keyword: newKeyword });
  };

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
              <InboxListHeader
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                selectedFilter={filter}
                searchValue={keyword} // bind value
              />
              <Suspense fallback={<InboxListSkeleton />}>
                <ConversationList
                  isAssignedToMe={isAssignedToMePage}
                  filter={filter}
                  keyword={keyword}
                />
              </Suspense>
            </S.InboxList>
          </Splitter.Panel>

          <Splitter.Panel>
            <S.InboxDetailWrapper $isSidebarOpen={isSidebarOpen}>
              <Suspense fallback={<DetailSkeleton />}>
                <InboxDetail
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={handleToggleSidebar}
                />
              </Suspense>
            </S.InboxDetailWrapper>
          </Splitter.Panel>
        </Splitter>
      </S.CustomSplitter>
      {isSidebarOpen && !!activeConversationId && <InboxSidebar />}
    </S.InboxWrapper>
  );
};

export default MainInbox;
