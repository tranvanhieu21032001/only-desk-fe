import React from 'react';

import { Message } from '../../interfaces/inbox';
import { InboxMessageType, InboxSender } from '@/modules/settings/helpers/enums/inbox.enums';

import * as S from './InboxDetail.styles';

interface ContextMenuProps {
  contextMenu: {
    x: number;
    y: number;
    visible: boolean;
    message: Message | null;
    messageId?: string;
  };
  handleReply: () => void;
  handleDeleteMessage: () => void;
  handleCopyText: () => void;
  handleEdit: () => void;
  setHoveredMessageId: (id: string | null) => void;
  iconReply: string;
  iconDelete: string;
  iconEdit: string;
  iconCopy: string;
  MENU_WIDTH: number;
  t: (key: string) => string;
}

interface MenuItem {
  key: string;
  icon?: string;
  label?: string;
  onClick?: () => void;
  danger?: boolean;
  style?: React.CSSProperties;
  type?: 'separator' | 'item';
}

const getMenuItems = (
  message: Message,
  handlers: {
    handleReply: () => void;
    handleDeleteMessage: () => void;
    handleCopyText: () => void;
    handleEdit: () => void;
  },
  icons: {
    iconReply: string;
    iconDelete: string;
    iconEdit: string;
    iconCopy: string;
  },
  t: (key: string) => string,
): MenuItem[] => {
  const isOwner = message.sender === InboxSender.Agent;
  const isCopyTextSupported =
    message.type === InboxMessageType.Note ||
    message.type === InboxMessageType.Text;

  const menus: MenuItem[] = [
    {
      key: 'reply',
      icon: icons.iconReply,
      label: t('inboxDetail.reply'),
      onClick: handlers.handleReply,
      danger: false,
      type: 'item',
    },
  ];

  if (isCopyTextSupported) {
    menus.push({
      key: 'copy',
      icon: icons.iconCopy,
      label: t('inboxDetail.copyText'),
      onClick: handlers.handleCopyText,
      danger: false,
      type: 'item',
    });
  }

  if (isOwner) {
    menus.push(
      {
        key: 'edit',
        icon: icons.iconEdit,
        label: t('inboxDetail.edit'),
        onClick: handlers.handleEdit,
        danger: false,
        type: 'item',
      },
      {
        key: 'delete',
        icon: icons.iconDelete,
        label: t('inboxDetail.delete'),
        onClick: handlers.handleDeleteMessage,
        danger: true,
        type: 'item',
      }
    );
  }

  if (menus.length > 1) {
    menus.splice(menus.length - 1, 0, {
      key: 'separator',
      type: 'separator',
    });
  }
  
  return menus;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  handleReply,
  handleDeleteMessage,
  handleCopyText,
  handleEdit,
  setHoveredMessageId,
  iconReply,
  iconDelete,
  iconEdit,
  iconCopy,
  MENU_WIDTH,
  t,
}) => {
  if (!contextMenu.visible || !contextMenu.message) return null;

  const menuItems = getMenuItems(
    contextMenu.message,
    { handleReply, handleDeleteMessage, handleCopyText, handleEdit },
    { iconReply, iconDelete, iconEdit, iconCopy },
    t
  );

  return (
    <S.ContextMenu
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
        position: 'fixed',
        width: MENU_WIDTH,
        zIndex: 1000,
      }}
      onClick={e => e.stopPropagation()}
      onMouseEnter={() => {
        if (contextMenu.messageId) {
          setHoveredMessageId(contextMenu.messageId);
        }
      }}
      onMouseLeave={() => {
        setHoveredMessageId(null);
      }}
    >
      {menuItems.map((item, idx) => {
        if (item.type === 'separator') {
          return <S.ContextMenuSeparator key={`sep-${idx}`} />;
        }
        return (
          <S.ContextMenuItem
            key={item.key}
            onClick={item.onClick}
            danger={item.danger}
            style={item.style}
          >
            {item.icon && <img src={item.icon} alt={item.label} />}
            {item.label}
          </S.ContextMenuItem>
        );
      })}
    </S.ContextMenu>
  );
};

export default ContextMenu; 