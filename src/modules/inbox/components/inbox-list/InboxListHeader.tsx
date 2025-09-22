import { Image } from 'antd';
import * as S from './InboxList.styles';
import { useEffect, useRef, useState, useMemo } from 'react';
import search from '@/assets/icons/common/ic-search.svg';
import arrowDown from '@/assets/icons/common/ic-arrow-down.svg';
import { filterOptions } from '@/core/settings/options';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

type InboxListHeaderProps = {
  onSearchChange: (keyword: string) => void;
  onFilterChange: (filter: string) => void;
  selectedFilter: string;
  searchValue: string; // bind value từ parent
};

const InboxListHeader: React.FC<InboxListHeaderProps> = ({
  onSearchChange,
  onFilterChange,
  selectedFilter,
  searchValue,
}) => {
  const { t } = useTranslation('inbox');
  const filterRef = useRef<HTMLDivElement>(null);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);

  // state local để input gõ thoải mái
  const [localKeyword, setLocalKeyword] = useState(searchValue || '');

  // debounce search input
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearchChange(value);
      }, 600),
    [onSearchChange]
  );

  // khi searchValue thay đổi từ parent (reload URL), cập nhật localKeyword
  useEffect(() => {
    setLocalKeyword(searchValue);
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalKeyword(value); // cập nhật ngay input
    debouncedSearch(value); // debounce gửi lên parent
  };

  const handleSelectFilter = (filter: string) => {
    onFilterChange(filter);
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

  // cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <S.SearchFilterWrapper>
      <S.SearchInputWrapper>
        <S.SearchIcon>
          <Image src={search} alt="Search icon" preview={false} />
        </S.SearchIcon>
        <S.SearchInput
          placeholder={t('inboxList.search')}
          onChange={handleInputChange}
          value={localKeyword} // bind với state local
        />
      </S.SearchInputWrapper>

      <S.FilterWrapper ref={filterRef}>
        <S.ButtonDropdown
          onClick={() => setIsAllDropdownOpen((prev) => !prev)}
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
