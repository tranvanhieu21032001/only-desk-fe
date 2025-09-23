import { debounce } from 'lodash';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Image, Tabs, TabsProps } from 'antd';
import { ReactSVG } from 'react-svg';
import empty from '@/assets/images/contact/img-contact-empty.png';
import TabContent from '../TabContent';
import { TabEnums } from '@/shared/helper/enums/header';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '../../../Typography';
import TabAllContent from '../TabAllContent';

import * as S from './search.styled';

import icMessage from '@/assets/icons/header/ic-message.svg';
import icContact from '@/assets/icons/header/ic-contact.svg';
import icPlugins from '@/assets/icons/header/ic-plugins.svg';
import icKnowledge from '@/assets/icons/header/ic-knowledge.svg';
import { fetchHelpdeskArticles } from '@/modules/knowledge-base/store/helpdeskArticleSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { useSelector } from 'react-redux';
import { fetchSearchPlugins } from '@/modules/plugins/store/pluginsSlice';
import { fetchSearchMessages } from '@/modules/inbox/store/features/message';
import { RootState } from '@/core/store';
import { fetchSearchContacts } from '@/modules/contacts/store/features/contacts';
import themeColors from '@/shared/styles/themes/default/colors';
import styled from 'styled-components';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
function Search({ onCloseSearch }: { onCloseSearch?: () => void }) {
  const { t } = useTranslation('header');
  const dispatch = useAppDispatch();

  const [params, setParams] = useState<{ search: string; tab: string }>({
    search: '',
    tab: TabEnums.ALL,
  });

  const { searchResults: pluginResults, loading: pluginLoading } = useSelector((state: RootState) => state.plugins);
  const { data: allMessage, loading: messageLoading } = useSelector((state: RootState) => state.message);
  const { items: allArticles, loading: articleLoading } = useSelector((state: RootState) => state.helpdeskArticles);
  const { searchResults: contactResults, isLoading: contactLoading } = useAppSelector((state: RootState) => state.contacts);

  const handleSearch = useCallback(
    debounce((value: string) => {
      setParams((prev) => ({ ...prev, search: value }));

      if (!value.trim()) {
        dispatch({ type: 'plugins/clearSearchResults' });
        dispatch({ type: 'contacts/clearSearchResults' });
        dispatch({ type: 'message/clearSearchMessages' });
        dispatch({ type: 'helpdeskArticles/clearSearchResults' });
        return;
      }
      dispatch(fetchHelpdeskArticles({ keyword: value }));
      dispatch(fetchSearchPlugins({ keyword: value }));
      dispatch(fetchSearchMessages({ keyword: value }));
      dispatch(fetchSearchContacts({ keyword: value }));
    }, 600),
    [dispatch]
  );


  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleSearch(e.target.value);
  }

  function handleCloseTab() {
    onCloseSearch?.();
  }


  const activeTabs = useMemo(() => {
    if (!params.search.trim()) return [];
    const tabs: string[] = [];
    if (allMessage?.length > 0 || messageLoading) tabs.push(TabEnums.MESSAGES);
    if (contactResults?.length > 0 || contactLoading) tabs.push(TabEnums.CONTACTS);
    if (allArticles?.length > 0 || articleLoading) tabs.push(TabEnums.KNOWLEDGE_BASE);
    if (pluginResults?.length > 0 || pluginLoading) tabs.push(TabEnums.PLUGINS);
    return tabs;
  }, [params.search, allMessage, contactResults, allArticles, pluginResults, messageLoading, contactLoading, articleLoading, pluginLoading]);

  const shouldShowAll = activeTabs.length > 1;
useEffect(() => {
  if (activeTabs.length === 1 && params.tab !== activeTabs[0]) {
    setParams((prev) => ({ ...prev, tab: activeTabs[0] }));
  }
}, [activeTabs, params.tab])


  const items: TabsProps['items'] = useMemo(() => {
    const dynamicTabs: TabsProps['items'] = [];

    if (shouldShowAll) {
      dynamicTabs.push({
        key: TabEnums.ALL,
        label: (
          <S.LabelTab>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('header.tabs.all')}
            </Typography>
          </S.LabelTab>
        ),
        children: <TabAllContent {...params} onParams={setParams} onCloseTab={handleCloseTab} />,
      });
    }

    if (activeTabs.includes(TabEnums.MESSAGES)) {
      dynamicTabs.push({
        key: TabEnums.MESSAGES,
        label: (
          <S.LabelTab>
            <ReactSVG src={icMessage} />
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('header.tabs.messages')}
            </Typography>
          </S.LabelTab>
        ),
        children: <TabContent type={TabEnums.MESSAGES} search={params.search} onCloseTab={handleCloseTab} />,
      });
    }

    if (activeTabs.includes(TabEnums.CONTACTS)) {
      dynamicTabs.push({
        key: TabEnums.CONTACTS,
        label: (
          <S.LabelTab>
            <ReactSVG src={icContact} />
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('header.tabs.contacts')}
            </Typography>
          </S.LabelTab>
        ),
        children: <TabContent type={TabEnums.CONTACTS} search={params.search} onCloseTab={handleCloseTab} />,
      });
    }

    if (activeTabs.includes(TabEnums.KNOWLEDGE_BASE)) {
      dynamicTabs.push({
        key: TabEnums.KNOWLEDGE_BASE,
        label: (
          <S.LabelTab>
            <ReactSVG src={icKnowledge} />
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('header.tabs.knowledge-base')}
            </Typography>
          </S.LabelTab>
        ),
        children: <TabContent type={TabEnums.KNOWLEDGE_BASE} search={params.search} onCloseTab={handleCloseTab} />,
      });
    }

    if (activeTabs.includes(TabEnums.PLUGINS)) {
      dynamicTabs.push({
        key: TabEnums.PLUGINS,
        label: (
          <S.LabelTab>
            <ReactSVG src={icPlugins} />
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('header.tabs.plugins')}
            </Typography>
          </S.LabelTab>
        ),
        children: <TabContent type={TabEnums.PLUGINS} search={params.search} onCloseTab={handleCloseTab} />,
      });
    }

    return dynamicTabs;
  }, [shouldShowAll, activeTabs, params, t]);

  function handleChangeTab(key: string) {
    setParams((prev) => ({
      ...prev,
      tab: key,
    }));
  }

  return (
    <S.SearchContainer>
      <S.SearchInputWrap>
        <S.SearchInput
          prefix
          placeholder={t('header.search')}
          onChange={onChangeInput}
          allowClear={{ clearIcon: <CloseOutlined /> }}
        />
      </S.SearchInputWrap>

      <S.SearchTabs>
        {activeTabs.length === 0 ? (
          <Wrapper>
            <Image src={empty} height={200} width={200} preview={false} />
            <Typography
              color={themeColors?.primary}
              variant="h5"
              fontWeight={fontWeight.semiBold}
            >
              No results found
            </Typography>
          </Wrapper>
        ) : (
          <Tabs
            activeKey={params.tab}
            items={items}
            onChange={handleChangeTab}
          />
        )}

      </S.SearchTabs>
    </S.SearchContainer>
  );
}

export default Search;
