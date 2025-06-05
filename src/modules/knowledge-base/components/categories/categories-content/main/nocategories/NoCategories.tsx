import { Image } from "antd";
import Typography from "@/shared/components/common/Typography";
import themeColors from "@/shared/styles/themes/default/colors";
import { useTranslation } from "react-i18next";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import styled from "styled-components";
import Button from "@/shared/components/common/Button";

import icNoCategory from '@/assets/icons/knowledge-base/ic-nocategories.svg';
import icAdd from '@/assets/icons/knowledge-base/ic-add3.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  gap: 12px;
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const IconTextWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const NoCategories = () => {
  const { t } = useTranslation('knowledgeBase');

  return (
    <Container>
      <Image src={icNoCategory} preview={false} />
      <Typography color={themeColors?.primary} variant="h5" fontWeight={fontWeight.semiBold}>
        {t('article-menu.no-category.title')}
      </Typography>
      <Typography color={themeColors?.primary} fontWeight={fontWeight.light}>
        {t('article-menu.no-category.description')}
      </Typography>

      <ButtonGroup>
        <Button type="primary">
          <IconTextWrapper>
            <Image src={icAdd} width={18} height={18} preview={false} />
            {t('article-menu.no-category.new-category')}
          </IconTextWrapper>
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NoCategories;
