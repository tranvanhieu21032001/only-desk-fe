import { Image } from 'antd';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { useModal } from '@/shared/hooks';
import Input from '@/shared/components/common/Input';
import themeColors from '@/shared/styles/themes/default/colors';
import { ActionArticleFilterEnums } from '../../../../helpers/enums/article';
import { actionFilterArticleOptions } from '@/modules/knowledge-base/helpers/data/article';
import { ActionFilterArticleOptionsInterface } from '@/modules/knowledge-base/models/article.model';
import ModalConfirmInstallHelpDesk from '../modal-confirm-install-helpdesk/ModalConfirmInstallHelpDesk';

import Typography from '@/shared/components/common/Typography';
import PopoverAction from '@/shared/components/common/Popover';

import * as S from './ArticleContent.styles';

import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';

function ArticleContent() {
  const { t } = useTranslation('knowledgeBase');

  const {
    visible: isModalInstallHelpdesk,
    toggle: handleOpenModalInstallHelpdesk,
  } = useModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpenModalInstallHelpdesk();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchArticle = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //TODO handle later
      e?.target?.value;
    },
    600,
  );

  function handleActionFilterArticle(actionType: ActionArticleFilterEnums) {
    switch (actionType) {
      case ActionArticleFilterEnums?.IMPORT:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.EXPORT:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.VIEW_MY_KNOWLEDGE_BASE:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.ADD_A_NEW_LANGUAGE:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.REMOVE_SELECTED_ARTICLES:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.DESTROY_CURRENT_LANGUAGE:
        //TODO handle later
        return;
      default:
        break;
    }
  }

  const renderActionFilter = () => {
    return (
      <S.FilterActionWrap>
        {actionFilterArticleOptions?.map(
          (option: ActionFilterArticleOptionsInterface) => (
            <S.FilterAction
              key={option?.key}
              $isRemove={
                option?.actionType ===
                  ActionArticleFilterEnums?.REMOVE_SELECTED_ARTICLES ||
                option?.actionType ===
                  ActionArticleFilterEnums?.DESTROY_CURRENT_LANGUAGE
              }
              onClick={() => handleActionFilterArticle(option?.actionType)}
            >
              <ReactSVG src={option?.icon} width={24} height={24} />
              <Typography>
                {t(`article-menu.filter.${option?.label}`)}
              </Typography>
            </S.FilterAction>
          ),
        )}
      </S.FilterActionWrap>
    );
  };

  function handleFilterContact() {
    //TODO handle later
  }

  function handleInstallHelpdesk() {
    handleOpenModalInstallHelpdesk();
  }

  return (
    <S.ArticleContentContainer>
      <S.FilterWrap>
        <S.InputSearch>
          <Input
            prefix
            placeholder={t('article-menu.search')}
            onChange={handleSearchArticle}
          />
        </S.InputSearch>
        <S.FilterPopoverWrap>
          <S.ButtonAddArticle
            width="fit-content"
            iconPosition="left"
            icon={<PlusOutlined />}
            type="primary"
          >
            <Typography color={themeColors?.newtralLightest}>
              {t('article-menu.new-article')}
            </Typography>
          </S.ButtonAddArticle>
          <PopoverAction
            content={renderActionFilter()}
            placement="bottomRight"
            btnContent={
              <S.ButtonAction
                width="fit-content"
                onClick={handleFilterContact}
                iconPosition="left"
                icon={
                  <Image
                    src={icArrowDown}
                    preview={false}
                    width={20}
                    height={20}
                  />
                }
              >
                <Typography>{t('article-menu.action')}</Typography>
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.FilterWrap>

      {isModalInstallHelpdesk && (
        <ModalConfirmInstallHelpDesk
          open={isModalInstallHelpdesk}
          onCancel={handleOpenModalInstallHelpdesk}
          onOK={handleInstallHelpdesk}
        />
      )}
    </S.ArticleContentContainer>
  );
}

export default ArticleContent;
