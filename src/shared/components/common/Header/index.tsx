import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'antd';
import { useTranslation } from "react-i18next";

import Button from '../Button';
import CreateConversationModal from '../Modal';

import { conversationOptions, participant } from '@/core/settings/options';
import { useTitle } from '@/core/context/TitleContext';

import * as S from './header.styles';

import bell from "@/assets/icons/common/ic-bell.svg";
import search from "@/assets/icons/common/ic-search.svg";
import conversation from "@/assets/icons/common/ic-conversation.svg";
import addContact from "@/assets/icons/common/ic-add-contact.svg";
import team from "@/assets/icons/common/ic-team.svg";
import arrDown from '@/assets/icons/common/ic-arrow-down.svg'
import closeCircle from '@/assets/icons/common/ic-close-circle.svg'
import closeModal from '@/assets/icons/common/ic-close-modal.svg'
import addCircle from '@/assets/icons/common/ic-add-plus.svg'
import addHeader from '@/assets/icons/common/ic-add-header.svg'

const Header: React.FC = () => {
  const { t } = useTranslation("main");
  const { title } = useTitle();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectDropdownOpen, setSelectDropdownOpen] = useState(false);
  const [tags, setTags] = useState(participant);

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const clearAll = () => {
    setTags([]);
  };

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
        <S.Title>{title || t('header.title')}</S.Title>
        <S.Description>{t('header.description')}</S.Description>
      </S.LeftSection>

      <S.RightSection ref={dropdownRef}>
        <Image src={search} preview={false} />
        <Image src={bell} preview={false} />

        <Button type="primary" width="122px" icon={<Image src={addHeader} preview={false} />}
          iconPosition="left" onClick={toggleDropdown}>
          Add new
        </Button>

        {dropdownOpen && (
          <S.DropdownMenu>
            <S.DropdownItem onClick={() => {
              setIsModalOpen(true);
              setDropdownOpen(false);
            }}>
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

        <CreateConversationModal
          isOpen={isModalOpen}
          title="Create A New Conversation"
          description="Please insert modal description here."
          onClose={() => setIsModalOpen(false)}
          footer={
            <button
              style={{
                backgroundColor: "#1E266D",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              <Image src={addCircle} preview={false} style={{ position: 'relative', top: "-2px" }} />
              Create Conversation
            </button>
          }
        >
          <S.FormWrapper>
            <S.FormGap>
              <S.Label>
                Type of conversation <span>*</span>
              </S.Label>

              <S.DropdownRow>
                <S.DropdownHeader onClick={() => setSelectDropdownOpen(!selectDropdownOpen)}>
                  <span>
                    {selected || "Choose type of conversation"}
                  </span>

                  <S.ArrowIcon isOpen={selectDropdownOpen}>
                    <Image src={arrDown} preview={false} />
                  </S.ArrowIcon>
                </S.DropdownHeader>

                {selectDropdownOpen && (
                  <S.DropdownList>
                    {conversationOptions.map((option, idx) => (
                      <S.DropdownItem key={idx} onClick={() => {
                        setSelected(option);
                        setSelectDropdownOpen(false);
                      }}>
                        {option}
                      </S.DropdownItem>
                    ))}
                  </S.DropdownList>
                )}
              </S.DropdownRow>
            </S.FormGap>

            <S.FormGap>
              <S.Label>
                Email of the user <span>*</span>
              </S.Label>
              <S.Input type="email" placeholder="Enter the email of the user" />
            </S.FormGap>

            <S.FormGap>
              <S.Label>
                Name of the user <span>*</span>
              </S.Label>
              <S.Input type="text" placeholder="Enter the full name of the user" />
            </S.FormGap>

            <S.FormGap>
              <S.Label>A participant</S.Label>
              <S.TagsWrapper>
                {tags.map((tag, index) => (
                  <S.Tag key={index}>
                    {tag}
                    <S.RemoveTagButton onClick={() => removeTag(index)}>
                      <S.RemoveImage>
                        <Image src={closeModal} preview={false} />
                      </S.RemoveImage>
                    </S.RemoveTagButton>
                  </S.Tag>
                ))}
                {tags.length > 0 && (
                  <S.ClearAllButton onClick={clearAll}>
                    <Image src={closeCircle} preview={false} />
                  </S.ClearAllButton>
                )}
              </S.TagsWrapper>
            </S.FormGap>

            <S.FormGap>
              <S.Label>Subject of the email (if any)</S.Label>
              <S.Input type="text" placeholder="Enter the subject of the email" />
            </S.FormGap>
          </S.FormWrapper>
        </CreateConversationModal>
      </S.RightSection>
    </S.Header>
  );
};

export default Header;
