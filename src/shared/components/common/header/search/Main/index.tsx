import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { ReactSVG } from 'react-svg';

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

function Search() {
  const { t } = useTranslation('header');
  const [params, setParams] = useState<{
    search: string;
    tab: string;
  }>({
    search: '',
    tab: TabEnums?.ALL,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = debounce(() => {}, 600);

  const items: TabsProps['items'] = [
    {
      key: TabEnums?.ALL,
      label: (
        <S.LabelTab>
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('header.tabs.all')}
          </Typography>
        </S.LabelTab>
      ),
      children: <TabAllContent {...params} onParams={setParams} />,
    },
    {
      key: TabEnums?.MESSAGES,
      label: (
        <S.LabelTab>
          <ReactSVG src={icMessage} />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('header.tabs.messages')}
          </Typography>
        </S.LabelTab>
      ),
      children: <TabContent type={TabEnums?.MESSAGES} />,
    },
    {
      key: TabEnums?.CONTACTS,
      label: (
        <S.LabelTab>
          <ReactSVG src={icContact} />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('header.tabs.contacts')}
          </Typography>
        </S.LabelTab>
      ),
      children: <TabContent type={TabEnums?.CONTACTS} />,
    },
    {
      key: TabEnums?.KNOWLEDGE_BASE,
      label: (
        <S.LabelTab>
          <ReactSVG src={icKnowledge} />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('header.tabs.knowledge-base')}
          </Typography>
        </S.LabelTab>
      ),
      children: <TabContent type={TabEnums?.KNOWLEDGE_BASE} />,
    },
    {
      key: TabEnums?.PLUGINS,
      label: (
        <S.LabelTab>
          <ReactSVG src={icPlugins} />
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('header.tabs.plugins')}
          </Typography>
        </S.LabelTab>
      ),
      children: <TabContent type={TabEnums?.PLUGINS} />,
    },
  ];

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
          onChange={handleSearch}
          allowClear={{ clearIcon: <CloseOutlined /> }}
        />
      </S.SearchInputWrap>

      <S.SearchTabs>
        <S.SearchCount>
          <Typography>100 {t('header.tabs.results')}</Typography>
        </S.SearchCount>
        <Tabs
          activeKey={params?.tab}
          defaultActiveKey={params?.tab}
          items={items}
          onChange={handleChangeTab}
        />
      </S.SearchTabs>
    </S.SearchContainer>
  );
}

export default Search;
