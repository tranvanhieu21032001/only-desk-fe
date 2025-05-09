import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { categories, MAX_COUNT } from '../../helper/data/allPlugins';
import { CategoriesInterface } from '../../model/allPlugins';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Typography from '@/shared/components/common/Typography';

import * as S from './Categories.styles';

function Categories() {
  const { t } = useTranslation('plugins');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <S.CategoryContainer>
      <S.LabelCategories>
        <Typography fontWeight={fontWeight?.semiBold}>
          {t('all-plugins.categories')}
        </Typography>
      </S.LabelCategories>
      <S.Categories>
        {isLoading
          ? Array(8)
              ?.fill(0)
              ?.map((_, index: number) => (
                <S.CategoryWrap key={index}>
                  <Skeleton.Input
                    active
                    style={{ minWidth: 120, width: 120, height: 28 }}
                  />
                  <Skeleton.Avatar
                    active
                    style={{ minWidth: 30, width: 30, height: 30 }}
                  />
                </S.CategoryWrap>
              ))
          : categories?.map((category: CategoriesInterface) => (
              <S.CategoryWrap key={category?.key}>
                <Typography>{t(`all-plugins.${category?.label}`)}</Typography>
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

export default Categories;
