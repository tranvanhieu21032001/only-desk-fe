import React from "react";
import { Image } from "antd";
import { useTranslation } from "react-i18next";

import * as S from './menu.styles';

import box from "@/assets/icons/common/ic-box.svg";
import userCheck from "@/assets/icons/common/ic-user-check.svg";
import add from "@/assets/icons/common/ic-add.svg";
import spam from "@/assets/icons/common/ic-spam.svg";

const MenuSidebar: React.FC = () => {
    const { t } = useTranslation("main");

    return (
        <S.MenuContainer>
            <S.MenuTitle>
                {t("side-bar.title")}
            </S.MenuTitle>
            <S.Underline />

            <S.MenuItem>
                <Image src={box} preview={false} />
                {t("side-bar.allChats")}
                <S.Badge>2</S.Badge>
            </S.MenuItem>

            <S.MenuItem>
                <Image src={userCheck} preview={false} />
                {t("side-bar.assignedToMe")}
                <S.Badge>2</S.Badge>
            </S.MenuItem>

            <S.Divider />

            <S.MenuItem>
                <Image src={add} preview={false} />
                {t("side-bar.newSubInbox")}
            </S.MenuItem>

            <S.Divider />

            <S.MenuItem style={{ color: "#F44336" }}>
                <Image src={spam} preview={false} />
                {t("side-bar.spamChats")}
            </S.MenuItem>
        </S.MenuContainer>
    );
};

export default MenuSidebar;
