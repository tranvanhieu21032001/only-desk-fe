import React, { useState } from 'react';
import { Image } from 'antd';

import MenuSidebar from '../Menu';

import * as S from "./side-bar.styles";

import main from "@/assets/icons/common/ic-main.svg";
import global from "@/assets/icons/common/ic-global.svg";
import contact from "@/assets/icons/common/ic-contact.svg";
import processor from "@/assets/icons/common/ic-processor.svg";
import megaPhone from "@/assets/icons/common/ic-megaphone.svg";
import chart from "@/assets/icons/common/ic-chart.svg";
import tags from "@/assets/icons/common/ic-tags.svg";
import app from "@/assets/icons/common/ic-app.svg";
import setting from "@/assets/icons/common/ic-setting.svg";
import avatarDefault from "@/assets/images/avatar-default.png";

const Sidebar: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <S.SidebarContainer>
            <S.TopSection>
                <S.Avatar src={avatarDefault} />
                <S.Underline />
                <S.TopContainer>
                    <S.IconWrapper
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        active={isHovered}
                    >
                        <Image src={main} preview={false} />
                        {isHovered && <MenuSidebar />}
                    </S.IconWrapper>
                    <S.IconWrapper><Image src={global} preview={false} /></S.IconWrapper>
                    <S.IconWrapper><Image src={contact} preview={false} /></S.IconWrapper>
                    <S.IconWrapper><Image src={processor} preview={false} /></S.IconWrapper>
                    <S.IconWrapper><Image src={megaPhone} preview={false} /></S.IconWrapper>
                    <S.IconWrapper><Image src={tags} preview={false} /></S.IconWrapper>
                    <S.IconWrapper><Image src={chart} preview={false} /></S.IconWrapper>
                    <S.IconWrapper><Image src={app} preview={false} /></S.IconWrapper>
                </S.TopContainer>
            </S.TopSection>

            <S.BottomContainer>
                <S.IconWrapper>
                    <Image src={setting} preview={false} />
                </S.IconWrapper>
                <S.BottomAvatar src={avatarDefault} />
            </S.BottomContainer>
        </S.SidebarContainer>
    );
};

export default Sidebar;
