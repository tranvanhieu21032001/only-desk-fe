import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Image, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddNewArticles.styles';

import icSetting from '@/assets/icons/knowledge-base/ic-setting.svg';
import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';
import { langOptions } from '@/modules/auth/helpers/data/signIn';
import { OptionsInterface } from '@/core/model/common';

interface ModalAddNewArticlesProps {
    open: boolean;
    onCancel: () => void;
    onStart: () => void;
}

function ModalAddNewArticles({
    open,
    onCancel,
    onStart,
}: ModalAddNewArticlesProps) {
    const { t } = useTranslation('knowledgeBase');
    const editorRef = useRef<any>(null);

    const [language, setLanguage] = useState(langOptions?.[0]?.value);
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = () => {
        const content = editorRef.current?.getContent() || '';
        console.log('Language:', language);
        console.log('Category:', category);
        console.log('Content:', content);
        onStart();
    };

    return (
        <S.WrapModal>
            <ModalCommon
                open={open}
                onCancel={onCancel}
                showFooter={false}
                width={1200}
                rootClassName="modal-getting-started-knowledgebase"
            >
                <S.ModalHeader>
                    <S.ModalHeaderContent>
                        <Typography fontWeight={fontWeight.semiBold}>
                            {t('article-menu.add-a-new-article.title')}
                        </Typography>
                        <S.ModalDescription>
                            <Typography color={themeColors.newtralLight}>
                                {t('article-menu.add-a-new-article.description')}
                            </Typography>
                        </S.ModalDescription>
                    </S.ModalHeaderContent>
                </S.ModalHeader>

                <S.ModalBody>
                    <S.GroupInput>
                        <S.FormField>
                            <Typography fontWeight={fontWeight.medium}>
                                <S.FormInput>
                                    {t('article-menu.add-a-new-article.language')}
                                    <Image src={icValid} height={23} width={7} />
                                </S.FormInput>
                            </Typography>

                            <S.ChangeLang
                                defaultValue={language}
                                popupClassName="auth-lang"
                                onChange={setLanguage}
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
                            <Typography fontWeight={fontWeight.medium}>
                                <S.FormInput>
                                    {t('article-menu.add-a-new-article.category')}
                                    <Image src={icValid} height={23} width={7} />
                                </S.FormInput>
                            </Typography>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder={t('article-menu.add-a-new-article.getting-started')}
                                size="large"
                            />
                        </S.FormField>
                    </S.GroupInput>

                    <S.FormField>
                        <Typography fontWeight={fontWeight.medium}>
                            <S.FormInput>
                                {t('article-menu.add-a-new-article.article-content')}
                                <Image src={icValid} height={23} width={7} />
                            </S.FormInput>
                        </Typography>
                    </S.FormField>

                    <Editor
                        apiKey="10lpxjmyvyly4rdb88xil2fxm3y11ava3j2s5rn9tl5btib8" // use env variable
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue=""
                        init={{
                            height: 627,
                            menubar: false,
                            branding: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                                'image',
                                'media',
                                'link',
                            ],
                            toolbar:
                                'undo redo | formatselect fontsizeselect | bold italic underline | link image media | ' +
                                'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                            file_picker_types: 'image media file',
                            file_picker_callback: (cb, value, meta) => {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');

                                if (meta.filetype === 'image') {
                                    input.setAttribute('accept', 'image/*');
                                } else if (meta.filetype === 'media') {
                                    input.setAttribute('accept', 'video/*');
                                } else if (meta.filetype === 'file') {
                                    input.setAttribute('accept', '*/*');
                                }

                                input.onchange = () => {
                                    const file = input.files?.[0];
                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        cb(reader.result?.toString() || '', { title: file?.name });
                                    };

                                    if (file) reader.readAsDataURL(file);
                                };

                                input.click();
                            },
                        }}
                    />
                </S.ModalBody>

                <S.ModalFooter>
                    <div>
                        <Image src={icSetting} preview={false} />
                        <Typography fontWeight={fontWeight.semiBold} color={themeColors.secondaryDark}>
                            {t('article-menu.add-a-new-article.option')}
                        </Typography>
                    </div>

                    <div className="button-group">
                        <Button onClick={onCancel}>
                            {t('article-menu.add-a-new-article.save-draft')}
                        </Button>
                        <Button type="primary" onClick={handleSubmit}>
                            {t('article-menu.add-a-new-article.publish')}
                        </Button>
                    </div>
                </S.ModalFooter>
            </ModalCommon>
        </S.WrapModal>
    );
}

export default ModalAddNewArticles;
