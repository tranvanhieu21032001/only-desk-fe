import React from 'react';
import { Image } from 'antd';
import { InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { Message } from '../../interfaces/inbox';
import { MessageBaseItem } from './MessageBaseItem';
import * as S from './InboxDetail.styles';

interface OutgoingMessageProps {
  msg: Message;
  hoveredMessageId: string | null;
  contextMenu: any;
  handleIconClick: (e: React.MouseEvent, message: Message) => void;
  setHoveredMessageId: (id: string | null) => void;
  formatTime: (date: string) => string;
  pendingImageScroll: boolean;
  setPendingImageScroll: (v: boolean) => void;
  setPendingImageLoads: React.Dispatch<React.SetStateAction<number>>;
  scrollToBottom: () => void;
  justLoadedMore: boolean;
}

export const OutgoingMessage: React.FC<OutgoingMessageProps> = ({
  msg,
  hoveredMessageId,
  contextMenu,
  handleIconClick,
  setHoveredMessageId,
  formatTime,
  pendingImageScroll,
  setPendingImageScroll,
  setPendingImageLoads,
  scrollToBottom,
  justLoadedMore,
}) => {
  const hovered = hoveredMessageId === msg.id;
  const onHoverEnter = () => setHoveredMessageId(msg.id);
  const onHoverLeave = () => {
    if (!contextMenu.visible) setHoveredMessageId(null);
  };

  // Handle image loading
  const handleImageLoad = () => {
    setPendingImageLoads((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next === 0 && !justLoadedMore) scrollToBottom();
      return next;
    });
    if (pendingImageScroll) setPendingImageScroll(false);
  };

  // Render content based on message type
  const renderContent = () => {
    switch (msg.type) {
      case InboxMessageType.Image:
        if (msg.metadata?.fileUrl) {
          return (
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              onLoad={handleImageLoad}
              preview={true}
            />
          );
        }
        return null;
      
      case InboxMessageType.Note:
        return (
          <S.NoteContainer
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            <S.NoteRow>
              <S.NoteBubbleRight>{msg.content}</S.NoteBubbleRight>
            </S.NoteRow>
            <S.NoteMeta>Admin left this private note</S.NoteMeta>
          </S.NoteContainer>
        );
      
      case InboxMessageType.Text:
      default:
        return (
          <S.MessageBubbleRight
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            {msg.content}
          </S.MessageBubbleRight>
        );
    }
  };

  return (
    <MessageBaseItem
      msg={msg}
      hoveredMessageId={hoveredMessageId}
      contextMenu={contextMenu}
      handleIconClick={handleIconClick}
      setHoveredMessageId={setHoveredMessageId}
      formatTime={formatTime}
      pendingImageScroll={pendingImageScroll}
      setPendingImageScroll={setPendingImageScroll}
      setPendingImageLoads={setPendingImageLoads}
      scrollToBottom={scrollToBottom}
      justLoadedMore={justLoadedMore}
      isIncoming={false}
    >
      {renderContent()}
    </MessageBaseItem>
  );
}; 