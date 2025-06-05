import { Image } from "antd";
import Typography from "@/shared/components/common/Typography";
import themeColors from "@/shared/styles/themes/default/colors";
import { useTranslation } from "react-i18next";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import Button from "@/shared/components/common/Button";

import icNoCategory from '@/assets/icons/knowledge-base/ic-nocategories.svg';
import icAdd from '@/assets/icons/knowledge-base/ic-add3.svg';

import * as S from './NoCategories.styles';
import { useModal } from "@/shared/hooks";
import ModalAddNewCategory from "../modal-add-category/ModalAddNewCategory";

const NoCategories = () => {
    const { t } = useTranslation('knowledgeBase');
    const { visible: isModalAddCategory, toggle: toggleModalAddCategory } = useModal();

    return (
        <>
            <S.Container>
                <Image src={icNoCategory} preview={false} />
                <Typography color={themeColors?.primary} variant="h5" fontWeight={fontWeight.semiBold}>
                    {t('article-menu.no-category.title')}
                </Typography>
                <Typography color={themeColors?.primary} fontWeight={fontWeight.light}>
                    {t('article-menu.no-category.description')}
                </Typography>

                <S.ButtonGroup>
                    <Button type="primary" onClick={toggleModalAddCategory}>
                        <S.IconTextWrapper>
                            <Image src={icAdd} width={18} height={18} preview={false} />
                            {t('article-menu.no-category.new-category')}
                        </S.IconTextWrapper>
                    </Button>
                </S.ButtonGroup>
            </S.Container>
            {isModalAddCategory && (
                <ModalAddNewCategory
                    open={isModalAddCategory}
                    onCancel={toggleModalAddCategory}
                    onOK={toggleModalAddCategory}
                />
            )}
        </>
    );
};

export default NoCategories;
