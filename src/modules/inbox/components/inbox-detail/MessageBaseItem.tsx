import React from 'react';
import { Image } from 'antd';

import MessageTimeWithIcon from './MessageTimeWithIcon';

import * as S from './InboxDetail.styles';
import ProfileCard from '@/shared/components/common/ProfileCard';
import { MessageBaseItemProps } from '@/shared/chat-logic/interfaces/inbox';
import { MessageType } from '@/shared/chat-logic/enums/chat.enums';
import { useAppSelector } from '@/shared/hooks';
import { getId } from '@/shared/utils/decode';

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

  function renderContent() {
    switch (msg.type) {
      case MessageType.TEXT:
        return (
          <S.MessageBubbleRight
            style={{
              background: isOwner ? '#e6f4ff' : '#f5f5f5',
              color: '#222',
            }}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            {msg.content}
          </S.MessageBubbleRight>
        );
      case MessageType.NOTE:
        return (
          <S.NoteContainer
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
          >
            <S.NoteRow>
              <S.NoteBubbleRight>{msg.content}</S.NoteBubbleRight>
            </S.NoteRow>
            {/* <S.NoteMeta>Admin left this private note</S.NoteMeta> */}
          </S.NoteContainer>
        );
      case MessageType.IMAGE:
        if (!msg.metadata?.fileUrl) return null;
        return isOwner ? (
          <S.MessageImage>
            <Image
              src={msg.metadata.fileUrl}
              alt="image"
              data-id={msg.id}
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
              preview={true}
              data-id={msg.id}
            />
          </S.MessageImageLeft>
        );
      default:
        return null;
    }
  }

  if (msg.type === MessageType.RESOLVED) {
    return <S.SystemMessage>{msg.content}</S.SystemMessage>;
  }
  // Only show timeWithIcon if not loading
  let timeWithIcon: React.ReactNode = <div />;
  timeWithIcon = (
    <MessageTimeWithIcon
      {...timeWithIconProps}
      style={msg.type === MessageType.NOTE ? { marginTop: 4 } : undefined}
      showTime={msg.showTime}
    />
  );

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
          {msg.showTime ? (
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
          ) : (
            <div style={{ width: 32, height: 32 }} />
          )}

          {/* <S.MessageAvatar src={avatarAdmin} alt={msg.user?.firstName} /> */}
          <S.MessageColumnView>
            {msg.showTime && (
              <S.MessageSenderName>
                {msg.user?.firstName || 'Guest'}
              </S.MessageSenderName>
            )}
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
