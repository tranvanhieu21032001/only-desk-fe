import { useState } from 'react';
import { Image, Input, message, Progress } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddNewCategory.styles';

import { langOptions } from '@/modules/auth/helpers/data/signIn';
import { OptionsInterface } from '@/core/model/common';
import { createHelpdeskCategory } from '@/modules/knowledge-base/api/knowledgebase.api';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';
import icImage from '@/assets/icons/knowledge-base/ic-image.svg';

import { handleUploadImage } from '@/shared/components/common/Upload/api/upload';

interface ModalAddNewCategoryProps {
    open: boolean;
    onCancel: () => void;
    onOK: () => void;
     onAddCategory?: (category: { id: string; name: string }) => void;
}

const ModalAddNewCategory = ({
    open,
    onCancel,
    onOK,
    onAddCategory,
}: ModalAddNewCategoryProps) => {
    const { t } = useTranslation('knowledgeBase');

    const [language, setLanguage] = useState(langOptions[0]?.value);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState({
        isLoading: false,
        countUpload: 0,
        progressPercent: 0,
    });

    const handleAddCategory = async () => {
        if (!name.trim()) {
            message.warning(t('article-menu.add-a-category.fill-name-fields'));
            return;
        }

        const slug = name.trim().toLowerCase().replace(/\s+/g, '-');

        const payload = {
            name,
            desc,
            slug,
            image: uploadedImageUrl,
            translations: {
                [language]: {
                    name,
                    desc,
                },
            },
            defaultLanguage: language,
        };

        try {
            const created = await createHelpdeskCategory(payload);

            // Truyền { id, name } nếu có onAddCategory
            if (onAddCategory && created?.id) {
                onAddCategory({ id: created.id, name: name });
            }

            onOK();
        } catch {
            message.error(t('article-menu.add-a-category.error'));
        }
    };


    return (
        <S.WrapModal>
            <ModalCommon
                open={open}
                onCancel={onCancel}
                showFooter={false}
                width={700}
                rootClassName="modal-add-a-category"
            >
                <S.ModalHeader>
                    <S.ModalHeaderContent>
                        <Typography fontWeight={fontWeight.semiBold}>
                            {t('article-menu.add-a-category.title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors.newtralLight}>
                                {t('article-menu.add-a-category.description')}
                            </Typography>
                        </S.ModalDescription>
                    </S.ModalHeaderContent>
                </S.ModalHeader>

                <S.ModalBody>
                    {/* Language */}
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px">
                            <S.FormInput>
                                {t('article-menu.add-a-category.language')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>

                        <S.ChangeLang
                            defaultValue={language}
                            onChange={setLanguage}
                            popupClassName="auth-lang"
                        >
                            {langOptions.map((lang: OptionsInterface) => (
                                <S.LangOption key={lang.key} value={lang.value}>
                                    <Image src={lang.flag as string} preview={false} />
                                    <Typography>
                                        {t(`article-menu.language.${lang.label}`)}
                                    </Typography>
                                </S.LangOption>
                            ))}
                        </S.ChangeLang>
                    </S.FormField>

                    {/* Name */}
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px">
                            <S.FormInput>
                                {t('article-menu.add-a-category.name-of-the-category')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('article-menu.add-a-category.enter-a-name')}
                            size="large"
                        />
                    </S.FormField>

                    {/* Description */}
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px">
                            <S.FormInput>
                                {t('article-menu.add-a-category.descriptions-field')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                        <Input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder={t('article-menu.add-a-category.enter-description')}
                            size="large"
                        />
                    </S.FormField>

                    {/* Image Upload */}
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px">
                            {t('article-menu.add-a-category.category-image')}
                        </Typography>

                        {previewImage ? (
                            <>
                                <S.ImagePreview>
                                    <Image src={previewImage} width={120} height={80} preview />
                                </S.ImagePreview>
                                {uploadProgress.isLoading && (
                                    <Progress percent={uploadProgress.progressPercent} size="small" />
                                )}
                            </>
                        ) : (
                            <label htmlFor="upload-thumbnail">
                                <S.SelectFile>
                                    <Image src={icImage} preview={false} />
                                    <Typography fontWeight={fontWeight.semiBold}>
                                        {t('article-menu.add-a-category.select-or-drag-file')}
                                    </Typography>
                                </S.SelectFile>
                            </label>
                        )}

                        <input
                            id="upload-thumbnail"
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setImageFile(file);
                                    setPreviewImage(URL.createObjectURL(file));

                                    const formData = new FormData();
                                    formData.append('image', file);

                                    try {
                                        const res = await handleUploadImage(formData, setUploadProgress);
                                        if (res?.fileUrl) {
                                            setUploadedImageUrl(res.fileUrl);
                                        }
                                    } catch {
                                        message.error(t('article-menu.add-a-category.upload-failed'));
                                    }
                                }
                            }}
                        />
                    </S.FormField>
                </S.ModalBody>

                {/* Footer */}
                <S.ModalFooter>
                    <Button onClick={onCancel}>
                        {t('article-menu.add-a-category.cancel')}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddCategory}
                    >
                        {t('article-menu.add-a-category.add-category')}
                    </Button>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
};

export default ModalAddNewCategory;
