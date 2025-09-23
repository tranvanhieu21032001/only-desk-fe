import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { TabEnums } from '@/shared/helper/enums/header';

import PluginCard from '../PluginCard';
import MessageCard from '../MessageCard';
import ContactCard from '../ContactCard';
import KnowledgeBaseCard from '../KnowledgeBaseCard';

import * as S from './tab.styled';
import { Skeleton } from 'antd';

interface TabContentProps {
  type: TabEnums;
  onCloseTab?: () => void;
}

function TabContent({ type, onCloseTab }: TabContentProps) {
  const { searchResults: pluginResults, loading: pluginLoading } = useSelector(
    (state: RootState) => state.plugins
  );
  const { data: messageResults, loading: messageLoading } = useSelector(
    (state: RootState) => state.message
  );
  const { items: articleResults, loading: articleLoading } = useSelector(
    (state: RootState) => state.helpdeskArticles
  );
  const { searchResults: contactResults, isLoading: contactLoading } = useSelector(
    (state: RootState) => state.contacts
  );

  const isLoading = useMemo(() => {
    switch (type) {
      case TabEnums.MESSAGES:
        return messageLoading;
      case TabEnums.CONTACTS:
        return contactLoading;
      case TabEnums.KNOWLEDGE_BASE:
        return articleLoading;
      case TabEnums.PLUGINS:
        return pluginLoading;
      default:
        return false;
    }
  }, [type, messageLoading, contactLoading, articleLoading, pluginLoading]);

  const renderContent = useMemo(() => {
    switch (type) {
      case TabEnums.MESSAGES:
        return messageResults?.map((item) => (
          <MessageCard key={item.id} data={item} isLoading={isLoading} onCloseTab={onCloseTab}/>
        ));
      case TabEnums.CONTACTS:
        return contactResults?.map((item) => (
          <ContactCard key={item.id} data={item} isLoading={isLoading} onCloseTab={onCloseTab}/>
        ));
      case TabEnums.KNOWLEDGE_BASE:
        return articleResults?.map((item) => (
          <KnowledgeBaseCard key={item.id} data={item} isLoading={isLoading} onCloseTab={onCloseTab}/>
        ));
      case TabEnums.PLUGINS:
        return pluginResults?.map((item) => (
          <PluginCard key={item.id} data={item} isLoading={isLoading} onCloseTab={onCloseTab}/>
        ));
      default:
        return null;
    }
  }, [type, messageResults, contactResults, articleResults, pluginResults, isLoading]);

  return <S.TabCardContentWrap>{isLoading ? <Skeleton /> : renderContent}</S.TabCardContentWrap>;
}

export default TabContent;