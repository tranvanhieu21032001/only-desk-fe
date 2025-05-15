import { useEffect, useState } from 'react';
import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <S.CategoryContainer>
      {isLoading ? (
        <S.SkeletonChangeLang>
          <Skeleton.Input
            style={{ minWidth: 120, width: '100%', height: 48 }}
          />
        </S.SkeletonChangeLang>
      ) : (
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
      )}

      <S.LabelCategories>
        <Typography fontWeight={fontWeight?.semiBold}>
          {t('article-menu.status')}
        </Typography>
      </S.LabelCategories>
      <S.Categories>
        {isLoading
          ? Array(4)
              ?.fill(0)
              ?.map((_, index: number) => (
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
                <Typography>{t(`article-menu.${category?.label}`)}</Typography>
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
