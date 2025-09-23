import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import { useMemo } from 'react';
import { Row, Skeleton } from 'antd';

import { TabEnums } from '@/shared/helper/enums/header';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import PluginCard from '../PluginCard';
import ContactCard from '../ContactCard';
import Typography from '../../../Typography';
import KnowledgeBaseCard from '../KnowledgeBaseCard';
import MessageCard from '@/shared/components/common/header/search/MessageCard/index';

import * as S from './tab-content.styled';

import icMessage from '@/assets/icons/header/ic-message.svg';
import icContact from '@/assets/icons/header/ic-contact.svg';
import icPlugins from '@/assets/icons/header/ic-plugins.svg';
import icKnowledge from '@/assets/icons/header/ic-knowledge.svg';

import { RootState } from '@/core/store';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/shared/hooks';

interface TabAllContentProps {
  search: string;
  onParams?: any;
  onCloseTab?: () => void;
}

function TabAllContent({ search, onParams, onCloseTab }: TabAllContentProps) {
  const { t } = useTranslation('header');

  const { searchResults: pluginResults, loading: pluginLoading } = useSelector(
    (state: RootState) => state.plugins
  );
  const { data: messageResults, loading: messageLoading } = useSelector(
    (state: RootState) => state.message
  );
  const { items: articleResults, loading: articleLoading } = useSelector(
    (state: RootState) => state.helpdeskArticles
  );
  const { searchResults: contactResults, isLoading: contactLoading } = useAppSelector(
    (state: RootState) => state.contacts
  );

  if (!search.trim()) return null;

  const sections = useMemo(() => {
    return [
      {
        key: TabEnums.MESSAGES,
        label: t('header.all-tab.messages'),
        icon: icMessage,
        results: messageResults || [],
        loading: messageLoading,
        renderItem: (item: any) => <MessageCard key={item.id} data={item} onCloseTab={onCloseTab}/>,
      },
      {
        key: TabEnums.KNOWLEDGE_BASE,
        label: t('header.all-tab.knowledge-base'),
        icon: icKnowledge,
        results: articleResults || [],
        loading: articleLoading,
        renderItem: (item: any) => <KnowledgeBaseCard key={item.id} data={item} onCloseTab={onCloseTab}/>,
      },
      {
        key: TabEnums.CONTACTS,
        label: t('header.all-tab.contacts'),
        icon: icContact,
        results: contactResults || [],
        loading: contactLoading,
        renderItem: (item: any) => <ContactCard key={item.id} data={item} onCloseTab={onCloseTab}/>,
      },
      {
        key: TabEnums.PLUGINS,
        label: t('header.all-tab.plugins'),
        icon: icPlugins,
        results: pluginResults || [],
        loading: pluginLoading,
        renderItem: (item: any) => <PluginCard key={item.id} data={item} onCloseTab={onCloseTab}/>,
      },
    ].filter((s) => s.results.length > 0 || s.loading);
  }, [
    messageResults,
    articleResults,
    contactResults,
    pluginResults,
    messageLoading,
    articleLoading,
    contactLoading,
    pluginLoading,
    t,
  ]);

  function handleViewAll(type: TabEnums) {
    onParams?.((prev: { search: string; tab: string }) => ({
      ...prev,
      tab: type,
    }));
  }

  return (
    <S.TabAllContainer>
      <Row gutter={[24, 24]} justify="space-between">
        {sections.map((section) => (
          <S.TabContent xs={24} lg={12} key={section.key}>
            <S.TabWrap>
              <S.TabSection>
                <S.TabLabel>
                  <Typography fontWeight={fontWeight?.semiBold} color="#253a8e">
                    <ReactSVG src={section.icon} />
                    {section.label}
                  </Typography>
                  {section.loading ? (
                    <Skeleton.Input
                      active
                      style={{ minWidth: 80, maxWidth: 80, height: 20 }}
                    />
                  ) : (
                    <Typography color={themeColors?.newtralDark}>
                      {section.results.length} {t('header.all-tab.results')}
                    </Typography>
                  )}
                </S.TabLabel>

                <S.TabCardContentWrap>
                  {section.loading
                    ? Array(2)
                        .fill(0)
                        .map((_, idx) => (
                          <Skeleton.Input
                            key={idx}
                            active
                            style={{ width: '100%', height: 60, marginBottom: 8 }}
                          />
                        ))
                    : section.results
                        .slice(0, 2)
                        .map((item) => section.renderItem(item))}
                </S.TabCardContentWrap>
              </S.TabSection>

              <S.ViewMoreResults>
                {section.loading ? (
                  <Skeleton.Input
                    active
                    style={{ minWidth: 120, maxWidth: 120, height: 20 }}
                  />
                ) : (
                  <Typography
                    fontWeight={fontWeight?.semiBold}
                    onClick={() => handleViewAll(section.key)}
                  >
                    {t('header.all-tab.view-more')}
                  </Typography>
                )}
              </S.ViewMoreResults>
            </S.TabWrap>
          </S.TabContent>
        ))}
      </Row>
    </S.TabAllContainer>
  );
}

export default TabAllContent;
