import { useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { TabEnums } from '@/shared/helper/enums/header';

import PluginCard from '../PluginCard';
import MessageCard from '../MessageCard';
import ContactCard from '../ContactCard';
import KnowledgeBaseCard from '../KnowledgeBaseCard';

import * as S from './tab.styled';
import { Skeleton } from 'antd';
import { useAppDispatch } from '@/shared/hooks';
import { fetchSearchMessages } from '@/modules/inbox/store/features/message';
import { fetchSearchPlugins } from '@/modules/plugins/store/pluginsSlice';
import { fetchHelpdeskArticles } from '@/modules/knowledge-base/store/helpdeskArticleSlice';
import { fetchSearchContacts } from '@/modules/contacts/store/features/contacts';

interface TabContentProps {
  type: TabEnums;
  search: string;
  onCloseTab?: () => void;
}

function TabContent({ type, search, onCloseTab }: TabContentProps) {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const { 
    data: messageResults, 
    loading: messageLoading, 
    hasNextPage: messageHasNextPage, 
    endCursor: messageEndCursor 
  } = useSelector((state: RootState) => state.message);

  const { 
    searchResults: pluginResults, 
    searchLoading: pluginLoading, 
    hasNextPage: pluginHasNextPage, 
    endCursor: pluginEndCursor 
  } = useSelector((state: RootState) => state.plugins);

  const { 
    items: articleResults, 
    loading: articleLoading, 
    hasNextPage: articleHasNextPage, 
    endCursor: articleEndCursor 
  } = useSelector((state: RootState) => state.helpdeskArticles);

  const { 
    searchResults: contactResults, 
    searchLoading: contactLoading,
    searchOffset,
    hasMore,
  } = useSelector((state: RootState) => state.contacts);
  
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      if (type === TabEnums.MESSAGES) {
        if (!messageLoading && messageHasNextPage) {
          dispatch(fetchSearchMessages({ keyword: search, after: messageEndCursor }));
        }
      } else if (type === TabEnums.PLUGINS) {
        if (!pluginLoading && pluginHasNextPage) {
          dispatch(fetchSearchPlugins({ keyword: search, after: pluginEndCursor }));
        }
      } else if (type === TabEnums.KNOWLEDGE_BASE) {
        if (!articleLoading && articleHasNextPage) {
          dispatch(fetchHelpdeskArticles({ keyword: search, after: articleEndCursor }));
        }
      } else if (type === TabEnums.CONTACTS) {
        if (!contactLoading && hasMore) {
          dispatch(fetchSearchContacts({ keyword: search, offset: searchOffset }));
        }
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [
    type, 
    search,
    messageLoading, 
    messageHasNextPage, 
    messageEndCursor,
    pluginLoading, 
    pluginHasNextPage, 
    pluginEndCursor,
    articleLoading,
    articleHasNextPage,
    articleEndCursor,
    contactLoading,
    hasMore,
    searchOffset
  ]);

  const renderContent = useMemo(() => {
    switch (type) {
      case TabEnums.MESSAGES:
        if (messageLoading && messageResults.length === 0) {
          return <Skeleton active paragraph={{ rows: 5 }} />;
        }
        return messageResults?.map((item: any) => (
          <MessageCard key={item.id} data={item} onCloseTab={onCloseTab} />
        ));
      case TabEnums.PLUGINS:
        if (pluginLoading && pluginResults.length === 0) {
          return <Skeleton active paragraph={{ rows: 5 }} />;
        }
        return pluginResults?.map((item: any) => (
          <PluginCard key={item.id} data={item} onCloseTab={onCloseTab} />
        ));
      case TabEnums.CONTACTS:
        if (contactLoading && contactResults.length === 0) {
          return <Skeleton active paragraph={{ rows: 5 }} />;
        }
        return contactResults?.map((item: any) => (
          <ContactCard key={item.id} data={item} onCloseTab={onCloseTab} />
        ));
      case TabEnums.KNOWLEDGE_BASE:
        if (articleLoading && articleResults.length === 0) {
          return <Skeleton active paragraph={{ rows: 5 }} />;
        }
        return articleResults?.map((item: any) => (
          <KnowledgeBaseCard key={item.id} data={item} onCloseTab={onCloseTab} />
        ));
      default:
        return null;
    }
  }, [
    type, 
    messageResults, 
    contactResults, 
    articleResults, 
    pluginResults, 
    messageLoading, 
    contactLoading, 
    articleLoading, 
    pluginLoading, 
    onCloseTab
  ]);

  return (
    <S.TabCardContentWrap ref={containerRef}>
      {renderContent}
      {(type === TabEnums.MESSAGES && messageLoading && messageResults.length > 0) ||
       (type === TabEnums.PLUGINS && pluginLoading && pluginResults.length > 0) ||
       (type === TabEnums.CONTACTS && contactLoading && contactResults.length > 0) ||
       (type === TabEnums.KNOWLEDGE_BASE && articleLoading && articleResults.length > 0) ? (
        <div style={{ marginTop: '16px' }}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ) : null}
    </S.TabCardContentWrap>
  );
}

export default TabContent;