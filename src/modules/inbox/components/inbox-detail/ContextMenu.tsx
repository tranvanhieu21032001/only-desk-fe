import React from 'react';
import * as S from './InboxDetail.styles';
import { MessageType } from '@/shared/chat-logic/enums/chat.enums';
import iconReply from '@/assets/icons/inbox/ic-reply.svg';
import iconEdit from '@/assets/icons/common/ic-edit.svg';
import iconCopy from '@/assets/icons/common/ic-copy.svg';
import iconDelete from '@/assets/icons/common/ic-delete.svg';
import { useMessageMenu } from '@/shared/chat-logic/hooks/useMessageMenu';
import { Message } from '@/shared/chat-logic/interfaces/inbox';
import { toast } from 'react-toastify';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { ToastMessageType } from '@/shared/helper/enums/common';

interface ContextMenuProps {
  contextMenu: {
    x: number;
    y: number;
    visible: boolean;
    message: Message | null;
    messageId?: string;
  };
  rawConversationId: string;
  setHoveredMessageId: (id: string | null) => void;
  onCloseMenu: () => void;
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
    handleDelete: () => void;
    handleCopyText: () => void;
    handleEdit: () => void;
  },
  t: (key: string) => string,
): MenuItem[] => {
  const isOwner = false;
  const isCopyTextSupported =
    message.type === MessageType.NOTE || message.type === MessageType.TEXT;

  const menus: MenuItem[] = [
    {
      key: 'reply',
      icon: iconReply,
      label: t('inboxDetail.reply'),
      onClick: handlers.handleReply,
      danger: false,
      type: 'item',
    },
  ];

  if (isCopyTextSupported) {
    menus.push({
      key: 'copy',
      icon: iconCopy,
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
        icon: iconEdit,
        label: t('inboxDetail.edit'),
        onClick: handlers.handleEdit,
        danger: false,
        type: 'item',
      },
      {
        key: 'delete',
        icon: iconDelete,
        label: t('inboxDetail.delete'),
        onClick: handlers.handleDelete,
        danger: true,
        type: 'item',
      },
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
  setHoveredMessageId,
  rawConversationId,
  onCloseMenu,
  MENU_WIDTH,
  t,
}) => {
  if (!contextMenu.visible || !contextMenu.message) return null;

  const { handleCopyText, handleReply, handleEdit, handleDelete } =
    useMessageMenu({
      message: contextMenu.message,
      rawConversationId,
      onCloseMenu,
    });

  const menuItems = getMenuItems(
    contextMenu.message,
    {
      handleReply,
      handleDelete,
      handleCopyText: () =>
        handleCopyText(
          () => {
            toast(
              React.createElement(ToastMessage, {
                typeToast: ToastMessageType.SUCCESS,
                message: t('inboxDetail.textCopiedToClipboard'),
              }),
            );
          },
          (error) => {
            toast.error(
              React.createElement(ToastMessage, {
                typeToast: ToastMessageType.ERROR,
                message:
                  error.toString() || t('inboxDetail.failedToCopyTextDesc'),
              }),
            );
          },
        ),
      handleEdit,
    },
    t,
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
      onClick={(e) => e.stopPropagation()}
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
