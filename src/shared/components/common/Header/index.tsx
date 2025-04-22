import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'antd';
import { useTranslation } from "react-i18next";

import * as S from './header.styles';

import bell from "@/assets/icons/common/ic-bell.svg";
import search from "@/assets/icons/common/ic-search.svg";
import conversation from "@/assets/icons/common/ic-conversation.svg";
import addContact from "@/assets/icons/common/ic-add-contact.svg";
import team from "@/assets/icons/common/ic-team.svg";

const Header: React.FC = () => {
    const { t } = useTranslation("main");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <S.Header>
            <S.LeftSection>
                <S.Title>{t("header.title")}</S.Title>
                <S.Description>{t("header.description")}</S.Description>
            </S.LeftSection>

            <S.RightSection ref={dropdownRef}>
                <Image src={search} preview={false} />
                <Image src={bell} preview={false} />

                <S.AddNewButton onClick={toggleDropdown}>
                    <span className="plus">+</span>
                    <span className="text">{t("header.addNew")}</span>
                </S.AddNewButton>

                {dropdownOpen && (
                    <S.DropdownMenu>
                        <S.DropdownItem>
                            <Image src={conversation} alt="conversation" preview={false} />
                            {t("header.createConversation")}
                        </S.DropdownItem>
                        <S.DropdownItem>
                            <Image src={addContact} alt="contact" preview={false} />
                            {t("header.addNewContact")}
                        </S.DropdownItem>
                        <S.DropdownItem>
                            <Image src={team} alt="team" preview={false} />
                            {t("header.inviteTeamMembers")}
                        </S.DropdownItem>
                    </S.DropdownMenu>
                )}
            </S.RightSection>
        </S.Header>
    );
};

export default Header;
