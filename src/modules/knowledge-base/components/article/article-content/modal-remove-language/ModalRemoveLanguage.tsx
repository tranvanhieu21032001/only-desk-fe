import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalRemoveLanguage.styles';

import Input from '@/shared/components/common/Input';

import icWarning from '@/assets/icons/knowledge-base/ic-warning.svg';
import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

interface ModalRemoveLanguageProps {
    open: boolean;
    onCancel: () => void;
    onStart: () => void;
}

function ModalRemoveLanguage({
    open,
    onCancel,
    onStart,
}: ModalRemoveLanguageProps) {
    const { t } = useTranslation('knowledgeBase');

    return (
        <S.WrapModal>
            <ModalCommon
                open={open}
                onCancel={onCancel}
                showFooter={false}
                width={700}
                rootClassName="modal-confirm-export-database"
            >
                <S.ModalHeader>
                    <S.ModalHeaderContent>
                        <Typography fontWeight={fontWeight?.semiBold}>
                            {t('article-menu.remove-current-language.title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors?.newtralLight}>
                                {t('article-menu.remove-current-language.description')}
                            </Typography>
                        </S.ModalDescription>
                    </S.ModalHeaderContent>
                </S.ModalHeader>

                <S.ModalBody>
                    <S.WrapContent>
                        <Image src={icWarning} width={32} height={32} preview={false} />
                        <S.ModalHeaderContent>
                            <S.Title>
                                {t('article-menu.remove-current-language.caution')}
                            </S.Title>
                            <S.ModalDescription>
                                {t('article-menu.remove-current-language.all-knowledge-base')}
                            </S.ModalDescription>
                        </S.ModalHeaderContent>
                    </S.WrapContent>

                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium}>
                            <S.FormInput>
                                {t('article-menu.remove-current-language.confirm-language-removal')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            placeholder={t('article-menu.remove-current-language.enter-language-name')}
                            size="large"
                        />
                    </S.FormField>
                </S.ModalBody>

                <S.ModalFooter>
                    <Button onClick={onCancel}>
                        {t('article-menu.remove-current-language.cancel')}
                    </Button>
                    <Button type='danger' onClick={onCancel}>
                        {t('article-menu.remove-current-language.remove')}
                    </Button>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
}

export default ModalRemoveLanguage;
