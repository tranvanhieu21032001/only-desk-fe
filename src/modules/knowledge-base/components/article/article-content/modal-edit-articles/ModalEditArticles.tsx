import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Image, Input, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalEditArticles.styles';

import icValid from '@/assets/icons/knowledge-base/ic-valid.svg';
import { langOptions } from '@/modules/auth/helpers/data/signIn';
import { OptionsInterface } from '@/core/model/common';
import { HelpdeskArticleCreatePayload, HelpdeskCategory } from '@/modules/knowledge-base/interface';
import { AppDispatch, RootState } from '@/core/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateHelpdeskArticle,
} from '@/modules/knowledge-base/api/knowledgebase.api';
import {
  fetchHelpdeskCategories,
  updateArticle,
} from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { AllArticleInterface } from '@/modules/knowledge-base/models/article.model';


interface ModalEditArticlesProps {
  open: boolean;
  onCancel: () => void;
  onStart: () => void;
  article: AllArticleInterface | null;
}

function ModalEditArticles({ open, onCancel, article }: ModalEditArticlesProps) {
  const { t } = useTranslation('knowledgeBase');
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [language, setLanguage] = useState(langOptions?.[0]?.value);
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [editorReady, setEditorReady] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<HelpdeskCategory[]>([]);
  const [sectionsByCategory, setSectionsByCategory] = useState<Record<string, HelpdeskCategory['sections']>>({});

  const { categories } = useSelector((state: RootState) => state.helpdeskCategory);
  const { data: settings } = useSelector((state: RootState) => state.helpdeskSetting);
  const [publicLangOptions, setPublicLangOptions] = useState<OptionsInterface[]>([]);

  const mapLanguagesToOptions = (langsFromSettings: string[]) => {
    return langsFromSettings
      .map((lang) => langOptions.find((item) => item.value === lang))
      .filter(Boolean) as OptionsInterface[];
  };

  useEffect(() => {
    if (settings?.languages?.length) {
      const mapped = mapLanguagesToOptions([...settings.languages]);
      setPublicLangOptions(mapped);
      setLanguage(mapped[0]?.value ?? 'en');
    } else {
      const fallback = langOptions.slice(0, 1);
      setPublicLangOptions(fallback);
      setLanguage(fallback[0]?.value ?? 'en');
    }
  }, [settings]);

  useEffect(() => {
    setCategoryOptions(categories);
    const sectionMap: Record<string, HelpdeskCategory['sections']> = {};
    categories.forEach((cat) => {
      sectionMap[cat.id] = cat.sections || [];
    });
    setSectionsByCategory(sectionMap);
  }, [categories]);

  useEffect(() => {
    if (open && article) {
      const lang = article.defaultLanguage || 'en';
      const trans = article.translations?.[lang];

      setLanguage(lang);
      setCategory(article.categoryId || '');
      setArticleTitle(trans?.title || article.title || '');
      setSection(article.sectionId || '');
    }
  }, [open, article]);

  useEffect(() => {
    if (editorReady && article) {
      const lang = article.defaultLanguage || 'en';
      const trans = article.translations?.[lang];
      const content = trans?.content || article.content || '';
      editorRef.current?.setContent(content);
    }
  }, [editorReady, article]);

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent() || '';

    const selectedCategorySections = sectionsByCategory[category] || [];
    const hasSections = selectedCategorySections.length > 0;
    const isValidSection = hasSections && section;

    const payload: HelpdeskArticleCreatePayload & { sectionId?: string } = {
      title: articleTitle,
      content,
      categoryId: category,
      translations: {
        [language]: {
          title: articleTitle,
          content,
        },
      },
      defaultLanguage: language,
      slug: articleTitle.trim().toLowerCase().replace(/\s+/g, '-'),
      tags: ['workspace'],
      sectionId: isValidSection ? section : undefined,
    };

    try {
      if (article?.key) {
        const updated = await updateHelpdeskArticle(article.key, payload);
        dispatch(updateArticle({ ...updated, rawId: article.key }));
        dispatch(fetchHelpdeskCategories());
        onCancel();
      }
    } catch (error) {
      console.error('Failed to update article:', error);
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
      >
        <S.ModalHeader>
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight.semiBold}>
              {t('article-menu.add-a-new-article.title-edit')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors.newtralLight}>
                {t(
                  'article-menu.add-a-new-article.description',
                  'Update the article details below.',
                )}
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
                value={language}
                popupClassName="auth-lang"
                onChange={(value) => setLanguage(value as string)}
              >
                {publicLangOptions.map((lang: OptionsInterface) => (
                  <S.LangOption key={lang?.key} value={lang?.value}>
                    <Image src={lang?.flag as string} preview={false} />
                    <Typography>{lang?.label}</Typography>
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
                  setCategory(value as string);
                  setSection('');
                }}
                popupClassName="article-category"
              >
                {categoryOptions.map((cat) => (
                  <S.LangOption key={cat.id} value={cat.id}>
                    <Typography>{cat.name}</Typography>
                  </S.LangOption>
                ))}
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
                onChange={(value) => setSection(value as string)}
                popupClassName="auth-lang"
                placeholder={t('article-menu.add-a-new-article.select-section')}
                disabled={!category}
              >
                {(sectionsByCategory[category] || []).map((sec) => (
                  <S.LangOption key={sec.id} value={sec.id}>
                    <Typography>{sec.name}</Typography>
                  </S.LangOption>
                ))}
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
              placeholder={t('article-menu.add-a-new-article.enter-article-title')}
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
                onInit={(_evt, editor) => {
                  editorRef.current = editor;
                  setEditorReady(true);
                }}
                initialValue=""
                init={{
                  height: '100%',
                  menubar: false,
                  branding: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image media link',
                  ],
                  toolbar:
                    'undo redo | formatselect fontsizeselect | bold italic underline | link image media | ' +
                    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                  fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                  file_picker_types: 'image media file',
                  file_picker_callback: (cb: any, _value: any, meta: any) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');

                    if (meta.filetype === 'image') {
                      input.setAttribute('accept', 'image/*');
                    } else if (meta.filetype === 'media') {
                      input.setAttribute('accept', 'video/*');
                    } else {
                      input.setAttribute('accept', '*/*');
                    }

                    input.onchange = () => {
                      const file = input.files?.[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        cb(reader.result?.toString() || '', {
                          title: file?.name,
                        });
                      };
                      if (file) reader.readAsDataURL(file);
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
              {t('article-menu.add-a-new-article.cancel')}
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              {t('article-menu.add-a-new-article.update')}
            </Button>
          </div>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalEditArticles;
