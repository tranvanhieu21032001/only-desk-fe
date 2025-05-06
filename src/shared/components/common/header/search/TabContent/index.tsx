import { useEffect, useMemo, useState } from 'react';

import {
  ContactCardInterface,
  KnowledgeBaseCardInterface,
  MessageCardInterface,
  PluginCardInterface,
} from '@/shared/model/header.model';
import { TabEnums } from '@/shared/helper/enums/header';

import PluginCard from '../PluginCard';
import MessageCard from '../MessageCard';
import ContactCard from '../ContactCard';
import KnowledgeBaseCard from '../KnowledgeBaseCard';

import * as S from './tab.styled';

import icMessage from '@/assets/icons/auth/ic-adobe.svg';
import icAvatar from '@/assets/icons/header/ic-message-card-mockup.svg';

interface TabContentProps {
  type: TabEnums;
}

function TabContent({ type }: TabContentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [messages, setMessages] = useState<MessageCardInterface[]>([]);
  const [contacts, setContacts] = useState<ContactCardInterface[]>([]);
  const [plugins, setPlugins] = useState<PluginCardInterface[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<
    KnowledgeBaseCardInterface[]
  >([]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [type]);

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
        avatar: icMessage,
      },
    ]);

    setKnowledgeBase([
      {
        id: '1',
        label: 'Admin 1',
      },
    ]);
  }, []);

  const renderContent = useMemo(() => {
    switch (type) {
      case TabEnums?.MESSAGES:
        return Array(5)
          ?.fill(0)
          ?.map(() => (
            <MessageCard
              key={messages?.[0]?.id}
              {...messages?.[0]}
              isLoading={isLoading}
            />
          ));
      case TabEnums?.CONTACTS:
        return Array(5)
          ?.fill(0)
          ?.map(() => (
            <ContactCard
              key={contacts?.[0]?.id}
              {...contacts?.[0]}
              isLoading={isLoading}
            />
          ));

      case TabEnums?.KNOWLEDGE_BASE:
        return Array(5)
          ?.fill(0)
          ?.map(() => (
            <KnowledgeBaseCard
              key={knowledgeBase?.[0]?.id}
              {...knowledgeBase?.[0]}
              isLoading={isLoading}
            />
          ));

      case TabEnums?.PLUGINS:
        return Array(5)
          ?.fill(0)
          ?.map(() => (
            <PluginCard
              key={plugins?.[0]?.id}
              {...plugins?.[0]}
              isLoading={isLoading}
            />
          ));

      default:
        break;
    }
  }, [type, isLoading]);

  return <S.TabCardContentWrap>{renderContent}</S.TabCardContentWrap>;
}

export default TabContent;
