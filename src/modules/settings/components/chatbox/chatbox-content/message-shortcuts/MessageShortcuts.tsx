import React, { useState } from 'react';
import { Image } from 'antd';

import Button from '@/shared/components/common/Button';
import AddShortcutModal from './AddShortcutModal';

import * as S from './MessageShortcuts.styles';

import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';
import EmptyShortcut from '@/assets/images/settings/img-empty-shortcuts.png';
import addHeader from '@/assets/icons/common/ic-add-header.svg';

const MessageShortcuts: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>Message shortcuts</S.Title>
        </S.Header>
        <S.ContentWrapper>
          <S.SubHeader>
            <S.SubHeaderText>Manage all shortcut</S.SubHeaderText>
            <Button
              type="primary"
              width="auto"
              icon={
                <Image src={addHeader} preview={false} width={20} height={20} />
              }
              iconPosition="left"
              onClick={() => setOpenModal(true)}
            >
              Add A New Shortcut
            </Button>
          </S.SubHeader>
          <S.EmptyContent>
            <S.EmptyImage src={EmptyShortcut} alt="No shortcuts" />
            <S.EmptyTitle>You have no shortcut</S.EmptyTitle>
            <S.EmptyDesc>Your shortcuts will appear here.</S.EmptyDesc>
          </S.EmptyContent>
        </S.ContentWrapper>
        <AddShortcutModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onSubmit={() => setOpenModal(false)}
        />
      </S.Container>

      <S.DiffrentContainer>
        <div></div>
        <S.AutoSaveIndicator>
          <img src={iconTickCircle} alt="auto-save" />
          <p>Automatically saved</p>
        </S.AutoSaveIndicator>
      </S.DiffrentContainer>
    </>
  );
};

export default MessageShortcuts;
