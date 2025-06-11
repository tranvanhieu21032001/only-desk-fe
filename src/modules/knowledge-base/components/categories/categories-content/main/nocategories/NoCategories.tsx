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
import ModalAddASection from "../modal-add-a-section/ModalAddASection";
import { useState } from "react";

const NoCategories = () => {
    const { t } = useTranslation('knowledgeBase');

    const {
        visible: isModalAddCategoryVisible,
        toggle: toggleModalAddCategory,
    } = useModal();

    const {
        visible: isModalAddSectionVisible,
        toggle: toggleModalAddSection,
    } = useModal();

    const [newCategory, setNewCategory] = useState<{ id: string; name: string } | null>(null);
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

            {isModalAddCategoryVisible && (
                <ModalAddNewCategory
                    open={isModalAddCategoryVisible}
                    onCancel={toggleModalAddCategory}
                    onOK={() => {
                        toggleModalAddCategory();
                        toggleModalAddSection();
                    }}
                    onAddCategory={(category) => setNewCategory(category)}
                />
            )}

            {isModalAddSectionVisible && (
                <ModalAddASection
                    open={isModalAddSectionVisible}
                    onCancel={toggleModalAddSection}
                    onOK={() => {
                    }}
                    category={newCategory}
                />
            )}
        </>
    );
};

export default NoCategories;
