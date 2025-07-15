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
  const onMenuClick = (e: React.MouseEvent) => handleIconClick(e, msg);

  // Image
  if (msg.type === InboxMessageType.Image && msg.metadata?.fileUrl) {
    return (
      <S.MessageRow>
        <S.MessageAvatarWrapper>
          <S.MessageAvatar src={avatarAdmin} alt={msg.user?.firstName} />
          <S.MessageColumnView>
            <S.MessageSenderName>
              {msg.user?.firstName || 'Guest'}
            </S.MessageSenderName>
            <S.MessageImageLeft
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            >
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
            </S.MessageImageLeft>
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
  }
  // Text
  return (
    <S.MessageRow>
      <S.MessageAvatarWrapper>
        <S.MessageAvatar src={avatarAdmin} alt={msg.user?.firstName} />
        <S.MessageColumnView>
          <S.MessageSenderName>
            {msg.user?.firstName || 'Guest'}
          </S.MessageSenderName>
          <div className="" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <S.GuestMessageContainer>
              <S.MessageBubbleLeft
                onMouseEnter={onHoverEnter}
                onMouseLeave={onHoverLeave}
              >
                {msg.content}
              </S.MessageBubbleLeft>
            </S.GuestMessageContainer>
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
          </div>
        </S.MessageColumnView>
      </S.MessageAvatarWrapper>
    </S.MessageRow>
  );
};
