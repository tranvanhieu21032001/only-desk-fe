import { Image } from 'antd';
import * as S from './InboxList.styles';
import { useEffect, useRef, useState } from 'react';
import search from '@/assets/icons/common/ic-search.svg';
import arrowDown from '@/assets/icons/common/ic-arrow-down.svg';
import { filterOptions } from '@/core/settings/options';
import { useTranslation } from 'react-i18next';

const InboxListHeader = () => {
  const { t } = useTranslation('inbox');
  const filterRef = useRef<HTMLDivElement>(null);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsAllDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsAllDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.SearchFilterWrapper>
      <S.SearchInputWrapper>
        <S.SearchIcon>
          <Image src={search} alt="Search icon" preview={false} />
        </S.SearchIcon>
        <S.SearchInput placeholder={t('inboxList.search')} />
      </S.SearchInputWrapper>

      <S.FilterWrapper ref={filterRef}>
        <S.ButtonDropdown
          onClick={() => {
            setIsAllDropdownOpen((prev) => !prev);
          }}
        >
          <Image src={arrowDown} alt="Arrow down icon" preview={false} />{' '}
          {selectedFilter}
        </S.ButtonDropdown>

        {isAllDropdownOpen && (
          <S.AllDropdown>
            {filterOptions.map((option) => (
              <S.DropdownItem
                key={option}
                onClick={() => handleSelectFilter(option)}
              >
                {option}
              </S.DropdownItem>
            ))}
          </S.AllDropdown>
        )}
      </S.FilterWrapper>
    </S.SearchFilterWrapper>
  );
};

export default InboxListHeader;
