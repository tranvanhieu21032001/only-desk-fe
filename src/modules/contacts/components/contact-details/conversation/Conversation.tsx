import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import themeColors from '@/shared/styles/themes/default/colors';
import Typography from '@/shared/components/common/Typography';
import * as S from './Conversation.styles';

import icConversation from '@/assets/icons/contact/ic-send-message.svg';
import { getSenderName } from '@/shared/chat-logic/helpers/chat.helper';
import ProfileCard, { ProfileType } from '@/shared/components/common/ProfileCard';
import defaultAvatar from '@/assets/images/avatar-default.png';
import { LastConversations } from '@/shared/interfaces/conversation.interface';
interface ConversationProps {
  isLoading?: boolean;
  conversations?: LastConversations;
}

function Conversation({ isLoading, conversations }: ConversationProps) {
  const { t } = useTranslation('contacts');
  const hasConversations = conversations && conversations.length > 0;
  const navigate = useNavigate();

  const handleCardClick = (conversationId: string) => {
    navigate(`/inbox?conversationId=${conversationId}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderWrap>
          <Image src={icConversation} width={24} height={24} preview={false} />
          <Typography variant="h5" color={themeColors?.secondaryDarker}>
            {t('contact-profile.conversation')}
          </Typography>
          {hasConversations && (
            <S.ConversationCount>
              <Typography variant="caption-small" color={themeColors?.secondary}>
                {conversations.length}
              </Typography>
            </S.ConversationCount>
          )}
        </S.HeaderWrap>
        <S.HeaderActionWrap>
          <PlusOutlined />
          <Typography variant="h5" color={themeColors?.secondaryDarker}>
            {t('contact-profile.new-conversation')}
          </Typography>
        </S.HeaderActionWrap>
      </S.Header>

      <S.Body>
        {isLoading ? (
          Array(3)?.fill(0)?.map((_, index) => (
            <S.ConversationCardWrap key={index}>
              <S.ConversationInfoWrap>
                <Skeleton.Avatar active style={{ width: '40px', height: '40px' }} />
                <S.ConversationInfo>
                  <Skeleton.Input active style={{ width: '100%', height: 18 }} />
                  <Skeleton.Input active style={{ width: '100%', height: 18, marginTop: 4 }} />
                </S.ConversationInfo>
              </S.ConversationInfoWrap>
              <Skeleton.Input active style={{ width: 50, height: 18, maxWidth: 50 }} />
            </S.ConversationCardWrap>
          ))
        ) : hasConversations ? (
          conversations?.map((conversation: any) => (
            <S.ConversationCardWrap
              key={conversation.id}
              onClick={() => handleCardClick(conversation.id)}
            >
              <S.ConversationInfoWrap>
                {!conversation?.latestMessage?.user ? <Image src={defaultAvatar} preview={false} height={40} width={40} /> : 
                  <ProfileCard
                    profileInfo={{
                      id: conversation?.latestMessage?.user?.id,
                      type: ProfileType.USER,
                      name: conversation?.latestMessage?.user?.firstName,
                      email: conversation?.latestMessage?.user?.email,
                      avatar: conversation?.latestMessage?.user?.avatar,
                    }}
                  />
                }
                <S.ConversationInfo>
                  <Typography color={themeColors?.secondaryDark}>
                    {getSenderName(conversation?.latestMessage)}
                  </Typography>
                  <Typography margin="4px 0 0 0" color={themeColors?.newtralLight}>
                    {conversation.latestMessage.content}
                  </Typography>
                </S.ConversationInfo>
              </S.ConversationInfoWrap>
              <Typography color={themeColors?.newtralLight}>
                {format(conversation.latestMessage.createdAt)}
              </Typography>
            </S.ConversationCardWrap>
          ))
        ) : (
          <Typography color={themeColors?.newtralLight} textAlign='center' margin="20px 0">
            {t('contact-profile.no-conversations')}
          </Typography>
        )}
      </S.Body>
    </S.Container>
  );
}

export default Conversation;