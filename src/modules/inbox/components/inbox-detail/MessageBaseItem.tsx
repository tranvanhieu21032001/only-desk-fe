import React from 'react';
import { Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { MessageBaseItemProps } from '../../interfaces/inbox';
import MessageTimeWithIcon from './MessageTimeWithIcon';

import * as S from './InboxDetail.styles';

export const MessageBaseItem: React.FC<MessageBaseItemProps> = ({
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
  isOwner,
  avatarAdmin,
}) => {
  const hovered = hoveredMessageId === msg.id;
  const onHoverEnter = () => setHoveredMessageId(msg.id);
  const onHoverLeave = () => {
    if (!contextMenu.visible) setHoveredMessageId(null);
  };
  const onMenuClick = (e: React.MouseEvent) => handleIconClick(e, msg);

  // Handle image loading
  const handleImageLoad = () => {
    setPendingImageLoads((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next === 0 && justLoadedMore) scrollToBottom();
      return next;
    });
    if (pendingImageScroll) setPendingImageScroll(false);
  };

  const NoteMeta = () => <S.NoteMeta>Admin left this private note</S.NoteMeta>;

  // Common props for MessageTimeWithIcon
  const timeWithIconProps = {
    isOwner,
    hovered,
    onMenuClick,
    onHoverEnter,
    onHoverLeave,
    createdAt: msg.createdAt,
    status: msg.status,
    formatTime,
    rightIcon: isOwner,
  };

  function renderContent() {
    switch (msg.type) {
      case InboxMessageType.Text:
        return (
          <S.MessageBubbleRight
            style={{ background: isOwner ? '#e6f4ff' : '#f5f5f5', color: '#222' }}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            {msg.content}
          </S.MessageBubbleRight>
        );
      case InboxMessageType.Note:
        return (
          <S.NoteContainer
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            <S.NoteRow>
              <S.NoteBubbleRight>{msg.content}</S.NoteBubbleRight>
            </S.NoteRow>
            <NoteMeta />
          </S.NoteContainer>
        );
      case InboxMessageType.Image:
        if (!msg.metadata?.fileUrl) return null;
        return isOwner ? (
          <S.MessageImage>
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              onLoad={handleImageLoad}
              preview={true}
            />
          </S.MessageImage>
        ) : (
          <S.MessageImageLeft
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              onLoad={handleImageLoad}
              preview={true}
            />
          </S.MessageImageLeft>
        );
      case InboxMessageType.Loading:
        return (
          <S.MessageTypeLoading>
            <LoadingOutlined spin style={{ fontSize: 24, color: '#999' }} />
          </S.MessageTypeLoading>
        );
      default:
        return null;
    }
  }

  // Only show timeWithIcon if not loading
  let timeWithIcon: React.ReactNode = null;
  if (msg.type !== InboxMessageType.Loading) {
    timeWithIcon = (
      <MessageTimeWithIcon
        {...timeWithIconProps}
        style={
          msg.type === InboxMessageType.Note ? { marginTop: 4 } : undefined
        }
      />
    );
  }

  if (msg.type === InboxMessageType.Loading) {
    return <>{renderContent()}</>;
  }

  if (isOwner) {
    return (
      <S.MessageRowUser>
        <S.AgentMessageContainer>
          {timeWithIcon}
          {renderContent()}
        </S.AgentMessageContainer>
      </S.MessageRowUser>
    );
  } else {
    return (
      <S.MessageRow>
        <S.MessageAvatarWrapper>
          <S.MessageAvatar src={avatarAdmin} alt={msg.user?.firstName} />
          <S.MessageColumnView>
            <S.MessageSenderName>
              {msg.user?.firstName || 'Guest'}
            </S.MessageSenderName>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              {renderContent()}
              {timeWithIcon}
            </div>
          </S.MessageColumnView>
        </S.MessageAvatarWrapper>
      </S.MessageRow>
    );
  }
};
