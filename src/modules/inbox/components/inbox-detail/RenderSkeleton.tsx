import React from 'react';
import { Skeleton } from 'antd';
import * as S from './InboxDetail.styles';

interface RenderSkeletonProps {
  count?: number;
}

const RenderSkeleton: React.FC<RenderSkeletonProps> = ({ count = 12 }) => (
  <>
    {[...Array(count)].map((_, i) =>
      i % 2 === 1 ? (
        <S.MessageRowUser key={i}>
          <S.MessageBubbleRight>
            <Skeleton.Input active size="small" style={{ width: 180 }} />
          </S.MessageBubbleRight>
          <S.MessageAvatarWrapper style={{ marginLeft: 8 }}>
            <Skeleton.Avatar active size={40} />
          </S.MessageAvatarWrapper>
        </S.MessageRowUser>
      ) : (
        <S.MessageRow key={i}>
          <S.MessageAvatarWrapper>
            <Skeleton.Avatar active size={40} />
          </S.MessageAvatarWrapper>
          <S.MessageBubbleLeft>
            <Skeleton.Input active size="small" style={{ width: 150 }} />
          </S.MessageBubbleLeft>
        </S.MessageRow>
      ),
    )}
  </>
);

export default RenderSkeleton; 