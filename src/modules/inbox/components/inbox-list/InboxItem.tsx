import { Image } from 'antd';
import * as S from './InboxList.styles';
import ProfileCard from '@/shared/components/common/ProfileCard';
import InboxListMenu from './InboxListMenu';
import { DEFAULT_FULL_NAME } from '@/core/settings/constants';
import { useEffect, useRef, useState } from 'react';
import avatarDefault from '@/assets/images/avatar-default.png';
import barColumn from '@/assets/icons/common/ic-bar-column.svg';
import { eventBus } from '@/core/event-bus';
import { Conversation } from '../../interfaces/inbox';
import { EVENTBUS_UPDATED_CONVERSATION } from '@/shared/chat-logic/constants/event-bus.constants';
import { getFormattedTime } from '@/shared/chat-logic/utils/time';
import { renderMessagePreview } from '@/shared/chat-logic/helpers/message-content.helper';

type Props = {
  conversation: any;
  activeConversationId: string | null;
  onClickConversation: () => void;
};

// Helper function to get message preview based on message type
const getMessagePreview = (latestMessage: any): string => {
  if (!latestMessage) return 'No message';

  return renderMessagePreview(
    latestMessage.content || '',
    latestMessage.type,
    50,
  );
};

const InboxItem: React.FC<Props> = ({
  conversation,
  activeConversationId,
  onClickConversation,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [localResolved, setLocalResolved] = useState<boolean>(
    conversation?.resolved,
  );

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(!activeMenu);
  };

  const handleToggleResolved = (newResolved: boolean) => {
    setLocalResolved(newResolved);
  };

  useEffect(() => {
    const handleUpdatedConversation = ({
      conversationId,
      updates,
    }: {
      conversationId: string;
      updates: Partial<Conversation>;
    }) => {
      if (
        conversationId === conversation.id &&
        updates.resolved !== undefined
      ) {
        setLocalResolved(updates.resolved);
      }
    };

    eventBus.on(
      EVENTBUS_UPDATED_CONVERSATION as any,
      handleUpdatedConversation,
    );
    return () => {
      eventBus.off(
        EVENTBUS_UPDATED_CONVERSATION as any,
        handleUpdatedConversation,
      );
    };
  }, [conversation]);

  return (
    <S.NotificationItem
      key={conversation.id}
      $active={conversation.id === activeConversationId?.toString()}
      onClick={() => onClickConversation()}
    >
      <S.Avatar>
        <ProfileCard
          contactId={conversation.contact?.id}
          avatarUrl={conversation.contact?.avatar || avatarDefault}
          name={conversation.contact?.name}
          countryCode={conversation.contact?.context?.countryCode || ''}
          hiddenInfo
        />
      </S.Avatar>
      <S.Content>
        <S.Title>{conversation.contact?.name || DEFAULT_FULL_NAME}</S.Title>
        <S.Subtitle>{getMessagePreview(conversation.latestMessage)}</S.Subtitle>
      </S.Content>
      <S.RightSection ref={menuRef}>
        <S.Time className="time">
          {getFormattedTime(conversation.lastActivityAt)}
        </S.Time>
        <S.BarIcon onClick={(e) => handleMenuClick(e)}>
          <Image src={barColumn} preview={false} />
        </S.BarIcon>
        {Number(conversation.unreadCount) > 0 && (
          <S.Badge>{conversation.unreadCount}</S.Badge>
        )}
        {activeMenu && (
          <InboxListMenu
            unreadCount={Number(conversation.unreadCount)}
            resolved={localResolved}
            onToggleResolved={handleToggleResolved}
            onCloseMenu={() => setActiveMenu(false)}
            conversationId={conversation.id}
            openMenuButtonRef={menuRef as React.RefObject<HTMLDivElement>}
          />
        )}
      </S.RightSection>
    </S.NotificationItem>
  );
};

export default InboxItem;
