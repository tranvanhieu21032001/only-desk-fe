import { useEffect, useState } from 'react';
import { Image, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddASection.styles';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';

import {
    createHelpdeskSection,
    updateHelpdeskSection
} from '@/modules/knowledge-base/api/knowledgebase.api';

interface ModalAddASectionProps {
    open: boolean;
    onCancel: () => void;
    onOK: () => void;
    category: {
        id: string;
        name: string;
    };
    sectionToEdit?: {
        key: string;
        name: string;
    } | null;
}

function ModalAddASection({
    open,
    onCancel,
    onOK,
    category,
    sectionToEdit = null,
}: ModalAddASectionProps) {
    const { t } = useTranslation('knowledgeBase');
    const [sectionName, setSectionName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sectionToEdit?.name) {
            setSectionName(sectionToEdit.name);
        } else {
            setSectionName('');
        }
    }, [sectionToEdit, open]);

    const handleSubmit = async () => {
        if (!sectionName.trim()) {
            message.warning(t('article-menu.add-a-section.validation.required') || 'Section name is required');
            return;
        }

        setLoading(true);
        try {
            if (sectionToEdit) {
                await updateHelpdeskSection(sectionToEdit?.id, {
                    name: sectionName,
                    defaultLanguage: 'en',
                    translations: {
                        en: { name: sectionName },
                    },
                });
            } else {
                await createHelpdeskSection({
                    name: sectionName,
                    categoryId: category.id,
                    defaultLanguage: 'en',
                    translations: {
                        en: { name: sectionName },
                    },
                });
            }

            onCancel();
            onOK();
        } catch (error) {
            message.error('Failed to save section');
        } finally {
            setLoading(false);
        }
    };

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
                            {t('article-menu.add-a-section.title') || 'Add a Section'}
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
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                            <S.FormInput>
                                {t('article-menu.add-a-section.category')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            value={category?.name}
                            disabled
                            size="large"
                            placeholder={t('article-menu.add-a-section.enter-a-name')}
                        />
                    </S.FormField>

                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                            <S.FormInput>
                                {t('article-menu.add-a-section.name-of-the-section')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            placeholder={t('article-menu.add-a-section.enter-a-name')}
                            size="large"
                            value={sectionName}
                            onChange={(e) => setSectionName(e.target.value)}
                        />
                    </S.FormField>
                </S.ModalBody>

                <S.ModalFooter>
                    <Button onClick={onCancel}>
                        {t('article-menu.add-a-section.cancel')}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        type="primary"
                        icon={sectionToEdit ? <EditOutlined /> : <PlusOutlined />}
                        loading={loading}
                    >
                        {sectionToEdit
                            ? t('article-menu.add-a-section.update')
                            : t('article-menu.add-a-section.add-section')}
                    </Button>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
}

export default ModalAddASection;
