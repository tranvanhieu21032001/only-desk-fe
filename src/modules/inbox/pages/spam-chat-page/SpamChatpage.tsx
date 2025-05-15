import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import Button from '@/shared/components/common/Button';

import * as S from './SpamChatPage.styles';

import arrRight from '@/assets/icons/common/ic-arr-right.svg';

const SpamChatPage: React.FC = () => {
    const { t } = useTranslation('inbox');

    return (
        <S.SpamChatsWrapper>
            <S.SpamChatsContent>
                <S.Title>{t('spam.configureSpamFilter')}</S.Title>
                <S.Description>{t('spam.spamFilterDesc')}</S.Description>
                <S.SubDescription>{t('spam.subDesc1')}</S.SubDescription>

                <S.SubDescription>{t('spam.subDesc2')}</S.SubDescription>

                <Button
                    type="primary"
                    width="237px"
                    icon={<Image src={arrRight} preview={false} />}
                    iconPosition="right"
                >
                    {t('spam.configureMySpamFilter')}
                </Button>
            </S.SpamChatsContent>
        </S.SpamChatsWrapper>
    );
};

export default SpamChatPage;
