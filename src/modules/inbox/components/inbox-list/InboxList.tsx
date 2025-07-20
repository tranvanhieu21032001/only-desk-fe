import { Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { usePaginationFragment } from 'react-relay';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getFormattedTime } from '@/shared/utils/time';
import { decodeGlobalId } from '@/shared/utils/decode';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { conversationListFragment } from '@/relay/ConversationListFragment';
import type { ConversationListFragment_query$key } from '@/relay/__generated__/ConversationListFragment_query.graphql';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import { eventBus } from '@/core/event-bus';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';
import { EVENTBUS_WORKSPACE_CHANGED } from '@/core/settings/constants';
import { filterOptions, filtersDropdown } from '@/core/settings/options';
import { selectCurrentWorkspaceId } from '@/modules/auth/store/selectors';
import {
  fetchConversations,
  setSelectedConversation,
  updateConversationUnreadCount,
} from '../../store/features/inbox';
import { openConversation } from '@/core/services/socket/socket';
import { deleteConversation } from '../../api/inbox.api';

import { Conversation } from '../../interfaces/inbox';

import * as S from './InboxList.styles';

import search from '@/assets/icons/common/ic-search.svg';
import filter from '@/assets/icons/common/ic-filter.svg';
import filterBlue from '@/assets/icons/inbox/ic-filter-blue.svg';
import arrowDown from '@/assets/icons/common/ic-arrow-down.svg';
import barColumn from '@/assets/icons/common/ic-bar-column.svg';
import check from '@/assets/icons/common/ic-check-black.svg';
import unreadIcon from '@/assets/icons/common/ic-unread.svg';
// import copyIcon from '@/assets/icons/common/ic-copy-link.svg';
// import blockIcon from '@/assets/icons/common/ic-user-block.svg';
import deleteIcon from '@/assets/icons/common/ic-delete-red.svg';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import message from '@/assets/icons/inbox/ic-message.svg';
import close from '@/assets/icons/inbox/ic-close-circle.svg';
import add from '@/assets/icons/inbox/ic-add-circle.svg';
import addPlus from '@/assets/icons/inbox/ic-add.svg';
import closePlus from '@/assets/icons/inbox/ic-close.svg';
import avatarDefault from '@/assets/images/avatar-default.png';
import ProfileCard from '@/shared/components/common/ProfileCard';

type Props = {
  conversationsRef: ConversationListFragment_query$key;
  onSelectConversation?: (conversation: any) => void;
};

const ConversationList: React.FC<Props> = ({
  conversationsRef,
  onSelectConversation,
}) => {
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
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  const conversationListWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeConversationId = searchParams.get('conversationId');

  // Relay pagination
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    conversationListFragment,
    conversationsRef,
  );

  useEffect(() => {
    if (onSelectConversation && activeConversationId) {
      const conversation = data.conversations.edges.find(
        (edge) => edge.node.id === activeConversationId,
      )?.node;
      if (conversation) {
        onSelectConversation(conversation);
      }
    }
  }, [activeConversationId, onSelectConversation, data.conversations.edges]);

  // Scroll event for load more
  useEffect(() => {
    const wrapper = conversationListWrapperRef.current;
    if (!wrapper) return;
    const handleScroll = () => {
      if (
        wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 50 &&
        hasNext &&
        !isLoadingNext
      ) {
        loadNext(10);
      }
    };
    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [hasNext, isLoadingNext, loadNext]);  

  const workspaceId = useSelector(selectCurrentWorkspaceId);
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector(
    (state) => state.inbox,
  );

  // Listen for workspace changes
  useEffect(() => {
    const handleWorkspaceChange = () => {
      if (workspaceId && !conversations[workspaceId]) {
        dispatch(fetchConversations(workspaceId));
      }
    };

    eventBus.on(EVENTBUS_WORKSPACE_CHANGED as any, handleWorkspaceChange);
    return () => {
      eventBus.off(EVENTBUS_WORKSPACE_CHANGED as any, handleWorkspaceChange);
    };
  }, [workspaceId, dispatch, conversations]);

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

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(target)
      ) {
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

  const handleMenuItemClick = async (
    action: string,
    e: React.MouseEvent,
    conversationId?: string,
  ) => {
    e.stopPropagation();
    setActiveMenu(null);

    if (action === 'delete' && conversationId) {
      try {
        const realId = decodeGlobalId(conversationId);
        await deleteConversation(realId);
        if (workspaceId) {
          dispatch(fetchConversations(workspaceId));
        }
      } catch (err) {
        //
      }
    }

    if (action === 'unread' && conversationId) {
      const rawConversationId = decodeGlobalId(conversationId);
      openConversation(rawConversationId);
      if (workspaceId) {
        dispatch(updateConversationUnreadCount({ workspaceId, conversationId, unreadCount: 0 }));
      }
    }
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsAllDropdownOpen(false);
  };

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleConversationClick = (conversationId: string) => {
    const conversation = data.conversations.edges.find(
      (edge) => edge.node.id === conversationId,
    )?.node;
    if (conversation) {
      const conversationData: Conversation = {
        id: conversation.id,
        contact: {
          id: conversation.contact?.id || '',
          createdAt: conversation.createdAt || '',
          updatedAt: conversation.updatedAt || '',
          guestId: '',
          name: conversation.contact?.name || 'Guest',
          email: conversation.contact?.email || '',
          notification: true,
          segments: [],
          isOnline: conversation.contact?.isOnline || false,
          lastActivityAt: conversation.lastActivityAt || '',
          workspaceId: workspaceId || '',
          avatar: conversation.contact?.avatar || '',
          countryCode: conversation?.contact?.context?.countryCode || ''
        },
        assignedTo: conversation.assignedTo?.id || null,
        participants: [],
        lastActivityAt: conversation.lastActivityAt || '',
        latestMessage: {
          id: conversation.id,
          content: conversation.latestMessage?.content || '',
          sender: 'agent' as any,
          createdAt: conversation.lastActivityAt || '',
          updatedAt: conversation.lastActivityAt || '',
          type: 'text' as any,
          status: 'sent' as any,
          user: null,
        },
      };
      dispatch(setSelectedConversation(conversationData));
      if (onSelectConversation) {
        onSelectConversation(conversation);
      }
    }
    navigate(`?conversationId=${conversationId}`);
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
            $active={isCustomFilterDropdownOpen}
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
        {data.conversations.edges.length === 0 && !isLoadingNext && (
          <S.AllDataLoaded>{t('inboxList.noConversationYet')}</S.AllDataLoaded>
        )}
        {data.conversations.edges.map((edge, index) => {
          const conversation = edge.node;
          return (
            <S.NotificationItem
              key={conversation.id}
              $active={conversation.id === activeConversationId}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <S.Avatar>
                <ProfileCard
                  contactId={conversation.contact?.id}
                  avatarUrl={conversation.contact?.avatar || avatarDefault}
                  name={conversation.contact?.name}
                  countryCode={conversation.contact?.context?.countryCode ||''}
                  hiddenInfo
                />
              </S.Avatar>
              <S.Content>
                <S.Title>
                  {conversation.contact?.name || DEFAULT_FULL_NAME}
                </S.Title>
                <S.Subtitle>
                  {conversation.latestMessage?.content || <p>No message</p>}
                </S.Subtitle>
              </S.Content>
              <S.RightSection ref={menuRef}>
                <S.Time className="time">
                  {getFormattedTime(conversation.lastActivityAt)}
                </S.Time>
                <S.BarIcon onClick={(e) => handleMenuClick(index, e)}>
                  <Image src={barColumn} preview={false} />
                </S.BarIcon>
                {Number(conversation.unreadCount) > 0 && (
                  <S.Badge>{conversation.unreadCount}</S.Badge>
                )}
                {activeMenu === index && (
                  <S.MenuDropdown
                    ref={menuDropdownRef}
                    isOpen={true}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <S.MenuItem
                      onClick={(e) => handleMenuItemClick('resolve', e)}
                    >
                      <Image src={check} preview={false} />
                      Mark as resolved
                    </S.MenuItem>
                    {Number(conversation.unreadCount) > 0 && (
                      <S.MenuItem
                        onClick={(e) => handleMenuItemClick('unread', e, conversation.id)}
                      >
                        <Image src={unreadIcon} preview={false} />
                        Mark as unread
                      </S.MenuItem>
                    )}
                    {/* <S.MenuItem
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
                    </S.MenuItem> */}
                    <S.MenuItem
                      tabIndex={0}
                      role="button"
                      className="delete"
                      onClick={(e) =>
                        handleMenuItemClick('delete', e, conversation.id)
                      }
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
        {isLoadingNext && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              width: '100%',
            }}
          >
            <LoadingOutlined spin style={{ fontSize: 24, color: '#999' }} />
          </div>
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

export default ConversationList;
