import React from 'react';
import { Image } from 'antd';
import { useTranslation } from "react-i18next";

import * as S from './header.styles';

import bell from "@/assets/icons/common/ic-bell.svg";
import search from "@/assets/icons/common/ic-search.svg";

const Header: React.FC = () => {
    const { t } = useTranslation("main");

    return (
        <S.Header>
            <S.LeftSection>
                <S.Title>{t("header.title")}</S.Title>
                <S.Description>{t("header.description")}</S.Description>
            </S.LeftSection>
            <S.RightSection>
                <Image src={search} preview={false} />
                <Image src={bell} preview={false} />
                <S.AddNewButton>
                    <span className="plus">+</span>
                    <span className="text">{t("header.addNew")}</span>
                </S.AddNewButton>

            </S.RightSection>
        </S.Header>
    );
};

export default Header;
