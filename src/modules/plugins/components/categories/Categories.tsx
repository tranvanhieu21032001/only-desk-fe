import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { CategoriesInterface } from '../../model/allPlugins';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { categories } from '../../helpers/data/allPlugins';

import Typography from '@/shared/components/common/Typography';
import * as S from './Categories.styles';
import { useEffect } from 'react';
import usePrefetchData from '@/shared/hooks/usePrefetchData';

function Categories() {
  const { t } = useTranslation('plugins');

  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get('type');
  const defaultType = categories[0]?.key || '';
  const { prefetchPlugin } = usePrefetchData();

  // Set default type param if none present
  useEffect(() => {
    if (!currentType && defaultType) {
      setSearchParams({ type: defaultType }, { replace: true });
    }
  }, [currentType, defaultType, setSearchParams]);

  const handleCategoryClick = (key: string) => {
    setSearchParams({ type: key });
  };

  return (
    <S.CategoryContainer>
      <S.LabelCategories>
        <Typography fontWeight={fontWeight?.semiBold}>
          {t('all-plugins.categories')}
        </Typography>
      </S.LabelCategories>

      <S.Categories>
        {categories.map((category: CategoriesInterface) => {
          const isActive = (currentType || defaultType) === category.key;

          return (
            <S.CategoryWrap
              key={category.key}
              $isActive={isActive}
              onClick={() => handleCategoryClick(category.key)}
               onMouseEnter={() =>
                prefetchPlugin(category.key)
              }
            >
              <Typography>{t(`all-plugins.${category.label}`)}</Typography>
              {/* <S.Count>
                <Typography>
                  {category.count <= MAX_COUNT ? category.count || 0 : 10}
                  {category.count > MAX_COUNT && '+'}
                </Typography>
              </S.Count> */}
            </S.CategoryWrap>
          );
        })}
      </S.Categories>
    </S.CategoryContainer>
  );
}

export default Categories;
