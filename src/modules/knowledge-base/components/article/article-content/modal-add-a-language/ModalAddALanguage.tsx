import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddALanguage.styles';

import { PlusOutlined } from '@ant-design/icons';
import { OptionsInterface } from '@/core/model/common';
import { langOptions } from '@/modules/auth/helpers/data/signIn';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

interface ModalAddALanguageProps {
    open: boolean;
    onCancel: () => void;
    onOK: () => void;
}

function ModalAddALanguage({
    open,
    onCancel,
    onOK,
}: ModalAddALanguageProps) {
    const { t } = useTranslation('knowledgeBase');

    return (
        <S.WrapModal>
            <ModalCommon
                open={open}
                onCancel={onCancel}
                showFooter={false}
                width={700}
                rootClassName="modal-add-a-language"
            >
                <S.ModalHeader>
                    <S.ModalHeaderContent>
                        <Typography fontWeight={fontWeight?.semiBold}>
                            {t('article-menu.add-a-language.add-language-title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors?.newtralLight}>
                                {t('article-menu.add-a-language.add-language-description')}
                            </Typography>
                        </S.ModalDescription>
                    </S.ModalHeaderContent>
                </S.ModalHeader>
                <S.ModalBody>
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium}>
                            <S.FormInput>
                                {t('article-menu.add-a-language.language')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>

                        <S.ChangeLang
                            defaultValue={langOptions?.[0]?.value}
                            popupClassName="auth-lang"
                        >
                            {langOptions?.map((lang: OptionsInterface) => (
                                <S.LangOption key={lang?.key}>
                                    <Image src={lang?.flag as string} preview={false} />
                                    <Typography>
                                        {t(`article-menu.language.${lang?.label}`)}
                                    </Typography>
                                </S.LangOption>
                            ))}
                        </S.ChangeLang>

                    </S.FormField>
                </S.ModalBody>
                <S.ModalFooter>
                    <Button onClick={onCancel}>
                        {t('article-menu.add-a-language.cancel')}
                    </Button>
                    <Button onClick={onOK} type="primary" icon={<PlusOutlined />}>
                        {t('article-menu.add-a-language.add-language')}
                    </Button>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
}

export default ModalAddALanguage;
