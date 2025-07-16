import React from 'react';
import { Image, Tooltip } from 'antd';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';

import {
  InboxMessageStatus,
  InboxMessageType,
} from '@/modules/settings/helpers/enums/inbox.enums';
import { Message } from '../../interfaces/inbox';

import * as S from './InboxDetail.styles';

import icBarColumn from '@/assets/icons/common/ic-bar-column.svg';

interface MessageBaseItemProps {
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
  children: React.ReactNode;
  isIncoming?: boolean;
  avatarAdmin?: string;
}

interface MessageTimeWithIconProps {
  hovered: boolean;
  onMenuClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  createdAt: string;
  status: InboxMessageStatus;
  formatTime: (date: string) => string;
  rightIcon?: boolean;
}

const MessageTimeWithIcon: React.FC<MessageTimeWithIconProps> = ({
  hovered,
  onMenuClick,
  onHoverEnter,
  onHoverLeave,
  createdAt,
  status,
  formatTime,
  rightIcon = false,
}) => (
  <S.TimeWithIconContainer
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {!rightIcon && (
      <S.MessageTime>
        {formatTime(createdAt)}
        {status === InboxMessageStatus.Sending && (
          <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
        )}
        {status === InboxMessageStatus.Failed && (
          <Tooltip title="Send failed">
            <CloseCircleTwoTone
              twoToneColor="#ff4d4f"
              style={{ marginLeft: 6, fontSize: 12 }}
            />
          </Tooltip>
        )}
      </S.MessageTime>
    )}
    {hovered ? (
      <S.MessageHoverIconNearTime onClick={onMenuClick}>
        <img src={icBarColumn} alt="menu" />
      </S.MessageHoverIconNearTime>
    ) : (
      <S.MessageHoverIconPlaceholder />
    )}
    {rightIcon && (
      <S.MessageTime>
        {formatTime(createdAt)}
        {status === InboxMessageStatus.Sending && (
          <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
        )}
        {status === InboxMessageStatus.Failed && (
          <Tooltip title="Send failed">
            <CloseCircleTwoTone
              twoToneColor="#ff4d4f"
              style={{ marginLeft: 6, fontSize: 12 }}
            />
          </Tooltip>
        )}
      </S.MessageTime>
    )}
  </S.TimeWithIconContainer>
);

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
  children,
  isIncoming = false,
  avatarAdmin,
}) => {
  const hovered = hoveredMessageId === msg.id;
  const onHoverEnter = () => setHoveredMessageId(msg.id);
  const onHoverLeave = () => {
    if (!contextMenu.visible) setHoveredMessageId(null);
  };
  const onMenuClick = (e: React.MouseEvent) => handleIconClick(e, msg);

  // Handle different message types
  const renderMessageContent = () => {
    switch (msg.type) {
      case InboxMessageType.Image:
        if (msg.metadata?.fileUrl) {
          return (
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              onLoad={() => {
                setPendingImageLoads((prev) => {
                  const next = Math.max(prev - 1, 0);
                  if (next === 0 && !justLoadedMore) scrollToBottom();
                  return next;
                });
                if (pendingImageScroll) setPendingImageScroll(false);
              }}
              preview={true}
            />
          );
        }
        return null;
      
      case InboxMessageType.Note:
        return (
          <S.NoteContainer>
            <S.NoteRow>
              <S.NoteBubbleRight>{msg.content}</S.NoteBubbleRight>
            </S.NoteRow>
            <S.NoteMeta>Admin left this private note</S.NoteMeta>
          </S.NoteContainer>
        );
      
      case InboxMessageType.Text:
      default:
        return children;
    }
  };

  // Render layout based on incoming/outgoing
  if (isIncoming) {
    return (
      <S.MessageRow>
        <S.MessageAvatarWrapper>
          <S.MessageAvatar src={avatarAdmin} alt={msg.user?.firstName} />
          <S.MessageColumnView>
            <S.MessageSenderName>
              {msg.user?.firstName || 'Guest'}
            </S.MessageSenderName>
            {msg.type === InboxMessageType.Image ? (
              <S.MessageImageLeft
                onMouseEnter={onHoverEnter}
                onMouseLeave={onHoverLeave}
              >
                {renderMessageContent()}
              </S.MessageImageLeft>
            ) : (
              <div className="" style={{ display: 'flex', alignItems: 'flex-end' }}>
                {renderMessageContent()}
              </div>
            )}
            <MessageTimeWithIcon
              hovered={hovered}
              onMenuClick={onMenuClick}
              onHoverEnter={onHoverEnter}
              onHoverLeave={onHoverLeave}
              createdAt={msg.createdAt}
              status={msg.status}
              formatTime={formatTime}
              rightIcon={false}
            />
          </S.MessageColumnView>
        </S.MessageAvatarWrapper>
      </S.MessageRow>
    );
  } else {
    return (
      <S.MessageRowUser>
        <S.AgentMessageContainer>
          <MessageTimeWithIcon
            hovered={hovered}
            onMenuClick={onMenuClick}
            onHoverEnter={onHoverEnter}
            onHoverLeave={onHoverLeave}
            createdAt={msg.createdAt}
            status={msg.status}
            formatTime={formatTime}
          />
          {msg.type === InboxMessageType.Image ? (
            <S.MessageImage>
              {renderMessageContent()}
            </S.MessageImage>
          ) : (
            renderMessageContent()
          )}
        </S.AgentMessageContainer>
      </S.MessageRowUser>
    );
  }
}; 