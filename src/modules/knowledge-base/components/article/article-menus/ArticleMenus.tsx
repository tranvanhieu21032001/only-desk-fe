import { Image, Skeleton } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from '@/core/store';
import { OptionsInterface } from '@/core/model/common';
import { MAX_COUNT } from '@/shared/helper/data/contacts';
import { langOptions } from '@/modules/auth/helpers/data/signIn';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { CategoriesInterface } from '@/modules/plugins/model/allPlugins';
import { statusMenu } from '@/modules/knowledge-base/helpers/data/article';

import Typography from '@/shared/components/common/Typography';

import * as S from './ArticleMenus.styles';

function ArticleMenus() {
  const { t } = useTranslation('knowledgeBase');

  const { data: settings, loading } = useSelector(
    (state: RootState) => state.helpdeskSetting
  );

  const publicLangOptions = useMemo(() => {
    const langsFromSettings = settings?.languages?.length
      ? settings.languages
      : langOptions.map((opt) => opt.value);

    return langsFromSettings
      .map((lang) => langOptions.find((item) => item.value === lang))
      .filter(Boolean) as OptionsInterface[];
  }, [settings?.languages]);

  return (
    <S.CategoryContainer>
      {loading ? (
        <S.SkeletonChangeLang>
          <Skeleton.Input
            style={{ minWidth: 120, width: '100%', height: 48 }}
            active
          />
        </S.SkeletonChangeLang>
      ) : (
        <S.ChangeLang
          defaultValue={publicLangOptions?.[0]?.value}
          popupClassName="auth-lang"
        >
          {publicLangOptions?.map((lang: OptionsInterface) => (
            <S.LangOption key={lang?.key} value={lang?.value}>
              <Image src={lang?.flag as string} preview={false} />
              <Typography>
                {t(`article-menu.language.${lang?.label.toLowerCase()}`)}
              </Typography>
            </S.LangOption>
          ))}
        </S.ChangeLang>
      )}

      <S.LabelCategories>
        <Typography fontWeight={fontWeight?.semiBold}>
          {t('article-menu.status')}
        </Typography>
      </S.LabelCategories>

      <S.Categories>
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index: number) => (
                <S.CategoryWrap key={index}>
                  <Skeleton.Input
                    active
                    style={{ minWidth: 120, width: 120, height: 24 }}
                  />
                  <Skeleton.Avatar
                    active
                    style={{ minWidth: 30, width: 28, height: 28 }}
                  />
                </S.CategoryWrap>
              ))
          : statusMenu?.map((category: CategoriesInterface) => (
              <S.CategoryWrap key={category?.key}>
                <Typography>
                  {t(`article-menu.${category?.label}`)}
                </Typography>
                <S.Count>
                  <Typography>
                    {category?.count <= MAX_COUNT ? category?.count || 0 : 10}
                    {category?.count > MAX_COUNT && '+'}
                  </Typography>
                </S.Count>
              </S.CategoryWrap>
            ))}
      </S.Categories>
    </S.CategoryContainer>
  );
}

export default ArticleMenus;
