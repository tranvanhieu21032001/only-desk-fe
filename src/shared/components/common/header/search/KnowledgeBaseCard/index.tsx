import { Fragment } from 'react';
import { Skeleton } from 'antd';

import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Typography from '../../../Typography';

import * as S from './card.styled';
import { HelpdeskArticle } from '@/modules/knowledge-base/interface';

interface KnowledgeBaseCardProps {
  data: HelpdeskArticle;
  isLoading?: boolean;
  onCloseTab?: () => void;
}

function KnowledgeBaseCard({ data, isLoading, onCloseTab }: KnowledgeBaseCardProps) {
  const handleClick = () => {
     if (data?.url) {
      onCloseTab?.();
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <S.MessageCardContainer>
          <S.Label>
            <Skeleton.Input active style={{ width: 40, height: 18 }} />
          </S.Label>
        </S.MessageCardContainer>
      ) : (
        <S.MessageCardContainer
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <S.Label>
            <Typography fontWeight={fontWeight?.semiBold}>
              {data?.title}
            </Typography>
          </S.Label>
        </S.MessageCardContainer>
      )}
    </Fragment>
  );
}

export default KnowledgeBaseCard;
