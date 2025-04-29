import { useTranslation } from "react-i18next";

import { categories, MAX_COUNT } from "../../helper/data/allPlugins";
import { CategoriesInterface } from "../../model/allPlugins";
import fontWeight from "@/shared/styles/themes/default/fontWeight";

import Typography from "@/shared/components/common/Typography";

import * as S from "./categories.styles";

function Categories() {
    const { t } = useTranslation("plugins");

    return (
        <S.CategoryContainer>
            <S.LabelCategories>
                <Typography fontWeight={fontWeight?.semiBold}>{t('all-plugins.categories')}</Typography>
            </S.LabelCategories>
            <S.Categories>
                {categories?.map((category: CategoriesInterface) => <S.CategoryWrap key={category?.key}>
                    <Typography>{t(`all-plugins.${category?.label}`)}</Typography>
                    <S.Count>
                        <Typography>{category?.count <= MAX_COUNT ? category?.count || 0 : 10}{category?.count > MAX_COUNT && '+'}</Typography>
                    </S.Count>
                </S.CategoryWrap>)}
            </S.Categories>
        </S.CategoryContainer>
    )
}

export default Categories