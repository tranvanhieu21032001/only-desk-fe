import { Image } from "antd";
import icNoArticle from '@/assets/icons/knowledge-base/ic-no-article.svg';
import Typography from "@/shared/components/common/Typography";
import themeColors from "@/shared/styles/themes/default/colors";
import { useTranslation } from "react-i18next";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import styled from "styled-components";
import Button from "@/shared/components/common/Button";

import icImport from '@/assets/icons/knowledge-base/ic-import-new.svg';
import icAdd from '@/assets/icons/knowledge-base/ic-add.svg';
import ModalAddNewArticles from "../../modal-add-new-articles/ModalAddNewArticles";
import { useModal } from "@/shared/hooks";

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

const NoArticle = () => {
  const { t } = useTranslation('knowledgeBase');
  const {
    visible: isModalNewArticles,
    toggle: handleToggleModalNewArticle,
  } = useModal();

  return (
    <Container>
      <Image src={icNoArticle} preview={false} />
      <Typography color={themeColors?.primary} variant="h5" fontWeight={fontWeight.semiBold}>
        {t('article-menu.getting-started-knowledge.no-articles')}
      </Typography>
      <Typography color={themeColors?.primary} fontWeight={fontWeight.light}>
        {t('article-menu.getting-started-knowledge.create-your-first-article')}
      </Typography>

      <ButtonGroup>
        <Button onClick={handleToggleModalNewArticle}>
          <IconTextWrapper>
            <Image src={icAdd} width={18} height={18} preview={false} />
            {t('article-menu.getting-started-knowledge.new-article')}
          </IconTextWrapper>
        </Button>
        <Button type="primary">
          <IconTextWrapper>
            <Image src={icImport} width={18} height={18} preview={false} />
            {t('article-menu.getting-started-knowledge.import-articles')}
          </IconTextWrapper>
        </Button>
      </ButtonGroup>

      <ModalAddNewArticles
        open={isModalNewArticles}
        onCancel={handleToggleModalNewArticle}
        onStart={() => {
          handleToggleModalNewArticle();
        }}
      />
    </Container>
  );
};

export default NoArticle;
