import React from 'react';
import { Image } from 'antd';

import Button from '@/shared/components/common/Button';

import * as S from './Main.styles';

import arrRight from '@/assets/icons/common/ic-arr-right.svg';

const SpamChats: React.FC = () => {
  return (
    <S.SpamChatsWrapper>
      <S.SpamChatsContent>
        <S.Title>Configure your spam filter</S.Title>
        <S.Description>Spam filters help keep your inbox clean</S.Description>
        <S.SubDescription>
          OnlyChat runs spam checks on all message you receive. Messages that
          are likely spam end up here. If we made a mistake, you can still move
          a spam to your main inbox.
        </S.SubDescription>

        <S.SubDescription>
          You can tune your spam filter options so that more emails get to your
          inbox, or else more emails go to spams.
        </S.SubDescription>

        <Button
          type="primary"
          width="237px"
          icon={<Image src={arrRight} preview={false} />}
          iconPosition="right"
        >
          Configure My Spam Filter
        </Button>
      </S.SpamChatsContent>
    </S.SpamChatsWrapper>
  );
};

export default SpamChats;
