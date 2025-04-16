import React from 'react';
import { Image } from 'antd';
import { useTranslation } from "react-i18next";

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
import headphone from "@/assets/icons/common/ic-headphone.svg";
import avatarDefault from "@/assets/images/avatar-default.png";

const Sidebar: React.FC = () => {
    const { t } = useTranslation("main");

    return (
        <S.SidebarContainer>
            <S.TopSection>
                <S.Avatar src={avatarDefault} />
                <S.Underline />
                <S.TopContainer>
                    <S.SectionLabel>{t("main")}</S.SectionLabel>
                    <Image src={main} preview={false} />
                    <Image src={global} preview={false} />
                    <Image src={contact} preview={false} />
                    <Image src={processor} preview={false} />
                    <Image src={megaPhone} preview={false} />
                    <Image src={tags} preview={false} />
                    <Image src={chart} preview={false} />
                    <Image src={app} preview={false} />
                </S.TopContainer>
                <S.BottomContainer>
                    <S.SectionLabel>{t("other")}</S.SectionLabel>
                    <Image src={setting} preview={false} />
                    <Image src={headphone} preview={false} />
                </S.BottomContainer>
            </S.TopSection>

            <S.BottomAvatar src={avatarDefault} />
        </S.SidebarContainer >
    );
};

export default Sidebar;
