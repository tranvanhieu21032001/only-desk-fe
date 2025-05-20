import React, { useState } from 'react';
import { Splitter } from 'antd';

import NotificationList from '../../components/inbox-list/InboxList';
import InboxDetail from '../../components/inbox-detail/InboxDetail';
import InboxSidebar from '../../components/inbox-sidebar/InboxSidebar';

import { DEFAULT_RESIZER_CONFIG } from '@/core/settings/constants';

import * as S from './InboxPage.styles';

const MainInbox: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
              <NotificationList />
            </S.InboxList>
          </Splitter.Panel>

          <Splitter.Panel>
            <S.InboxDetailWrapper isSidebarOpen={isSidebarOpen}>
              <InboxDetail
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </S.InboxDetailWrapper>
          </Splitter.Panel>
        </Splitter>
      </S.CustomSplitter>
      {isSidebarOpen && <InboxSidebar />}
    </S.InboxWrapper>
  );
};

export default MainInbox;
