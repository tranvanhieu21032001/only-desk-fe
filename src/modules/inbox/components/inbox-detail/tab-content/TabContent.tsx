// TabContent.tsx
import React, { useEffect } from 'react';
import ShortcutsTab from './ShortcutsTab';
import ReminderTab from './ReminderTab';
import KnowledgeBaseTab from './KnowledgeBaseTab';
import { TabContentProps } from '@/modules/inbox/interfaces/inbox';
import { useAppDispatch } from '@/shared/hooks';
import { fetchKnowledgeBaseSetting } from '@/modules/settings/store/features/knowledgebase';

const TabContent: React.FC<TabContentProps> = (props) => {
  const { activeTab, INBOX_TABS } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchKnowledgeBaseSetting());
  }, [dispatch]);
  switch (activeTab) {
    case INBOX_TABS.SHORTCUTS:
      return <ShortcutsTab {...props} />;
    case INBOX_TABS.NOTE:
      return null;
    case INBOX_TABS.REMINDER:
      return <ReminderTab {...props} />;
    case INBOX_TABS.KNOWLEDGE_BASE:
      return <KnowledgeBaseTab {...props} />;
    default:
      return null;
  }
};

export default TabContent;
