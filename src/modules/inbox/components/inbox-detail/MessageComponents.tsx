import React from 'react';
import { Image, Tooltip } from 'antd';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import * as S from './InboxDetail.styles';
import { InboxMessageStatus, InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { Message } from '../../interfaces/inbox';

import icBarColumn from '@/assets/icons/common/ic-bar-column.svg';

interface ContextMenu {
  x: number;
  y: number;
  visible: boolean;
  message: Message | null;
  messageId?: string;
}

interface MessageComponentProps {
  msg: Message;
  hoveredMessageId: string | null;
  contextMenu: ContextMenu;
  handleIconClick: (e: React.MouseEvent, msg: Message) => void;
  setHoveredMessageId: (id: string | null) => void;
  formatTime: (date: string) => string;
  pendingImageScroll: boolean;
  setPendingImageScroll: (val: boolean) => void;
  setPendingImageLoads: (fn: (prev: number) => number) => void;
  scrollToBottom: () => void;
  avatarAdmin: string;
}

export const AgentMessage: React.FC<MessageComponentProps> = ({
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
}) => {
  if (msg.type === InboxMessageType.Image && msg.metadata?.fileUrl) {
    return (
      <S.MessageRowUser>
        <S.AgentMessageContainer>
          <S.TimeWithIconContainer
            onMouseEnter={() => setHoveredMessageId(msg.id)}
            onMouseLeave={() => {
              if (!contextMenu.visible) setHoveredMessageId(null);
            }}
          >
            {hoveredMessageId === msg.id ? (
              <S.MessageHoverIconNearTime onClick={e => handleIconClick(e, msg)}>
                <img src={icBarColumn} alt="menu" />
              </S.MessageHoverIconNearTime>
            ) : (
              <S.MessageHoverIconPlaceholder />
            )}
            <S.MessageTime>
              {formatTime(msg.createdAt)}
              {msg.status === InboxMessageStatus.Sending && (
                <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
              )}
              {msg.status === InboxMessageStatus.Failed && (
                <Tooltip title="Send failed">
                  <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginLeft: 6, fontSize: 12 }} />
                </Tooltip>
              )}
            </S.MessageTime>
          </S.TimeWithIconContainer>
          <S.MessageImage
            onMouseEnter={() => setHoveredMessageId(msg.id)}
            onMouseLeave={() => {
              if (!contextMenu.visible) setHoveredMessageId(null);
            }}
          >
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              preview={true}
              onLoad={() => {
                setPendingImageLoads(prev => {
                  const next = Math.max(prev - 1, 0);
                  if (next === 0) scrollToBottom();
                  return next;
                });
                if (pendingImageScroll) setPendingImageScroll(false);
              }}
            />
          </S.MessageImage>
        </S.AgentMessageContainer>
      </S.MessageRowUser>
    );
  }
  if (msg.type === InboxMessageType.Note) {
    return (
      <S.MessageRowUser>
        <S.NoteContainer>
          <S.NoteRow>
            <S.TimeWithIconContainer
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => {
                if (!contextMenu.visible) setHoveredMessageId(null);
              }}
            >
              {hoveredMessageId === msg.id ? (
                <S.MessageHoverIconNearTime onClick={e => handleIconClick(e, msg)}>
                  <img src={icBarColumn} alt="menu" />
                </S.MessageHoverIconNearTime>
              ) : (
                <S.MessageHoverIconPlaceholder />
              )}
              <S.MessageTime>
                {formatTime(msg.createdAt)}
                {msg.status === InboxMessageStatus.Sending && (
                  <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
                )}
                {msg.status === InboxMessageStatus.Failed && (
                  <Tooltip title="Send failed">
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginLeft: 6, fontSize: 12 }} />
                  </Tooltip>
                )}
              </S.MessageTime>
            </S.TimeWithIconContainer>
            <S.NoteBubbleRight
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => {
                if (!contextMenu.visible) setHoveredMessageId(null);
              }}
            >
              {msg.content}
            </S.NoteBubbleRight>
          </S.NoteRow>
          <S.NoteMeta>Admin left this private note</S.NoteMeta>
        </S.NoteContainer>
      </S.MessageRowUser>
    );
  }
  return (
    <S.MessageRowUser>
      <S.AgentMessageContainer>
        <S.TimeWithIconContainer
          onMouseEnter={() => setHoveredMessageId(msg.id)}
          onMouseLeave={() => {
            if (!contextMenu.visible) setHoveredMessageId(null);
          }}
        >
          {hoveredMessageId === msg.id ? (
            <S.MessageHoverIconNearTime onClick={e => handleIconClick(e, msg)}>
              <img src={icBarColumn} alt="menu" />
            </S.MessageHoverIconNearTime>
          ) : (
            <S.MessageHoverIconPlaceholder />
          )}
          <S.MessageTime>
            {formatTime(msg.createdAt)}
            {msg.status === InboxMessageStatus.Sending && (
              <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
            )}
            {msg.status === InboxMessageStatus.Failed && (
              <Tooltip title="Send failed">
                <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginLeft: 6, fontSize: 12 }} />
              </Tooltip>
            )}
          </S.MessageTime>
        </S.TimeWithIconContainer>
        <S.MessageBubbleRight
          onMouseEnter={() => setHoveredMessageId(msg.id)}
          onMouseLeave={() => {
            if (!contextMenu.visible) setHoveredMessageId(null);
          }}
        >
          {msg.content}
        </S.MessageBubbleRight>
      </S.AgentMessageContainer>
    </S.MessageRowUser>
  );
};

export const GuestMessage: React.FC<MessageComponentProps> = ({
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
}) => {
  return (
    <S.MessageRow>
      <S.MessageAvatarWrapper>
        <S.MessageAvatar src={avatarAdmin} alt={msg.user?.firstName} />
        <S.MessageColumnView>
          <S.MessageSenderName>{msg.user?.firstName || 'Guest'}</S.MessageSenderName>
          {msg.type === InboxMessageType.Image && msg.metadata?.fileUrl ? (
            <S.MessageImageLeft
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => {
                if (!contextMenu.visible) setHoveredMessageId(null);
              }}
            >
              <Image
                src={msg.metadata.fileUrl}
                alt="image"
                onLoad={() => {
                  setPendingImageLoads(prev => {
                    const next = Math.max(prev - 1, 0);
                    if (next === 0) scrollToBottom();
                    return next;
                  });
                  if (pendingImageScroll) setPendingImageScroll(false);
                }}
                preview={true}
              />
            </S.MessageImageLeft>
          ) : (
            <S.GuestMessageContainer>
              <S.MessageBubbleLeft
                onMouseEnter={() => setHoveredMessageId(msg.id)}
                onMouseLeave={() => {
                  if (!contextMenu.visible) setHoveredMessageId(null);
                }}
              >
                {msg.content}
              </S.MessageBubbleLeft>
            </S.GuestMessageContainer>
          )}
        </S.MessageColumnView>
      </S.MessageAvatarWrapper>
      <S.TimeWithIconContainer
        onMouseEnter={() => setHoveredMessageId(msg.id)}
        onMouseLeave={() => {
          if (!contextMenu.visible) setHoveredMessageId(null);
        }}
      >
        <S.MessageTime>
          {formatTime(msg.createdAt)}
          {msg.status === InboxMessageStatus.Sending && (
            <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
          )}
          {msg.status === InboxMessageStatus.Failed && (
            <Tooltip title="Send failed">
              <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginLeft: 6, fontSize: 12 }} />
            </Tooltip>
          )}
        </S.MessageTime>
        {hoveredMessageId === msg.id ? (
          <S.MessageHoverIconNearTime onClick={e => handleIconClick(e, msg)}>
            <img src={icBarColumn} alt="menu" />
          </S.MessageHoverIconNearTime>
        ) : (
          <S.MessageHoverIconPlaceholder />
        )}
      </S.TimeWithIconContainer>
    </S.MessageRow>
  );
} 