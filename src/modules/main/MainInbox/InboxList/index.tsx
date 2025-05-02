import { Image } from 'antd';
import { useState, useEffect, useRef } from 'react';

import { filterOptions, notifications } from '@/core/settings/options';

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
import AvatarWithStatus from '@/shared/components/common/Avatar';

const NotificationList = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setActiveMenu(null);
      }

      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsAllDropdownOpen(false);
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

  const handleMenuItemClick = (_action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(null);
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsAllDropdownOpen(false);
  };

  return (
    <S.Container>
      <S.SearchFilterWrapper>
        <S.SearchInputWrapper>
          <S.SearchIcon>
            <Image src={search} alt="Search icon" preview={false} />
          </S.SearchIcon>
          <S.SearchInput placeholder="Search..." />
        </S.SearchInputWrapper>

        <S.Button>
          <Image src={filter} alt="Filter icon" preview={false} /> Filter
        </S.Button>

        <S.FilterWrapper ref={filterRef}>
          <S.ButtonDropdown onClick={() => setIsAllDropdownOpen((prev) => !prev)}>
            <Image src={arrowDown} alt="Arrow down icon" preview={false} /> {selectedFilter}
          </S.ButtonDropdown>

          {isAllDropdownOpen && (
            <S.AllDropdown>
              {filterOptions.map((option) => (
                <S.DropdownItem key={option} onClick={() => handleSelectFilter(option)}>
                  {option}
                </S.DropdownItem>
              ))}
            </S.AllDropdown>
          )}
        </S.FilterWrapper>
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
