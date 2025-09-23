import { Skeleton } from 'antd';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '../../../Typography';

import * as S from './message-card.styled';
import { SearchMessageProps } from '@/modules/inbox/store/features/message';
import { formatTime } from '@/shared/chat-logic/utils/time';
import { renderMessageContent } from '@/shared/chat-logic/helpers/message-content.helper';
import { getSenderName } from '@/shared/chat-logic/helpers/chat.helper';
import { SystemAvatar } from '../../../ProfileCard/SystemAvatar';
import ProfileCard, { ProfileType } from '../../../ProfileCard';
import { MessageSender } from '@/shared/chat-logic';

interface MessageCardProps {
  data: SearchMessageProps;
  isLoading?: boolean;
  onCloseTab?: () => void;
}

function MessageCard({ data, isLoading, onCloseTab }: MessageCardProps) {
  const navigate = useNavigate();
console.log("data", data);

  const handleClick = () => {
    navigate(`/inbox?conversationId=${data.conversationId}`);
    onCloseTab?.();
  };

  return (
    <Fragment>
      {isLoading ? (
        <S.MessageCardContainer>
          <Skeleton.Image active style={{ width: 38, height: 38 }} />
          <S.ContentCardWrap>
            <S.LabelCardWrap>
              <S.Label>
                <Skeleton.Input
                  active
                  style={{ minWidth: 80, maxWidth: 80, height: 18 }}
                />
              </S.Label>
              <S.Label>
                <Skeleton.Input
                  active
                  style={{ minWidth: 60, width: 30, height: 18 }}
                />
              </S.Label>
            </S.LabelCardWrap>
            <S.Description>
              <S.Label>
                <Skeleton.Input active style={{ width: 40, height: 18 }} />
              </S.Label>
            </S.Description>
          </S.ContentCardWrap>
        </S.MessageCardContainer>
      ) : (
        <S.MessageCardContainer
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          {data?.sender == MessageSender.SYSTEM ? (
              <SystemAvatar avatarSize={32} />
            ) : (
              <ProfileCard
                profileInfo={{
                  id: data?.user?.id || '',
                  type: data?.user?.id ? ProfileType.CONTACT : ProfileType.USER,
                  name: data?.user?.firstName,
                  avatar: data?.user?.avatar,
                }}
                avatarSize={32}
                flagSize={12}
              />
            )}

          <S.ContentCardWrap>
            <S.LabelCardWrap>
              <S.Label>
                <Typography fontWeight={fontWeight?.semiBold}>
                  {getSenderName(data)}
                </Typography>
              </S.Label>
              <S.Time>
                <Typography
                  color={themeColors?.newtralLight}
                  variant="caption-small"
                >
                  {formatTime(data?.createdAt)}
                </Typography>
              </S.Time>
            </S.LabelCardWrap>

            <S.Description>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
              >
                {renderMessageContent(data?.content)}
              </Typography>
            </S.Description>
          </S.ContentCardWrap>
        </S.MessageCardContainer>
      )}
    </Fragment>
  );
}

export default MessageCard;
