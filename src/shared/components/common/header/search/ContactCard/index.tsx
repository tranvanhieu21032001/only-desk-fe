import { Image, Skeleton } from 'antd';
import { Fragment } from 'react';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '../../../Typography';

import * as S from './card.styled';

import icImageDefault from '@/assets/icons/common/ic-image-default.jpeg';

interface ContactCardProps {
  label: string;
  description: string;
  avatar: string;
  isLoading?: boolean;
}

function ContactCard({
  label,
  description,
  avatar,
  isLoading,
}: ContactCardProps) {
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
            </S.LabelCardWrap>

            <S.Description>
              <S.Label>
                <Skeleton.Input active style={{ height: 18 }} />
              </S.Label>
            </S.Description>
          </S.ContentCardWrap>
        </S.MessageCardContainer>
      ) : (
        <S.MessageCardContainer>
          <Image
            src={avatar}
            preview={false}
            width={40}
            height={40}
            onError={(e) => {
              e.currentTarget.src = icImageDefault;
            }}
          />

          <S.ContentCardWrap>
            <S.LabelCardWrap>
              <S.Label>
                <Typography fontWeight={fontWeight?.semiBold}>
                  {label}
                </Typography>
              </S.Label>
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

export default ContactCard;
