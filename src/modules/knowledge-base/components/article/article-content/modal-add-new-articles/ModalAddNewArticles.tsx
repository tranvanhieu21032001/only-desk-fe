import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Image, Input, Skeleton } from 'antd';
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
import {
  HelpdeskArticleCreatePayload,
  HelpdeskCategory,
} from '@/modules/knowledge-base/interface';
import { AppDispatch, RootState } from '@/core/store';
import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { createHelpdeskArticle } from '@/modules/knowledge-base/api/knowledgebase.api';
import { handleUploadImage } from '@/shared/components/common/Upload/api/upload';

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
  const dispatch = useDispatch<AppDispatch>();

  const [language, setLanguage] = useState(langOptions?.[0]?.value);
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [editorReady, setEditorReady] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<HelpdeskCategory[]>(
    [],
  );
  const [sectionsByCategory, setSectionsByCategory] = useState<
    Record<string, HelpdeskCategory['sections']>
  >({});

  const { categories } = useSelector(
    (state: RootState) => state.helpdeskCategory,
  );

  const [uploadProgress, setUploadProgress] = useState({
    isLoading: false,
    countUpload: 0,
    progressPercent: 0,
  });

  useEffect(() => {
    setCategoryOptions(categories);
    const sectionMap: Record<string, HelpdeskCategory['sections']> = {};
    categories.forEach((cat) => {
      sectionMap[cat.id] = cat.sections || [];
    });
    setSectionsByCategory(sectionMap);
  }, [categories]);

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent() || '';
    const payload: HelpdeskArticleCreatePayload & { sectionId?: string } = {
      title: articleTitle,
      content: content,
      categoryId: category,
      translations: {
        [language]: {
          title: articleTitle,
          content: content,
        },
      },
      defaultLanguage: language,
      slug: articleTitle.trim().toLowerCase().replace(/\s+/g, '-'),
      status: 'published',
      tags: ['workspace'],
    };

    if (section) {
      payload.sectionId = section;
    }

    try {
      await createHelpdeskArticle(payload);
      dispatch(fetchHelpdeskCategories());
      onStart();
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        width={1200}
        rootClassName="modal-getting-started-knowledgebase"
        style={{ margin: '12px 0' }}
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
                  {t('article-menu.add-a-language.language')}
                  <Image src={icValid} height={23} width={7} />
                </S.FormInput>
              </Typography>

              <S.ChangeLang
                defaultValue={langOptions?.[0]?.value}
                popupClassName="auth-lang"
                onChange={(value) => setLanguage(value)}
              >
                {langOptions?.map((lang: OptionsInterface) => (
                  <S.LangOption key={lang?.key} value={lang?.value}>
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
                </S.FormInput>
              </Typography>
              <S.ChangeLang
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setSection('');
                }}
                popupClassName="auth-lang"
                placeholder={t(
                  'article-menu.add-a-new-article.getting-started',
                )}
              >
                {categoryOptions.length === 0 ? (
                  <S.LangOption disabled value="">
                    <Typography>
                      {t('article-menu.add-a-new-article.no-category')}
                    </Typography>
                  </S.LangOption>
                ) : (
                  categoryOptions.map((cat) => (
                    <S.LangOption key={cat.id} value={cat.id}>
                      <Typography>{cat.name}</Typography>
                    </S.LangOption>
                  ))
                )}
              </S.ChangeLang>
            </S.FormField>

            <S.FormField>
              <Typography fontWeight={fontWeight.medium}>
                <S.FormInput>
                  {t('article-menu.add-a-new-article.section')}
                </S.FormInput>
              </Typography>
              <S.ChangeLang
                value={section}
                onChange={(value) => setSection(value)}
                popupClassName="auth-lang"
                placeholder={t('article-menu.add-a-new-article.select-section')}
                disabled={!category}
              >
                {(sectionsByCategory[category] || []).length === 0 ? (
                  <S.LangOption disabled value="">
                    <Typography>
                      {t('article-menu.add-a-new-article.no-section')}
                    </Typography>
                  </S.LangOption>
                ) : (
                  (sectionsByCategory[category] || []).map((sec) => (
                    <S.LangOption key={sec.id} value={sec.id}>
                      <Typography>{sec.name}</Typography>
                    </S.LangOption>
                  ))
                )}
              </S.ChangeLang>
            </S.FormField>
          </S.GroupInput>

          <S.FormField>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('article-menu.add-a-new-article.article-title')}
                <Image src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>
            <Input
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder={t(
                'article-menu.add-a-new-article.enter-article-title',
              )}
              size="large"
            />
          </S.FormField>

          <S.FormField>
            <Typography fontWeight={fontWeight.medium}>
              <S.FormInput>
                {t('article-menu.add-a-new-article.article-content')}
                <Image src={icValid} height={23} width={7} />
              </S.FormInput>
            </Typography>

            {!editorReady && (
              <Skeleton
                active
                paragraph={{ rows: 12 }}
                title={false}
                style={{ height: 627, marginBottom: 24 }}
              />
            )}

            <div
              style={{
                display: editorReady ? 'block' : 'none',
                height: '50vh',
                maxHeight: '627px',
                width: '100%',
              }}
            >
              <Editor
                apiKey="10lpxjmyvyly4rdb88xil2fxm3y11ava3j2s5rn9tl5btib8"
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                  setEditorReady(true);
                }}
                init={{
                  height: '100%',
                  menubar: false,
                  branding: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'link',
                    'image',
                  ],
                  toolbar:
                    'undo redo | formatselect fontsizeselect | bold italic underline | link image media | ' +
                    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                  fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                  file_picker_types: 'image file',
                  automatic_uploads: true,
                  image_uploadtab: false,

                  images_upload_handler: async (blobInfo, success, failure) => {
                    try {
                      const formData = new FormData();
                      formData.append(
                        'image',
                        blobInfo.blob(),
                        blobInfo.filename(),
                      );

                      const res = await handleUploadImage(
                        formData,
                        setUploadProgress,
                      );
                      if (res?.fileUrl) {
                        success(res.fileUrl);
                      } else {
                        failure('Image upload failed');
                      }
                    } catch (err) {
                      failure('Upload error: ' + err.message);
                    }
                  },

                  file_picker_callback: async (cb, value, meta) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.onchange = async () => {
                      console.log('action');

                      const file = input.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append('image', file);

                      try {
                        const res = await handleUploadImage(
                          formData,
                          setUploadProgress,
                        );
                        if (res?.fileUrl) {
                          cb(res.fileUrl, { title: file.name, alt: file.name });
                        } else {
                          console.error('Upload failed');
                        }
                      } catch (err) {
                        console.error('Upload error:', err);
                      }
                    };

                    input.click();
                  },
                }}
              />
            </div>
          </S.FormField>
        </S.ModalBody>

        <S.ModalFooter>
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
