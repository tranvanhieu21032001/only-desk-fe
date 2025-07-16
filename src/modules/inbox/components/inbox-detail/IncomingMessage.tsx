import React from 'react';
import { Image } from 'antd';
import { InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { Message } from '../../interfaces/inbox';
import { MessageBaseItem } from './MessageBaseItem';
import * as S from './InboxDetail.styles';

interface IncomingMessageProps {
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
  avatarAdmin: string;
  justLoadedMore: boolean;
}

export const IncomingMessage: React.FC<IncomingMessageProps> = ({
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
  avatarAdmin,
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
      
      case InboxMessageType.Text:
      default:
        return (
          <S.GuestMessageContainer>
            <S.MessageBubbleLeft
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            >
              {msg.content}
            </S.MessageBubbleLeft>
          </S.GuestMessageContainer>
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
      isIncoming={true}
      avatarAdmin={avatarAdmin}
    >
      {renderContent()}
    </MessageBaseItem>
  );
};
