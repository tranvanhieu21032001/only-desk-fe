import bellWhite from '@/assets/icons/inbox/ic-bell-white.svg';
import editWhite from '@/assets/icons/inbox/ic-edit-white.svg';
import tagWhite from '@/assets/icons/inbox/ic-tag.svg';
import noteWhite from '@/assets/icons/inbox/ic-note-white.svg';
export const INBOX_TABS = {
  EDIT: 'Edit',
  NOTE: 'Note',
  REMINDER: 'Reminder',
  SHORTCUTS: 'Shortcuts',
  KNOWLEDGE_BASE: 'Knowledge Base',
};

export const MENU_WIDTH = 180;

export const MESSAGE_LIMIT = 20;

export 
  const TAB_ACTIONS = [
    {
      key: INBOX_TABS.EDIT,
      icon: editWhite,
      label: 'Edit',
      tab: INBOX_TABS.EDIT,
    },
    {
      key: INBOX_TABS.REMINDER,
      icon: bellWhite,
      label: 'Reminder',
      tab: INBOX_TABS.REMINDER,
    },
    {
      key: INBOX_TABS.NOTE,
      icon: noteWhite,
      label: 'Note',
      tab: INBOX_TABS.NOTE,
    },
    {
      key: INBOX_TABS.KNOWLEDGE_BASE,
      icon: tagWhite,
      label: 'Knowledge Base',
      tab: INBOX_TABS.KNOWLEDGE_BASE,
    },
  ];
