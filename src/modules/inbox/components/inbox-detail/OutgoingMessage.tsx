import React from 'react';
import { Image, Tooltip } from 'antd';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import * as S from './InboxDetail.styles';
import { InboxMessageStatus, InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { Message } from '../../interfaces/inbox';
import icBarColumn from '@/assets/icons/common/ic-bar-column.svg';

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

interface MessageTimeWithIconProps {
  hovered: boolean;
  onMenuClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  createdAt: string;
  status: InboxMessageStatus;
  formatTime: (date: string) => string;
}

const MessageTimeWithIcon: React.FC<MessageTimeWithIconProps> = ({
  hovered,
  onMenuClick,
  onHoverEnter,
  onHoverLeave,
  createdAt,
  status,
  formatTime,
}) => (
  <S.TimeWithIconContainer
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {hovered ? (
      <S.MessageHoverIconNearTime onClick={onMenuClick}>
        <img src={icBarColumn} alt="menu" />
      </S.MessageHoverIconNearTime>
    ) : (
      <S.MessageHoverIconPlaceholder />
    )}
    <S.MessageTime>
      {formatTime(createdAt)}
      {status === InboxMessageStatus.Sending && (
        <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
      )}
      {status === InboxMessageStatus.Failed && (
        <Tooltip title="Send failed">
          <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginLeft: 6, fontSize: 12 }} />
        </Tooltip>
      )}
    </S.MessageTime>
  </S.TimeWithIconContainer>
);

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
  const onHoverLeave = () => { if (!contextMenu.visible) setHoveredMessageId(null); };
  const onMenuClick = (e: React.MouseEvent) => handleIconClick(e, msg);

  // Image
  if (msg.type === InboxMessageType.Image && msg.metadata?.fileUrl) {
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
          <S.MessageImage>
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              preview={true}
              onLoad={() => {
                setPendingImageLoads(prev => {
                  const next = Math.max(prev - 1, 0);
                  if (next === 0 && !justLoadedMore) scrollToBottom();
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
  // Note
  if (msg.type === InboxMessageType.Note) {
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
          <S.NoteContainer>
            <S.NoteRow>
              <S.NoteBubbleRight>{msg.content}</S.NoteBubbleRight>
            </S.NoteRow>
            <S.NoteMeta>Admin left this private note</S.NoteMeta>
          </S.NoteContainer>
        </S.AgentMessageContainer>
      </S.MessageRowUser>
    );
  }
  // Text
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
        <S.MessageBubbleRight
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
        >
          {msg.content}
        </S.MessageBubbleRight>
      </S.AgentMessageContainer>
    </S.MessageRowUser>
  );
}; 