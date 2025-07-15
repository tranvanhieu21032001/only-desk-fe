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

  const isAgentMessage = contextMenu.message.sender === InboxSender.Agent;
  const isImageMessage =
    contextMenu.message.type === InboxMessageType.Image;

  if (isImageMessage) {
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
        <S.ContextMenuItem onClick={handleReply}>
          <img src={iconReply} alt="Reply" />
          {t('inboxDetail.reply')}
        </S.ContextMenuItem>
        <S.ContextMenuSeparator />
        <S.ContextMenuItem onClick={handleDeleteMessage} danger>
          <img src={iconDelete} alt="Delete" />
          {t('inboxDetail.delete')}
        </S.ContextMenuItem>
      </S.ContextMenu>
    );
  }

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
      <S.ContextMenuItem
        style={{ borderBottom: '1px solid #eee' }}
        onClick={handleReply}
      >
        <img src={iconReply} alt="Reply" />
        {t('inboxDetail.reply')}
      </S.ContextMenuItem>

      {!isImageMessage && (
        <S.ContextMenuItem onClick={handleCopyText}>
          <img src={iconCopy} alt="Copy" />
          {t('inboxDetail.copyText')}
        </S.ContextMenuItem>
      )}

      {isAgentMessage && (
        <>
          {!isImageMessage && (
            <S.ContextMenuItem onClick={handleEdit}>
              <img src={iconEdit} alt="Edit" />
              {t('inboxDetail.edit')}
            </S.ContextMenuItem>
          )}
          <S.ContextMenuSeparator />
          <S.ContextMenuItem onClick={handleDeleteMessage} danger>
            <img src={iconDelete} alt="Delete" />
            {t('inboxDetail.delete')}
          </S.ContextMenuItem>
        </>
      )}
    </S.ContextMenu>
  );
};

export default ContextMenu; 