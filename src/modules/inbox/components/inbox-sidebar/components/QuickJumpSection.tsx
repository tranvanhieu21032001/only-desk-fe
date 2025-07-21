import React from 'react';
import { Image } from 'antd';

import Collapse from '@/shared/components/common/Collapse';

import image from '@/assets/icons/common/ic-image.svg';
import message from '@/assets/icons/common/ic-message-info.svg';
import arrDown from '@/assets/icons/common/ic-arrow-down.svg';

import * as S from '../InboxSidebar.styles';

interface QuickJumpSectionProps {
  t: (key: string) => string;
  openCollapse: boolean;
  openQuickJump: {
    image: boolean;
    conversation: boolean;
  };
  setOpenQuickJump: React.Dispatch<
    React.SetStateAction<{
      image: boolean;
      conversation: boolean;
    }>
  >;
}

const QuickJumpSection: React.FC<QuickJumpSectionProps> = ({
  t,
  openCollapse,
  openQuickJump,
  setOpenQuickJump,
}) => {
  return (
    <Collapse title={t('inboxSidebar.quickJump')}>
      {openCollapse && (
        <S.SectionContent>
          {/* Shared image files */}
          <S.Field
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() =>
              setOpenQuickJump((prev) => ({ ...prev, image: !prev.image }))
            }
          >
            <Image src={image} preview={false} />{' '}
            {t('inboxSidebar.sharedImageFiles')}
            <img
              src={arrDown}
              alt="toggle"
              style={{
                marginLeft: 'auto',
                transform: openQuickJump.image
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </S.Field>
          {openQuickJump.image && (
            <S.QuickJumpDropdownText>No images were shared.</S.QuickJumpDropdownText>
          )}

          {/* Other conversation */}
          <S.Field
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() =>
              setOpenQuickJump((prev) => ({
                ...prev,
                conversation: !prev.conversation,
              }))
            }
          >
            <Image src={message} preview={false} />{' '}
            {t('inboxSidebar.otherConversation')}
            <img
              src={arrDown}
              alt="toggle"
              style={{
                marginLeft: 'auto',
                transform: openQuickJump.conversation
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </S.Field>
          {openQuickJump.conversation && (
            <S.QuickJumpDropdownText>No images were shared.</S.QuickJumpDropdownText>
          )}
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default QuickJumpSection;
