import { Image, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddASection.styles';

import { PlusOutlined } from '@ant-design/icons';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';
interface ModalAddASectionProps {
    open: boolean;
    onCancel: () => void;
    onOK: () => void;
}

function ModalAddASection({
    open,
    onCancel,
    onOK,
}: ModalAddASectionProps) {
    const { t } = useTranslation('knowledgeBase');

    return (
        <S.WrapModal>
            <ModalCommon
                open={open}
                onCancel={onCancel}
                showFooter={false}
                width={700}
                rootClassName="modal-add-a-section"
            >
                <S.ModalHeader>
                    <S.ModalHeaderContent>
                        <Typography fontWeight={fontWeight?.semiBold}>
                            {t('article-menu.add-a-section.title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors?.newtralLight}>
                                {t('article-menu.add-a-section.description')}
                            </Typography>
                        </S.ModalDescription>
                    </S.ModalHeaderContent>
                </S.ModalHeader>
                <S.ModalBody>
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding='0 0 8px 0'>
                            <S.FormInput>
                                {t('article-menu.add-a-section.category')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            value="Cosmetic"
                            disabled
                            color={themeColors?.primary}
                            placeholder={t('article-menu.add-a-section.enter-a-name')}
                            size="large"
                        />
                    </S.FormField>

                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding='0 0 8px 0'>
                            <S.FormInput>
                                {t('article-menu.add-a-section.name-of-the-section')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            placeholder={t('article-menu.add-a-section.enter-a-name')}
                            size="large"
                        />
                    </S.FormField>
                </S.ModalBody>
                <S.ModalFooter>
                    <Button onClick={onCancel}>
                        {t('article-menu.add-a-section.cancel')}
                    </Button>
                    <Button onClick={onOK} type="primary" icon={<PlusOutlined />}>
                        {t('article-menu.add-a-section.add-section')}
                    </Button>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
}

export default ModalAddASection;
