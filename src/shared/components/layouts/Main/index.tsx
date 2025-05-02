import React from "react";

import Sidebar from "../../common/SideBar";
import Header from "../../common/Header";
import RouteTitleManager from "../../common/RouteTitle";

import { TitleProvider } from "@/core/context/TitleContext";

import * as S from "./main.styles";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <TitleProvider>
      <RouteTitleManager />
      <S.LayoutWrapper>
        <Sidebar />
        <S.MainContent>
          <Header />
          <S.Body>{children}</S.Body>
        </S.MainContent>
      </S.LayoutWrapper>
    </TitleProvider>
  );
};

export default MainLayout;
