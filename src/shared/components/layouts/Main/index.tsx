import React from "react";

import Sidebar from "../../common/SideBar";
import Header from "../../common/Header";

import * as S from "./main.styles";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <Sidebar />
      <S.MainContent>
        <Header />
        <S.Body>{children}</S.Body>
      </S.MainContent>
    </S.LayoutWrapper>
  );
};

export default MainLayout;
