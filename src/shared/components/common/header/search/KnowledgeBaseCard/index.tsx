import { Fragment } from 'react';
import { Skeleton } from 'antd';

import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '../../../Typography';

import * as S from './card.styled';

interface KnowledgeBaseCardProps {
  label: string;
  isLoading?: boolean;
}

function KnowledgeBaseCard({ label, isLoading }: KnowledgeBaseCardProps) {
  return (
    <Fragment>
      {isLoading ? (
        <S.MessageCardContainer>
          <S.Label>
            <Skeleton.Input active style={{ width: 40, height: 18 }} />
          </S.Label>
        </S.MessageCardContainer>
      ) : (
        <S.MessageCardContainer>
          <S.Label>
            <Typography fontWeight={fontWeight?.semiBold}>{label}</Typography>
          </S.Label>
        </S.MessageCardContainer>
      )}
    </Fragment>
  );
}

export default KnowledgeBaseCard;
