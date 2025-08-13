import React, { useRef } from 'react';
import { Image } from 'antd';

import MessageTimeWithIcon from './MessageTimeWithIcon';

import * as S from './InboxDetail.styles';
import icEye from '@/assets/icons/common/ic-eye.svg';
import ProfileCard from '@/shared/components/common/ProfileCard';
import { MessageBaseItemProps } from '@/shared/chat-logic/interfaces/inbox';
import {
  MessageSender,
  MessageType,
} from '@/shared/chat-logic/enums/chat.enums';
import { useAppSelector } from '@/shared/hooks';
import { getId } from '@/shared/utils/decode';
import { SystemAvatar } from '@/shared/components/common/ProfileCard/SystemAvatar';

export const MessageBaseItem: React.FC<MessageBaseItemProps> = ({
  msg,
  hoveredMessageId,
  contextMenu,
  handleIconClick,
  setHoveredMessageId,
}) => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const isOwner = getId(msg.user?.id) === getId(userInfo?.id);

  const selectedConversation = useAppSelector(
    (state) => state.inbox.selectedConversation,
  );

  const contactId = isOwner ? undefined : selectedConversation?.contact?.id;
  const name = msg.user?.firstName || selectedConversation?.contact?.name || '';
  const avatar = msg.user?.avatar || selectedConversation?.contact?.avatar;
  const countryCode = undefined;

  const hovered = hoveredMessageId === msg.id;
  const onHoverEnter = () => setHoveredMessageId(msg.id);
  const onHoverLeave = () => {
    if (!contextMenu.visible) setHoveredMessageId(null);
  };
  const onMenuClick = (e: React.MouseEvent) => handleIconClick(e, msg);

  // Common props for MessageTimeWithIcon
  const timeWithIconProps = {
    isOwner,
    hovered,
    onMenuClick,
    onHoverEnter,
    onHoverLeave,
    createdAt: msg.createdAt,
    status: msg.status,
    rightIcon: isOwner,
  };

  const timeWithIcon = (
    <div
      style={{
        width: 28,
        flexShrink: 0,
        opacity: msg.showTime || hovered ? 1 : 0,
        transition: 'opacity 0.2s',
        pointerEvents: msg.showTime || hovered ? 'auto' : 'none',
        display: 'flex',
        justifyContent: isOwner ? 'flex-end' : 'flex-start',
      }}
    >
      <MessageTimeWithIcon
        {...timeWithIconProps}
        style={msg.type === MessageType.NOTE ? { marginTop: 4 } : undefined}
        showTime={msg.showTime}
      />
    </div>
  );

  if (msg.type === MessageType.RESOLVED) {
    return <S.SystemMessage>{msg.content}</S.SystemMessage>;
  }

  function renderContent() {
    switch (msg.type) {
      case MessageType.TEXT:
        return (
          <S.MessageBubbleRight
            style={{
              background: isOwner ? '#e6f4ff' : '#f5f5f5',
              color: '#222',
              wordBreak: 'break-word',
            }}
          >
            {msg.content}
          </S.MessageBubbleRight>
        );
      case MessageType.INPUT:
        return (
          <S.MessageBubbleRight
            style={{
              background: isOwner ? '#e6f4ff' : '#f5f5f5',
              color: '#222',
              wordBreak: 'break-word',
            }}
          >
            {msg.content}
            {!!msg.metadata?.inputValue && (
              <S.MessageInputValue>
                {msg.metadata?.inputValue}
              </S.MessageInputValue>
            )}
          </S.MessageBubbleRight>
        );
      case MessageType.NOTE:
        return (
          <S.NoteContainer>
            <S.NoteRow>
              <S.NoteBubbleRight>{msg.content}</S.NoteBubbleRight>
            </S.NoteRow>
          </S.NoteContainer>
        );
      case MessageType.IMAGE:
        if (!msg.metadata?.fileUrl) return null;

        const hiddenImageRef = useRef<HTMLDivElement>(null);

        const handleClick = () => {
          hiddenImageRef.current?.querySelector('img')?.click();
        };

        const imageWithPreviewOverlay = (
          <Image.PreviewGroup>
            <S.ImageWrapper
              isOwner={isOwner}
              onClick={handleClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick();
              }}
            >
              <S.StyledImage
                src={msg.metadata.fileUrl}
                alt="image"
                data-id={msg.id}
                isOwner={isOwner}
              />
              <S.Overlay className="overlay">
                <S.Previewbox>
                  <Image src={icEye} preview={false} />
                  Preview
                </S.Previewbox>
              </S.Overlay>
            </S.ImageWrapper>
            <div ref={hiddenImageRef} style={{ display: 'none' }}>
              <Image src={msg.metadata.fileUrl} />
            </div>
          </Image.PreviewGroup>
        );

        if (isOwner) {
          return <S.MessageImage>{imageWithPreviewOverlay}</S.MessageImage>;
        } else {
          return (
            <S.MessageImageLeft>{imageWithPreviewOverlay}</S.MessageImageLeft>
          );
        }
      default:
        return null;
    }
  }

  const senderName =
    msg.sender == MessageSender.SYSTEM
      ? 'Only Chat'
      : msg.user?.firstName || 'Guest';
  if (isOwner) {
    return (
      <S.MessageRowUser>
        <div
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: 8,
            width: '100%',
          }}
        >
          {timeWithIcon}
          {renderContent()}
        </div>
      </S.MessageRowUser>
    );
  } else {
    return (
      <S.MessageRow>
        <S.MessageAvatarWrapper>
          {msg.showTime ? (
            msg.sender == MessageSender.SYSTEM ? (
              <SystemAvatar avatarSize={32} />
            ) : (
              <ProfileCard
                userId={msg.user?.id}
                contactId={contactId}
                name={name}
                avatarUrl={avatar}
                countryCode={countryCode}
                hiddenInfo
                avatarSize={32}
                flagSize={12}
              />
            )
          ) : (
            <div style={{ width: 32, height: 32 }} />
          )}
          <S.MessageColumnView>
            {msg.showTime && (
              <S.MessageSenderName>{senderName}</S.MessageSenderName>
            )}
            <div
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 4,
                width: '100%',
              }}
            >
              {renderContent()}
              {timeWithIcon}
            </div>
          </S.MessageColumnView>
        </S.MessageAvatarWrapper>
      </S.MessageRow>
    );
  }
};
