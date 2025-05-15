import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import Search from '../search/Main';
import Button from '../../Button';
import AvatarWithStatus from '../../Avatar';
import CreateConversationModal from '../../Modal';

import {
  conversationOptions,
  notificationOptions,
  participant,
} from '@/core/settings/options';
import { useTitle } from '@/core/context/TitleContext';

import * as S from './header.styles';

import bell from '@/assets/icons/common/ic-bell.svg';
import search from '@/assets/icons/common/ic-search.svg';
import conversation from '@/assets/icons/common/ic-conversation.svg';
import addContact from '@/assets/icons/common/ic-add-contact.svg';
import team from '@/assets/icons/common/ic-team.svg';
import arrDown from '@/assets/icons/common/ic-arrow-down.svg';
import closeCircle from '@/assets/icons/common/ic-close-circle.svg';
import closeModal from '@/assets/icons/common/ic-close-modal.svg';
import addCircle from '@/assets/icons/common/ic-add-white.svg';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import bellBlue from '@/assets/icons/common/ic-notification-blue.svg';
import flag from '@/assets/icons/common/ic-flag.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';

const Header: React.FC = () => {
  const { t } = useTranslation('inbox');
  const { title } = useTitle();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [selectDropdownOpen, setSelectDropdownOpen] = useState(false);
  const [tags, setTags] = useState(participant);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationOptions);

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const clearAll = () => {
    setTags([]);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.Header>
      <S.LeftSection>
        <S.Title>{title || t('header.title')}</S.Title>
        <S.Description>{t('header.description')}</S.Description>
      </S.LeftSection>

      <S.RightSection ref={dropdownRef}>
        <S.SearchPopover
          trigger="click"
          content={<Search />}
          rootClassName="search-header"
        >
          <Image src={search} preview={false} />
        </S.SearchPopover>
        <div style={{ position: 'relative' }} ref={notificationRef}>
          <Image
            src={notificationOpen ? bellBlue : bell}
            preview={false}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setNotificationOpen((prev) => !prev);
              setDropdownOpen(false);
            }}
          />
          {notificationOpen && (
            <S.NotificationDropdown>
              <S.NotificationTitle>Notifications</S.NotificationTitle>
              <S.NotificationList>
                {notifications.map((item) => (
                  <S.NotificationItem
                    key={item.id}
                    read={item.read}
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((n) =>
                          n.id === item.id ? { ...n, read: true } : n,
                        ),
                      )
                    }
                  >
                    <AvatarWithStatus
                      avatarSrc={defaultAvatar}
                      flagSrc={flag}
                      isOnline={true}
                    />
                    <S.NotificationInfoWrapper>
                      <S.NotificationContent>
                        <S.NotificationTitleText>
                          {item.title}
                        </S.NotificationTitleText>
                      </S.NotificationContent>
                      <S.NotificationMessageRow>
                        <S.NotificationMessage>
                          {item.content}
                        </S.NotificationMessage>
                        <S.NotificationTime>{item.time}</S.NotificationTime>
                      </S.NotificationMessageRow>
                    </S.NotificationInfoWrapper>
                  </S.NotificationItem>
                ))}
              </S.NotificationList>
            </S.NotificationDropdown>
          )}
        </div>
        <Button
          type="primary"
          width="122px"
          icon={<Image src={addHeader} preview={false} />}
          iconPosition="left"
          onClick={() => {
            toggleDropdown();
            setNotificationOpen(false);
          }}
        >
          Add new
        </Button>

        {dropdownOpen && (
          <S.DropdownMenu>
            <S.DropdownItem
              onClick={() => {
                setIsModalOpen(true);
                setDropdownOpen(false);
              }}
            >
              <Image src={conversation} alt="conversation" preview={false} />
              {t('header.createConversation')}
            </S.DropdownItem>
            <S.DropdownItem>
              <Image src={addContact} alt="contact" preview={false} />
              {t('header.addNewContact')}
            </S.DropdownItem>
            <S.DropdownItem>
              <Image src={team} alt="team" preview={false} />
              {t('header.inviteTeamMembers')}
            </S.DropdownItem>
          </S.DropdownMenu>
        )}

        <CreateConversationModal
          isOpen={isModalOpen}
          title="Create A New Conversation"
          description="Please insert modal description here."
          onClose={() => setIsModalOpen(false)}
          footer={
            <Button
              type="primary"
              width="207px"
              icon={<Image src={addCircle} preview={false} />}
              iconPosition="left"
            >
              Create Conversation
            </Button>
          }
        >
          <S.FormWrapper>
            <S.FormGap>
              <S.Label>
                Type of conversation <span>*</span>
              </S.Label>

              <S.DropdownRow>
                <S.DropdownHeader
                  onClick={() => setSelectDropdownOpen(!selectDropdownOpen)}
                >
                  <span>{selected || 'Choose type of conversation'}</span>

                  <S.ArrowIcon isOpen={selectDropdownOpen}>
                    <Image src={arrDown} preview={false} />
                  </S.ArrowIcon>
                </S.DropdownHeader>

                {selectDropdownOpen && (
                  <S.DropdownList>
                    {conversationOptions.map((option, idx) => (
                      <S.DropdownItem
                        key={idx}
                        onClick={() => {
                          setSelected(option);
                          setSelectDropdownOpen(false);
                        }}
                      >
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
              <S.Input
                type="text"
                placeholder="Enter the full name of the user"
              />
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
              <S.Input
                type="text"
                placeholder="Enter the subject of the email"
              />
            </S.FormGap>
          </S.FormWrapper>
        </CreateConversationModal>
      </S.RightSection>
    </S.Header>
  );
};

export default Header;
