import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { Row, Skeleton } from 'antd';

import {
  ContactCardInterface,
  KnowledgeBaseCardInterface,
  MessageCardInterface,
  PluginCardInterface,
} from '@/shared/model/header.model';
import { TabEnums } from '@/shared/helper/enums/header';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import PluginCard from '../PluginCard';
import ContactCard from '../ContactCard';
import Typography from '../../../Typography';
import KnowledgeBaseCard from '../KnowledgeBaseCard';
import MessageCard from '@/shared/components/common/header/search/MessageCard/index';

import * as S from './tab-content.styled';

import icAdobe from '@/assets/icons/auth/ic-adobe.svg';
import icMessage from '@/assets/icons/header/ic-message.svg';
import icContact from '@/assets/icons/header/ic-contact.svg';
import icPlugins from '@/assets/icons/header/ic-plugins.svg';
import icKnowledge from '@/assets/icons/header/ic-knowledge.svg';
import icAvatar from '@/assets/icons/header/ic-message-card-mockup.svg';

interface TabAllContentProps {
  search: string;
  tab: string;
  onParams?: any;
}

function TabAllContent({ onParams }: TabAllContentProps) {
  const { t } = useTranslation('header');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessageCardInterface[]>([]);
  const [contacts, setContacts] = useState<ContactCardInterface[]>([]);
  const [plugins, setPlugins] = useState<PluginCardInterface[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<
    KnowledgeBaseCardInterface[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        label: 'Admin 1',
        time: '10m',
        description: 'John Smith submitted web form',
        avatar: icAvatar,
      },
    ]);

    setContacts([
      {
        id: '1',
        label: 'Admin 1',
        description: 'John Smith submitted web form',
        avatar: icAvatar,
      },
    ]);

    setPlugins([
      {
        id: '1',
        label: 'Admin 1',
        description: 'John Smith submitted web form',
        avatar: icAdobe,
      },
    ]);

    setKnowledgeBase([
      {
        id: '1',
        label: 'Admin 1',
      },
    ]);
  }, []);

  function handleViewAll(type: TabEnums) {
    //Handle later
    console.log(type);

    onParams?.((prev: { search: string; tab: string }) => ({
      ...prev,
      tab: type as string,
    }));
  }

  return (
    <S.TabAllContainer>
      <Row gutter={[24, 24]} justify="space-between">
        <S.TabContent xs={24} lg={12}>
          <S.TabWrap>
            <S.TabSection>
              <S.TabLabel>
                <Typography fontWeight={fontWeight?.semiBold} color="#253a8e">
                  <ReactSVG src={icMessage} />
                  {t('header.all-tab.messages')}
                </Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ minWidth: 80, maxWidth: 80, height: 20 }}
                  />
                ) : (
                  <Typography color={themeColors?.newtralDark}>
                    10 {t('header.all-tab.results')}
                  </Typography>
                )}
              </S.TabLabel>

              <S.TabCardContentWrap>
                {Array(2)
                  ?.fill(0)
                  ?.map(() => (
                    <MessageCard
                      key={messages?.[0]?.id}
                      {...messages?.[0]}
                      isLoading={isLoading}
                    />
                  ))}
              </S.TabCardContentWrap>
            </S.TabSection>
            <S.ViewMoreResults>
              {isLoading ? (
                <Skeleton.Input
                  active
                  style={{ minWidth: 120, maxWidth: 120, height: 20 }}
                />
              ) : (
                <Typography
                  fontWeight={fontWeight?.semiBold}
                  onClick={() => handleViewAll(TabEnums?.MESSAGES)}
                >
                  {t('header.all-tab.view-more')}
                </Typography>
              )}
            </S.ViewMoreResults>
          </S.TabWrap>

          <S.TabWrap>
            <S.TabSection>
              <S.TabLabel>
                <Typography fontWeight={fontWeight?.semiBold} color="#253a8e">
                  <ReactSVG src={icKnowledge} />
                  {t('header.all-tab.knowledge-base')}
                </Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ minWidth: 80, maxWidth: 80, height: 20 }}
                  />
                ) : (
                  <Typography color={themeColors?.newtralDark}>
                    8 {t('header.all-tab.results')}
                  </Typography>
                )}
              </S.TabLabel>

              <S.TabCardContentWrap>
                {Array(2)
                  ?.fill(0)
                  ?.map(() => (
                    <KnowledgeBaseCard
                      key={knowledgeBase?.[0]?.id}
                      {...knowledgeBase?.[0]}
                      isLoading={isLoading}
                    />
                  ))}
              </S.TabCardContentWrap>
            </S.TabSection>
            <S.ViewMoreResults>
              {isLoading ? (
                <Skeleton.Input
                  active
                  style={{ minWidth: 120, maxWidth: 120, height: 20 }}
                />
              ) : (
                <Typography
                  fontWeight={fontWeight?.semiBold}
                  onClick={() => handleViewAll(TabEnums?.KNOWLEDGE_BASE)}
                >
                  {t('header.all-tab.view-more')}
                </Typography>
              )}
            </S.ViewMoreResults>
          </S.TabWrap>
        </S.TabContent>
        <S.TabContent xs={24} lg={12}>
          <S.TabWrap>
            <S.TabSection>
              <S.TabLabel>
                <Typography fontWeight={fontWeight?.semiBold} color="#253a8e">
                  <ReactSVG src={icContact} />
                  {t('header.all-tab.contacts')}
                </Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ minWidth: 80, maxWidth: 80, height: 20 }}
                  />
                ) : (
                  <Typography color={themeColors?.newtralDark}>
                    1 {t('header.all-tab.results')}
                  </Typography>
                )}
              </S.TabLabel>

              <S.TabCardContentWrap>
                {Array(1)
                  ?.fill(0)
                  ?.map(() => (
                    <ContactCard
                      key={contacts?.[0]?.id}
                      {...contacts?.[0]}
                      isLoading={isLoading}
                    />
                  ))}
              </S.TabCardContentWrap>
            </S.TabSection>

            <S.ViewMoreResults>
              {isLoading ? (
                <Skeleton.Input
                  active
                  style={{ minWidth: 120, maxWidth: 120, height: 20 }}
                />
              ) : (
                <Typography
                  fontWeight={fontWeight?.semiBold}
                  onClick={() => handleViewAll(TabEnums?.CONTACTS)}
                >
                  {t('header.all-tab.view-more')}
                </Typography>
              )}
            </S.ViewMoreResults>
          </S.TabWrap>
          <S.TabWrap>
            <S.TabSection>
              <S.TabLabel>
                <Typography fontWeight={fontWeight?.semiBold} color="#253a8e">
                  <ReactSVG src={icPlugins} />
                  {t('header.all-tab.plugins')}
                </Typography>
                {isLoading ? (
                  <Skeleton.Input
                    active
                    style={{ minWidth: 80, maxWidth: 80, height: 20 }}
                  />
                ) : (
                  <Typography color={themeColors?.newtralDark}>
                    10 {t('header.all-tab.results')}
                  </Typography>
                )}
              </S.TabLabel>

              <S.TabCardContentWrap>
                {Array(2)
                  ?.fill(0)
                  ?.map(() => (
                    <PluginCard
                      key={plugins?.[0]?.id}
                      {...plugins?.[0]}
                      isLoading={isLoading}
                    />
                  ))}
              </S.TabCardContentWrap>
            </S.TabSection>
            <S.ViewMoreResults>
              {isLoading ? (
                <Skeleton.Input
                  active
                  style={{ minWidth: 120, maxWidth: 120, height: 20 }}
                />
              ) : (
                <Typography
                  fontWeight={fontWeight?.semiBold}
                  onClick={() => handleViewAll(TabEnums?.PLUGINS)}
                >
                  {t('header.all-tab.view-more')}
                </Typography>
              )}
            </S.ViewMoreResults>
          </S.TabWrap>
        </S.TabContent>
      </Row>
    </S.TabAllContainer>
  );
}

export default TabAllContent;
