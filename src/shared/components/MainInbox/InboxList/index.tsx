import { Image } from 'antd';
import { useState, useEffect, useRef } from 'react';

import AvatarWithStatus from '../../common/Avatar';

import { notifications } from '@/core/settings/options';

import * as S from './inbox-list.styles'

import search from "@/assets/icons/common/ic-search.svg";
import filter from "@/assets/icons/common/ic-filter.svg";
import arrowDown from "@/assets/icons/common/ic-arrow-down.svg";
import barColumn from "@/assets/icons/common/ic-bar-column.svg";
import check from '@/assets/icons/common/ic-check-black.svg';
import unreadIcon from '@/assets/icons/common/ic-unread.svg';
import copyIcon from '@/assets/icons/common/ic-copy-link.svg';
import blockIcon from '@/assets/icons/common/ic-user-block.svg';
import deleteIcon from '@/assets/icons/common/ic-delete-red.svg';
import flag from '@/assets/icons/common/ic-flag.svg'

const NotificationList = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleMenuItemClick = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(null);
  };

  return (
    <S.Container>
      <S.SearchFilterWrapper>
        <S.SearchInputWrapper>
          <Image src={search} alt="Search icon" preview={false} />
          <S.SearchInput placeholder="Search..." />
        </S.SearchInputWrapper>
        <S.Button><Image src={filter} alt="Filter icon" preview={false} /> Filter</S.Button>
        <S.Button><Image src={arrowDown} alt="Arrow down icon" preview={false} /> All</S.Button>
      </S.SearchFilterWrapper>

      {notifications.map((n, index) => (
        <S.NotificationItem key={n.id}>
          <S.Avatar>
            <AvatarWithStatus
              avatarSrc={n.avatar}
              flagSrc={flag}
              isOnline={true}
            />
          </S.Avatar>
          <S.Content>
            <S.Title>{n.title}</S.Title>
            <S.Subtitle>{n.subtitle}</S.Subtitle>
          </S.Content>
          <S.RightSection ref={menuRef}>
            <S.Time className="time">{n.time}</S.Time>
            <S.BarIcon onClick={(e) => handleMenuClick(index, e)}>
              <Image src={barColumn} preview={false} />
            </S.BarIcon>
            {n.badge && <S.Badge>{n.badge}</S.Badge>}
            {activeMenu === index && (
              <S.MenuDropdown isOpen={true}>
                <S.MenuItem onClick={(e) => handleMenuItemClick('resolve', e)}>
                  <Image src={check} preview={false} />
                  Mark as resolved
                </S.MenuItem>
                <S.MenuItem onClick={(e) => handleMenuItemClick('unread', e)}>
                  <Image src={unreadIcon} preview={false} />
                  Mark as unread
                </S.MenuItem>
                <S.MenuItem onClick={(e) => handleMenuItemClick('copy', e)}>
                  <Image src={copyIcon} preview={false} />
                  Copy link
                </S.MenuItem>
                <S.MenuItem onClick={(e) => handleMenuItemClick('block', e)}>
                  <Image src={blockIcon} preview={false} />
                  Block Admin 3
                </S.MenuItem>
                <S.MenuItem
                  className="delete"
                  onClick={(e) => handleMenuItemClick('delete', e)}
                >
                  <Image src={deleteIcon} preview={false} />
                  Delete conversation
                </S.MenuItem>
              </S.MenuDropdown>
            )}
          </S.RightSection>
        </S.NotificationItem>
      ))}
    </S.Container>
  );
};

export default NotificationList;
