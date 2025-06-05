import { Image, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddNewCategory.styles';

import { PlusOutlined } from '@ant-design/icons';
import { OptionsInterface } from '@/core/model/common';
import { langOptions } from '@/modules/auth/helpers/data/signIn';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';
import icImage from '@/assets/icons/knowledge-base/ic-image.svg';

interface ModalAddNewCategoryProps {
    open: boolean;
    onCancel: () => void;
    onOK: () => void;
    onAddCategory?: () => void;
}

function ModalAddNewCategory({ open, onCancel, onOK, onAddCategory }: ModalAddNewCategoryProps) {
    const { t } = useTranslation('knowledgeBase');

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
                        <Typography fontWeight={fontWeight?.semiBold}>
                            {t('article-menu.add-a-category.title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors?.newtralLight}>
                                {t('article-menu.add-a-category.description')}
                            </Typography>
                        </S.ModalDescription>
                    </S.ModalHeaderContent>
                </S.ModalHeader>

                <S.ModalBody>
                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                            <S.FormInput>
                                {t('article-menu.add-a-category.language')}
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

                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                            {t('article-menu.add-a-category.name-of-the-category')}
                        </Typography>
                        <Input
                            placeholder={t('article-menu.add-a-category.enter-a-name')}
                            size="large"
                        />
                    </S.FormField>

                    <S.GroupInput>
                        <S.FormField>
                            <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                                {t('article-menu.add-a-category.category-color')}
                            </Typography>
                            <Input type="color" size="large" />
                        </S.FormField>

                        <S.FormField>
                            <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                                {t('article-menu.add-a-category.category-order-index')}
                            </Typography>
                            <Input
                                placeholder={t('article-menu.add-a-category.enter-category-order-index')}
                                size="large"
                            />
                        </S.FormField>
                    </S.GroupInput>

                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium} padding="0 0 8px 0">
                            {t('article-menu.add-a-category.category-image')}
                        </Typography>

                        <input
                            id="upload-thumbnail"
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    console.log('File selected:', file.name);
                                }
                            }}
                        />

                        <label htmlFor="upload-thumbnail">
                            <S.SelectFile>
                                <Image src={icImage} preview={false} />
                                <Typography fontWeight={fontWeight?.semiBold}>
                                    {t('article-menu.add-a-category.select-or-drag-file')}
                                </Typography>
                            </S.SelectFile>
                        </label>
                    </S.FormField>
                </S.ModalBody>

                <S.ModalFooter>
                    <Button onClick={onCancel}>
                        {t('article-menu.add-a-category.cancel')}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            onOK(); 
                            onAddCategory?.();
                        }}
                    >
                        {t('article-menu.add-a-category.add-category')}
                    </Button>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
}

export default ModalAddNewCategory;
