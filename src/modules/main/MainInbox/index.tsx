import React, { useState } from "react";

import NotificationList from "@/shared/components/MainInbox/InboxList";
import InboxDetail from "@/shared/components/MainInbox/InboxDetail";
import InboxSidebar from "@/shared/components/MainInbox/InboxSidebar";

import * as S from "./inbox.styles";

const MainInbox: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <S.InboxWrapper>
      <NotificationList />

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
