import { Image, Skeleton } from 'antd';
import { Fragment } from 'react';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '../../../Typography';

import * as S from './message-card.styled';

interface MessageProps {
  label: string;
  time: string;
  description: string;
  avatar: string;
  isLoading?: boolean;
}

function MessageCard({
  label,
  time,
  description,
  avatar,
  isLoading,
}: MessageProps) {
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
        <S.MessageCardContainer>
          <Image src={avatar} preview={false} width={40} height={40} />

          <S.ContentCardWrap>
            <S.LabelCardWrap>
              <S.Label>
                <Typography fontWeight={fontWeight?.semiBold}>
                  {label}
                </Typography>
              </S.Label>
              <S.Time>
                <Typography
                  color={themeColors?.newtralLight}
                  variant="caption-small"
                >
                  {time}
                </Typography>
              </S.Time>
            </S.LabelCardWrap>

            <S.Description>
              <Typography
                color={themeColors?.newtralLight}
                variant="caption-small"
              >
                {description}
              </Typography>
            </S.Description>
          </S.ContentCardWrap>
        </S.MessageCardContainer>
      )}
    </Fragment>
  );
}

export default MessageCard;
