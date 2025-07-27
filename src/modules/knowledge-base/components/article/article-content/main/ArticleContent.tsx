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

import Typography from '@/shared/components/common/Typography';
import PopoverAction from '@/shared/components/common/Popover';

import ModalConfirmInstallHelpDesk from '../modal-confirm-install-helpdesk/ModalConfirmInstallHelpDesk';
import ModalGettingStartedKnowledgeBase from '../modal-getting-started-knowledge-base/ModalGettingStartedKnowledgeBase';
import ModalAddALanguage from '../modal-add-a-language/ModalAddALanguage';

import * as S from './ArticleContent.styles';

import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import ModalImportArticles from '../modal-import-articles/ModalImportArticles';
import ModalExportArticles from '../modal-export-articles/ModalExportArticles';
import ModalRemoveLanguage from '../modal-remove-language/ModalRemoveLanguage';
import ModalAddNewArticles from '../modal-add-new-articles/ModalAddNewArticles';
import { useLocation } from 'react-router-dom';
import ArticleComponent from '../article-content-components/ArticleComponent';
import CategoryComponent from '../../../categories/categories-content/main/category-component/CategoryComponent';
import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/core/store';

function ArticleContent() {
  const { t } = useTranslation('knowledgeBase');
  const location = useLocation();
  const currentPath = location.pathname;
  const isCategoriesPage = currentPath === '/categories';

  const dispatch = useDispatch<AppDispatch>();


  const {
    visible: isModalInstallHelpdesk,
    toggle: handleToggleModalInstallHelpdesk,
  } = useModal();

  const {
    visible: isModalGettingStarted,
    toggle: handleToggleModalGettingStarted,
  } = useModal();


  const {
    visible: isModalAddLanguage,
    toggle: handleToggleModalAddLanguage,
  } = useModal();

  const {
    visible: isModalImportArticles,
    toggle: handleToggleModalImportArticles,
  } = useModal();

  const {
    visible: isModalExportArticles,
    toggle: handleToggleModalExportArticles,
  } = useModal();

  const {
    visible: isModalRemoveLanguage,
    toggle: handleToggleModalRemoveLanguage,
  } = useModal();

  const {
    visible: isModalNewArticles,
    toggle: handleToggleModalNewArticle,
  } = useModal();

  useEffect(() => {
    dispatch(fetchHelpdeskCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isCategoriesPage) {
      const timer = setTimeout(() => {
        handleToggleModalInstallHelpdesk();
      }, 300);
      return () => clearTimeout(timer);
    }
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
        handleToggleModalImportArticles()
        return;
      case ActionArticleFilterEnums?.EXPORT:
        //TODO handle later
        handleToggleModalExportArticles()
        return;
      case ActionArticleFilterEnums?.VIEW_MY_KNOWLEDGE_BASE:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.ADD_A_NEW_LANGUAGE:
        //TODO handle later
        handleToggleModalAddLanguage();
        return;
      case ActionArticleFilterEnums?.REMOVE_SELECTED_ARTICLES:
        //TODO handle later
        return;
      case ActionArticleFilterEnums?.DESTROY_CURRENT_LANGUAGE:
        //TODO handle later
        handleToggleModalRemoveLanguage();
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
    handleToggleModalInstallHelpdesk();
    handleToggleModalGettingStarted();
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
            onClick={() => handleToggleModalNewArticle()}
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
      {/* <NoArticle /> */}
      {!isCategoriesPage ? <ArticleComponent /> : <CategoryComponent />}

      {isModalInstallHelpdesk && (
        <ModalConfirmInstallHelpDesk
          open={isModalInstallHelpdesk}
          onCancel={handleToggleModalInstallHelpdesk}
          onOK={handleInstallHelpdesk}
        />
      )}

      {isModalGettingStarted && (
        <ModalGettingStartedKnowledgeBase
          open={isModalGettingStarted}
          onCancel={handleToggleModalGettingStarted}
          onStart={() => {
            handleToggleModalGettingStarted();
          }}
        />
      )}

      {isModalAddLanguage && (
        <ModalAddALanguage
          open={isModalAddLanguage}
          onCancel={handleToggleModalAddLanguage}
          onOK={() => {
            handleToggleModalAddLanguage();
          }}
        />
      )}

      {isModalImportArticles && (
        <ModalImportArticles
          open={isModalImportArticles}
          onCancel={handleToggleModalImportArticles}
          onStart={() => {
            handleToggleModalImportArticles();
          }} />
      )}

      {isModalExportArticles && (
        <ModalExportArticles
          open={isModalExportArticles}
          onCancel={handleToggleModalExportArticles}
          onStart={() => {
            handleToggleModalExportArticles();
          }} />
      )}

      {isModalRemoveLanguage && (
        <ModalRemoveLanguage
          open={isModalRemoveLanguage}
          onCancel={handleToggleModalRemoveLanguage}
          onStart={() => {
            handleToggleModalRemoveLanguage();
          }} />
      )}

      {isModalNewArticles && (
        <ModalAddNewArticles
          open={isModalNewArticles}
          onCancel={handleToggleModalNewArticle}
          onStart={() => {
            handleToggleModalNewArticle();
          }} />
      )}
    </S.ArticleContentContainer>
  );
}

export default ArticleContent;
