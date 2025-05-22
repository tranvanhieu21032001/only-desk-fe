import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchQuery } from 'relay-runtime';
import { useSelector } from 'react-redux';

import AvatarWithStatus from '@/shared/components/common/Avatar';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';

import relayEnvironment from '@/relay/RelayEnvironment';
import { conversationListQuery } from '@/relay/ConversationListQuery';
import { ConversationListQuery } from '@/relay/__generated__/ConversationListQuery.graphql';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import { getFormattedTime } from '../../helpers/inbox.logic';

import { filterOptions, filtersDropdown } from '@/core/settings/options';

import * as S from './InboxList.styles';

import search from '@/assets/icons/common/ic-search.svg';
import filter from '@/assets/icons/common/ic-filter.svg';
import filterBlue from '@/assets/icons/inbox/ic-filter-blue.svg';
import arrowDown from '@/assets/icons/common/ic-arrow-down.svg';
import barColumn from '@/assets/icons/common/ic-bar-column.svg';
import check from '@/assets/icons/common/ic-check-black.svg';
import unreadIcon from '@/assets/icons/common/ic-unread.svg';
import copyIcon from '@/assets/icons/common/ic-copy-link.svg';
import blockIcon from '@/assets/icons/common/ic-user-block.svg';
import deleteIcon from '@/assets/icons/common/ic-delete-red.svg';
import flag from '@/assets/icons/common/ic-flag.svg';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import message from '@/assets/icons/inbox/ic-message.svg';
import close from '@/assets/icons/inbox/ic-close-circle.svg';
import add from '@/assets/icons/inbox/ic-add-circle.svg';
import addPlus from '@/assets/icons/inbox/ic-add.svg';
import closePlus from '@/assets/icons/inbox/ic-close.svg';
import avatarDefault from '@/assets/images/avatar-default.png';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';

const NotificationList = () => {
  const { t } = useTranslation('inbox');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const customFilterRef = useRef<HTMLDivElement>(null);
  const [selectedModalFilter, setSelectedModalFilter] = useState<string | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDropdownOpen, setIsModalDropdownOpen] = useState(false);
  const [isCustomFilterModalOpen, setIsCustomFilterModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [filterSearchTerm, setFilterSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isMainFilterDropdownOpen, setIsMainFilterDropdownOpen] =
    useState(false);
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null,
  );
  const [conditionSearchTerm, setConditionSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('Beauty');
  const [conditionValues, setConditionValues] = useState<string[]>([]);
  const [isCustomFilterDropdownOpen, setIsCustomFilterDropdownOpen] =
    useState(false);
  const [conversationEdges, setConversationEdges] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const conversationListWrapperRef = useRef<HTMLDivElement>(null);
  const [lastCursor, setLastCursor] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  const workspaceId = useSelector(selectCurrentWorkspaceId);

  // Fetch initial conversation list
  useEffect(() => {
    const fetchInitial = async () => {
      setLoadingMore(true);
      const res = (await fetchQuery(relayEnvironment, conversationListQuery, {
        workspaceId: workspaceId || '',
        args: { first: 10 },
      }).toPromise()) as ConversationListQuery['response'];
      const edges = res?.conversations?.edges || [];
      setConversationEdges([...edges]);
      setLastCursor(edges.length > 0 ? edges[edges.length - 1].cursor : null);
      setHasMore(edges.length === 10);
      setLoadingMore(false);
    };
    fetchInitial();
  }, [workspaceId]);

  // Load more conversations
  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const res = (await fetchQuery(relayEnvironment, conversationListQuery, {
      workspaceId: workspaceId || '',
      args: { first: 10, after: lastCursor },
    }).toPromise()) as ConversationListQuery['response'];
    const edges = res?.conversations?.edges || [];
    setConversationEdges((prev) => [...prev, ...edges]);
    setLastCursor(
      edges.length > 0 ? edges[edges.length - 1].cursor : lastCursor,
    );
    setHasMore(edges.length === 10);
    setLoadingMore(false);
  };

  // Listen for scroll event
  useEffect(() => {
    const wrapper = conversationListWrapperRef.current;
    if (!wrapper) return;
    const handleScroll = () => {
      if (
        wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 50 &&
        hasMore &&
        !loadingMore
      ) {
        loadMore();
      }
    };
    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, lastCursor]);

  const resetFilterStates = () => {
    setSelectedModalFilter(null);
    setFilterSearchTerm('');
    setSelectedFilters([]);
    setIsMainFilterDropdownOpen(false);
    setIsConditionDropdownOpen(false);
    setSelectedCondition(null);
    setInputValue('');
    setConditionValues([]);
    setIsFilterDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setActiveMenu(null);
      }

      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsAllDropdownOpen(false);
      }

      if (
        customFilterRef.current &&
        !customFilterRef.current.contains(target)
      ) {
        setIsCustomFilterDropdownOpen(false);
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

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleConversationClick = (conversationId: string) => {
    navigate(`?workspaceId=${workspaceId}&conversationId=${conversationId}`);
  };

  return (
    <S.Container>
      <S.SearchFilterWrapper>
        <S.SearchInputWrapper>
          <S.SearchIcon>
            <Image src={search} alt="Search icon" preview={false} />
          </S.SearchIcon>
          <S.SearchInput placeholder={t('inboxList.search')} />
        </S.SearchInputWrapper>

        <S.FilterRef ref={customFilterRef}>
          <S.Button
            active={isCustomFilterDropdownOpen}
            onClick={() => {
              setIsCustomFilterDropdownOpen((prev) => !prev);
              setIsAllDropdownOpen(false);
            }}
          >
            <Image
              src={isCustomFilterDropdownOpen ? filterBlue : filter}
              alt="Filter icon"
              preview={false}
            />{' '}
            {t('inboxList.filter')}
          </S.Button>

          {isCustomFilterDropdownOpen && (
            <S.FilterDropdownBox>
              <S.FilterRadioLabel selected={selectedOption === 'Beauty'}>
                <input
                  type="radio"
                  name="filter"
                  checked={selectedOption === 'Beauty'}
                  onChange={() => handleChange('Beauty')}
                />
                <span>Beauty</span>
              </S.FilterRadioLabel>

              <S.FilterRadioLabel selected={selectedOption === 'Milk'}>
                <input
                  type="radio"
                  name="filter"
                  checked={selectedOption === 'Milk'}
                  onChange={() => handleChange('Milk')}
                />
                <span>Milk</span>
              </S.FilterRadioLabel>
              <S.NewLine />
              <Button
                iconPosition="left"
                icon={
                  <Image
                    src={close}
                    preview={false}
                    style={{ width: 20, height: 20 }}
                  />
                }
                onClick={() => setSelectedOption('')}
              >
                {t('inboxList.cancelCurrentFilter')}
              </Button>
              <S.DistanceBox />
              <Button
                type="primary"
                iconPosition="left"
                icon={
                  <Image
                    src={addPlus}
                    preview={false}
                    style={{ width: 20, height: 20 }}
                  />
                }
                onClick={() => {
                  setIsModalOpen(true);
                  setIsCustomFilterDropdownOpen(false);
                }}
              >
                {t('inboxList.newCustomFilter')}
              </Button>
            </S.FilterDropdownBox>
          )}
        </S.FilterRef>

        <S.FilterWrapper ref={filterRef}>
          <S.ButtonDropdown
            onClick={() => {
              setIsAllDropdownOpen((prev) => !prev);
              setIsCustomFilterDropdownOpen(false);
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

      <S.ConversationListWrapper ref={conversationListWrapperRef}>
        {conversationEdges.length === 0 && !loadingMore && (
          <S.AllDataLoaded>{t('inboxList.noConversationYet')}</S.AllDataLoaded>
        )}
        {conversationEdges
          .slice()
          .reverse()
          .map((edge, index) => {
            const c = edge.node;
            return (
              <S.NotificationItem
                key={c.id}
                active={c.id === activeConversationId}
                onClick={() => handleConversationClick(c.id)}
              >
                <S.Avatar>
                  <AvatarWithStatus
                    avatarSrc={c.contact?.avatar || avatarDefault}
                    isOnline={c.contact?.isOnline || false}
                    flagSrc={flag}
                  />
                </S.Avatar>
                <S.Content>
                  <S.Title>{c.contact?.name || DEFAULT_FULL_NAME}</S.Title>
                  <S.Subtitle>
                    {c.latestMessage?.content || <p>No message</p>}
                  </S.Subtitle>
                </S.Content>
                <S.RightSection ref={menuRef}>
                  <S.Time className="time">
                    {getFormattedTime(c.lastActivityAt)}
                  </S.Time>
                  <S.BarIcon onClick={(e) => handleMenuClick(index, e)}>
                    <Image src={barColumn} preview={false} />
                  </S.BarIcon>
                  {c.unreadGuestCount ? (
                    <S.Badge>{c.unreadGuestCount}</S.Badge>
                  ) : (
                    <></>
                  )}
                  {activeMenu === index && (
                    <S.MenuDropdown isOpen={true}>
                      <S.MenuItem
                        onClick={(e) => handleMenuItemClick('resolve', e)}
                      >
                        <Image src={check} preview={false} />
                        Mark as resolved
                      </S.MenuItem>
                      <S.MenuItem
                        onClick={(e) => handleMenuItemClick('unread', e)}
                      >
                        <Image src={unreadIcon} preview={false} />
                        Mark as unread
                      </S.MenuItem>
                      <S.MenuItem
                        onClick={(e) => handleMenuItemClick('copy', e)}
                      >
                        <Image src={copyIcon} preview={false} />
                        Copy link
                      </S.MenuItem>
                      <S.MenuItem
                        onClick={(e) => handleMenuItemClick('block', e)}
                      >
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
            );
          })}
        {loadingMore && (
          <S.LoadingMore>{t('inboxList.loadMore')}</S.LoadingMore>
        )}
        {!hasMore && conversationEdges.length > 0 && (
          <S.AllDataLoaded>All data loaded</S.AllDataLoaded>
        )}
      </S.ConversationListWrapper>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsModalDropdownOpen(false);
          resetFilterStates();
        }}
        title={t('inboxList.advancedFilter')}
        description={t('newSubInbox.description')}
        footer={
          <S.ModalFooter>
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpen(false);
                setIsCustomFilterModalOpen(true);
                resetFilterStates();
              }}
            >
              {t('inboxList.saveCustomFilter')}
            </Button>
          </S.ModalFooter>
        }
      >
        <S.ModalContent>
          <S.ModalLabel>
            {t('inboxList.labelForCustomFilter')}{' '}
            <span style={{ color: 'red' }}>*</span>
          </S.ModalLabel>

          <S.ModalFilterWrapper>
            {/* dropdown 1 */}
            <S.LabelDropdownWrapper>
              <S.ButtonModalDropdown
                onClick={() => setIsModalDropdownOpen((prev) => !prev)}
              >
                {selectedModalFilter ||
                  t('inboxList.enterLabelForCustomFilter')}{' '}
                <Image src={arrowDown} alt="Arrow down icon" preview={false} />
              </S.ButtonModalDropdown>

              {isModalDropdownOpen && (
                <S.ModalDropdown>
                  {filterOptions.map((option) => (
                    <S.DropdownItem
                      key={option}
                      onClick={() => {
                        setIsModalDropdownOpen(false);
                        setSelectedModalFilter(option);
                      }}
                    >
                      {option}
                    </S.DropdownItem>
                  ))}
                </S.ModalDropdown>
              )}
            </S.LabelDropdownWrapper>
          </S.ModalFilterWrapper>
        </S.ModalContent>
      </Modal>

      <Modal
        isOpen={isCustomFilterModalOpen}
        onClose={() => {
          setIsCustomFilterModalOpen(false);
          resetFilterStates();
        }}
        title={t('inboxList.advancedFilter')}
        description={t('newSubInbox.description')}
        footer={
          <S.ModalFooter>
            <Button
              type={selectedCondition ? 'primary' : undefined}
              disabled={!selectedCondition}
            >
              {t('inboxList.done')}
            </Button>
          </S.ModalFooter>
        }
      >
        <S.ModalContentFilter>
          <S.FilterBox isOpen={isFilterDropdownOpen}>
            {!isFilterDropdownOpen && (
              <Button
                type="primary"
                width="160px"
                icon={<Image src={addHeader} preview={false} />}
                iconPosition="left"
                onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
              >
                {t('inboxList.newFilter')}
              </Button>
            )}

            {isFilterDropdownOpen && (
              <S.FilterDropdown>
                <S.ModalFilterWrapper>
                  {/* Dropdown 2 */}
                  {!selectedModalFilter && (
                    <S.MainFilterDropdownWrapper>
                      <S.ButtonModalDropdown
                        onClick={() =>
                          setIsMainFilterDropdownOpen((prev) => !prev)
                        }
                      >
                        {selectedModalFilter ||
                          t('inboxList.enterLabelForCustomFilter')}{' '}
                        <Image
                          src={arrowDown}
                          alt="Arrow down icon"
                          preview={false}
                        />
                      </S.ButtonModalDropdown>
                      {isMainFilterDropdownOpen && (
                        <S.ModalDropdownBorder>
                          <S.SearchWrapper>
                            <S.SearchIconDropdown>
                              <Image
                                src={search}
                                alt="Arrow down icon"
                                preview={false}
                                style={{
                                  width: '16px',
                                  position: 'relative',
                                  top: '-2px',
                                }}
                              />
                            </S.SearchIconDropdown>
                            <S.SearchInputDropdown
                              placeholder={t('inboxList.filter')}
                              value={filterSearchTerm}
                              onChange={(e) =>
                                setFilterSearchTerm(e.target.value)
                              }
                            />
                          </S.SearchWrapper>
                          {filtersDropdown
                            .filter((opt) =>
                              opt
                                .toLowerCase()
                                .includes(filterSearchTerm.toLowerCase()),
                            )
                            .map((option) => (
                              <S.DropdownBorder
                                key={option}
                                onClick={() => {
                                  setIsMainFilterDropdownOpen(false);
                                  setSelectedModalFilter(option);
                                  setSelectedFilters((prev) => [
                                    ...prev,
                                    option,
                                  ]);
                                  setFilterSearchTerm('');
                                }}
                              >
                                <Image src={message} preview={false} />
                                {option}
                              </S.DropdownBorder>
                            ))}
                        </S.ModalDropdownBorder>
                      )}
                    </S.MainFilterDropdownWrapper>
                  )}

                  {selectedFilters.map((filterLabel, index) => (
                    <S.NestedFilterBox key={index}>
                      <S.ModalWrapper>
                        <span>
                          <Image src={message} preview={false} />
                          {filterLabel}
                        </span>
                        <S.FilterLabelClearWrapper
                          onClick={() => {
                            setSelectedModalFilter(null);
                            setSelectedFilters([]);
                            setSelectedCondition(null);
                            setInputValue('');
                            setConditionValues([]);
                            setIsMainFilterDropdownOpen(true);
                          }}
                        >
                          <Image
                            src={closePlus}
                            alt="Clear filter"
                            preview={false}
                            style={{ width: 16, height: 16 }}
                          />
                        </S.FilterLabelClearWrapper>
                      </S.ModalWrapper>
                      <S.ModalFilterWrapper>
                        <S.ConditionDropdownWrapper>
                          <S.ButtonModalDropdown
                            onClick={() =>
                              setIsConditionDropdownOpen((prev) => !prev)
                            }
                          >
                            {selectedCondition || 'Select filter condition'}{' '}
                            <Image
                              src={arrowDown}
                              alt="Arrow down icon"
                              preview={false}
                            />
                          </S.ButtonModalDropdown>

                          {isConditionDropdownOpen && (
                            <S.ModalDropdownBox>
                              <S.ConditionSearchBox>
                                <S.ConditionSearchWrapper>
                                  <S.ConditionSearchIcon>
                                    <Image
                                      src={search}
                                      alt="Search icon"
                                      preview={false}
                                      style={{ width: '16px' }}
                                    />
                                  </S.ConditionSearchIcon>
                                  <S.ConditionSearchInput
                                    placeholder="Search..."
                                    value={conditionSearchTerm}
                                    onChange={(e) =>
                                      setConditionSearchTerm(e.target.value)
                                    }
                                  />
                                </S.ConditionSearchWrapper>
                              </S.ConditionSearchBox>

                              {['Equals to', 'Differs to']
                                .filter((condition) =>
                                  condition
                                    .toLowerCase()
                                    .includes(
                                      conditionSearchTerm.toLowerCase(),
                                    ),
                                )
                                .map((condition) => (
                                  <S.DropdownItem
                                    key={condition}
                                    onClick={() => {
                                      setSelectedCondition(condition);
                                      setIsConditionDropdownOpen(false);
                                      setConditionSearchTerm('');
                                    }}
                                  >
                                    {condition}
                                  </S.DropdownItem>
                                ))}
                            </S.ModalDropdownBox>
                          )}
                        </S.ConditionDropdownWrapper>

                        <S.ModalFilterWrapper>
                          {conditionValues.map((val, idx) => (
                            <S.InputWrapperAdd key={idx}>
                              <span>{val}</span>
                              <S.CloseIconWrapper>
                                <S.CloseIconImg
                                  src={close}
                                  alt="Clear value"
                                  onClick={() => {
                                    setConditionValues((prev) =>
                                      prev.filter((_, index) => index !== idx),
                                    );
                                  }}
                                />
                              </S.CloseIconWrapper>
                            </S.InputWrapperAdd>
                          ))}
                        </S.ModalFilterWrapper>

                        {selectedCondition && (
                          <S.InputWrapperAdd>
                            <S.ModalInputCustom
                              placeholder={t('inboxList.enterAValue')}
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                            />
                            {inputValue && (
                              <S.CloseIconWrapper
                                onClick={() => setInputValue('')}
                              >
                                <S.CloseIconImg src={close} alt="Clear input" />
                              </S.CloseIconWrapper>
                            )}
                          </S.InputWrapperAdd>
                        )}
                      </S.ModalFilterWrapper>
                    </S.NestedFilterBox>
                  ))}
                </S.ModalFilterWrapper>

                {selectedCondition && (
                  <S.AddConditionWrapper>
                    <Button
                      icon={
                        <Image
                          src={add}
                          preview={false}
                          style={{ width: 20, height: 20 }}
                        />
                      }
                      width="229px"
                      onClick={() => {
                        if (inputValue.trim()) {
                          setConditionValues((prev) => [
                            ...prev,
                            inputValue.trim(),
                          ]);
                          setInputValue('');
                        }
                      }}
                    >
                      {t('inboxList.addAnotherConditions')}
                    </Button>
                  </S.AddConditionWrapper>
                )}
              </S.FilterDropdown>
            )}
          </S.FilterBox>
        </S.ModalContentFilter>
      </Modal>
    </S.Container>
  );
};

export default NotificationList;
