import React, { useState } from "react";

import NotificationList from "@/shared/components/MainInbox/InboxList";
import InboxDetail from "@/shared/components/MainInbox/InboxDetail";
import InboxSidebar from "@/shared/components/MainInbox/InboxSidebar";
import Resizer from "@/shared/components/common/Resizer";

import { DEFAULT_RESIZER_CONFIG } from "@/core/settings/constants";

import * as S from "./inbox.styles";

const MainInbox: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [listWidth, setListWidth] = useState<number>(DEFAULT_RESIZER_CONFIG.DEFAULT_WIDTH);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleResize = (newWidth: number) => {
    setListWidth(newWidth);
  };

  return (
    <S.InboxWrapper>
      <S.InboxList width={listWidth}>
        <NotificationList />
      </S.InboxList>

      <Resizer
        onResize={handleResize}
        minWidth={DEFAULT_RESIZER_CONFIG.MIN_WIDTH}
        maxWidth={DEFAULT_RESIZER_CONFIG.MAX_WIDTH}
      />

      <S.DetailAndSidebarWrapper>
        <S.InboxDetailWrapper isSidebarOpen={isSidebarOpen}>
          <InboxDetail
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </S.InboxDetailWrapper>

        {isSidebarOpen && <InboxSidebar />}
      </S.DetailAndSidebarWrapper>
    </S.InboxWrapper>
  );
};

export default MainInbox;
