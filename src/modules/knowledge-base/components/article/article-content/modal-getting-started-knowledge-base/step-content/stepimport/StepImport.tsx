import React from 'react';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import * as S from './StepImport.styles';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

import icAdd from '@/assets/icons/knowledge-base/ic-add.svg';
import icUpload from '@/assets/icons/knowledge-base/ic-upload.svg';

const StepImport = () => {
    const { t } = useTranslation('knowledgeBase');

    return (
        <>
            <Typography fontWeight={fontWeight.semiBold}>
                {t('article-menu.getting-started-knowledge.import-title')}
            </Typography>

            <S.ModalDescription>
                <Typography color={themeColors.newtralLight}>
                    {t('article-menu.getting-started-knowledge.import-description')}
                </Typography>
            </S.ModalDescription>

            <S.CreateContainer>
                <Image src={icAdd} width={24} height={24} preview={false} />
                <Typography color={themeColors.primary} fontWeight={fontWeight.semiBold}>
                    {t('article-menu.getting-started-knowledge.create-my-first-article')}
                </Typography>
                <S.CreateButton>
                    {t('article-menu.getting-started-knowledge.create')}
                </S.CreateButton>
            </S.CreateContainer>

            <S.OrDivider>
                {t('article-menu.getting-started-knowledge.or')}
            </S.OrDivider>

            <S.CreateContainer>
                <Image src={icUpload} width={24} height={24} preview={false} />
                <Typography color={themeColors.primary} fontWeight={fontWeight.semiBold}>
                    {t('article-menu.getting-started-knowledge.import-from-a')}
                </Typography>
                <S.CreateButton>
                    {t('article-menu.getting-started-knowledge.browse-file')}
                </S.CreateButton>
            </S.CreateContainer>
        </>
    );
};

export default StepImport;
