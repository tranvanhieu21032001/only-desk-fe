import React from "react";
import Sidebar from "@/components/common/SideBar";

import * as S from "./main.styles";
import Header from "@/components/common/Header";

interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <S.LayoutWrapper>
            <Sidebar />
            <S.MainContent>
                <Header />
                <S.Body>
                    {children}
                </S.Body>
            </S.MainContent>
        </S.LayoutWrapper>
    );
};

export default MainLayout;
