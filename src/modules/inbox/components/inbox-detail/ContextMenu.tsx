import React from 'react';
import * as S from './InboxDetail.styles';
import { Message } from '../../interfaces/inbox';
import { InboxMessageType, InboxSender } from '@/modules/settings/helpers/enums/inbox.enums';

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
  t: (key: string) => string
): MenuItem[] => {
  const isAgentMessage = message.sender === InboxSender.Agent;
  const isGuestMessage = message.sender === InboxSender.Guest;
  const isImageMessage = message.type === InboxMessageType.Image;
  const isNoteMessage = message.type === InboxMessageType.Note;
  const items: MenuItem[] = [];

  switch (message.type) {
    case InboxMessageType.Image:
      items.push({
        key: 'reply',
        icon: icons.iconReply,
        label: t('inboxDetail.reply'),
        onClick: handlers.handleReply,
        danger: false,
        style: {},
        type: 'item',
      });
      items.push({ key: 'separator', type: 'separator' });
      items.push({
        key: 'delete',
        icon: icons.iconDelete,
        label: t('inboxDetail.delete'),
        onClick: handlers.handleDeleteMessage,
        danger: true,
        type: 'item',
      });
      break;
    case InboxMessageType.Note:
      if (isAgentMessage) {
        items.push({
          key: 'copy',
          icon: icons.iconCopy,
          label: t('inboxDetail.copyText'),
          onClick: handlers.handleCopyText,
          danger: false,
          type: 'item',
        });
        items.push({
          key: 'edit',
          icon: icons.iconEdit,
          label: t('inboxDetail.edit'),
          onClick: handlers.handleEdit,
          danger: false,
          type: 'item',
        });
        items.push({ key: 'separator', type: 'separator' });
        items.push({
          key: 'delete',
          icon: icons.iconDelete,
          label: t('inboxDetail.delete'),
          onClick: handlers.handleDeleteMessage,
          danger: true,
          type: 'item',
        });
      } else if (isGuestMessage) {
        items.push({
          key: 'copy',
          icon: icons.iconCopy,
          label: t('inboxDetail.copyText'),
          onClick: handlers.handleCopyText,
          danger: false,
          type: 'item',
        });
      }
      break;
    case InboxMessageType.Text:
    default:
      if (isGuestMessage) {
        items.push({
          key: 'reply',
          icon: icons.iconReply,
          label: t('inboxDetail.reply'),
          onClick: handlers.handleReply,
          danger: false,
          style: { borderBottom: '1px solid #eee' },
          type: 'item',
        });
        items.push({
          key: 'copy',
          icon: icons.iconCopy,
          label: t('inboxDetail.copyText'),
          onClick: handlers.handleCopyText,
          danger: false,
          type: 'item',
        });
      } else if (isAgentMessage) {
        items.push({
          key: 'reply',
          icon: icons.iconReply,
          label: t('inboxDetail.reply'),
          onClick: handlers.handleReply,
          danger: false,
          style: { borderBottom: '1px solid #eee' },
          type: 'item',
        });
        items.push({
          key: 'copy',
          icon: icons.iconCopy,
          label: t('inboxDetail.copyText'),
          onClick: handlers.handleCopyText,
          danger: false,
          type: 'item',
        });
        items.push({
          key: 'edit',
          icon: icons.iconEdit,
          label: t('inboxDetail.edit'),
          onClick: handlers.handleEdit,
          danger: false,
          type: 'item',
        });
        items.push({ key: 'separator', type: 'separator' });
        items.push({
          key: 'delete',
          icon: icons.iconDelete,
          label: t('inboxDetail.delete'),
          onClick: handlers.handleDeleteMessage,
          danger: true,
          type: 'item',
        });
      }
      break;
  }
  return items;
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