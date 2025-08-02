import { useState } from 'react';
import { Table, Image, Tag, Dropdown, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MoreOutlined } from '@ant-design/icons';

import * as S from './allarticle.styles';

import icPublished from '@/assets/icons/knowledge-base/ic-online.svg';
import icDraft from '@/assets/icons/knowledge-base/ic-draft.svg';
import icArchived from '@/assets/icons/knowledge-base/ic-visible.svg';
import icMonitor from '@/assets/icons/knowledge-base/ic-monitor.svg';
import icTrash from '@/assets/icons/knowledge-base/ic-trash.svg';
import icEdit from '@/assets/icons/knowledge-base/ic-edit-2.svg';
import icNoitify from '@/assets/icons/contact/ic-notify-contact.svg';

import Typography from '@/shared/components/common/Typography';
import { AppDispatch, RootState } from '@/core/store';
import { deleteHelpdeskArticle } from '@/modules/knowledge-base/api/knowledgebase.api';
import ModalEditArticles from '../../modal-edit-articles/ModalEditArticles';
import { formatDateTime } from '@/modules/knowledge-base/helpers/formatDateTime';
import { useDispatch, useSelector } from 'react-redux';
import { removeArticle } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import { ReactSVG } from 'react-svg';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

export interface AllArticleInterface {
  key: string;
  id?: string;
  title: string;
  content:string;
  status: string;
  statistic: string;
  created: string;
  lastUpdate: string;
  defaultLanguage?: string;
  category: string;
  categoryId: string;
  sectionId?: string;
  isCategoryRow?: boolean;
}

const selectFlatArticlesFromCategory = (
  categories: any[],
): AllArticleInterface[] => {
  return categories.flatMap((category: any) => {
    const directArticles = (category.articles || []).map((article: any) => ({
      key: article.rawId,
      id: article.id,
      title: article.title,
      content: article.content,
      status: article?.status.toLowerCase(),
      statistic: article?.viewCount + " visits",
      created: formatDateTime(article.createdAt || ''),
      lastUpdate: formatDateTime(article.updatedAt || ''),
      defaultLanguage: article?.defaultLanguage,
      category: category.name,
      categoryId: category.id,
      isCategoryRow: false,
    }));

    const sectionArticles = (category.sections || []).flatMap((section: any) =>
      (section.articles || []).map((article: any) => ({
        key: article.rawId,
        id: article.id,
        title: article.title,
        content: article.content,
        status: article?.status.toLowerCase(),
        statistic: article?.viewCount + " visits",
        created: formatDateTime(article.createdAt || ''),
        lastUpdate: formatDateTime(article.updatedAt || ''),
        defaultLanguage: article?.defaultLanguage,
        category: category.name,
        categoryId: category.id,
        sectionId: section.id,
        isCategoryRow: false,
      })),
    );

    return [...directArticles, ...sectionArticles];
  });
};

const statusIcons: Record<string, string> = {
  archived: icArchived,
  draft: icDraft,
  published: icPublished,
};

const AllArticle = () => {
  const { t } = useTranslation('knowledgeBase');
  const dispatch = useDispatch<AppDispatch>();

  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.helpdeskCategory,
  );

  const articles = selectFlatArticlesFromCategory(categories);

  const isLoading =
    categoriesLoading || categories.length === 0 || articles.length === 0;

  const [openModal, setOpenModal] = useState(false);
  const [articleData, setArticleData] = useState<AllArticleInterface | null>(
    null,
  );

  const [articleToDelete, setArticleToDelete] =
    useState<AllArticleInterface | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const grouped = articles.reduce(
    (acc: Record<string, AllArticleInterface[]>, article) => {
      const categoryName = article.category || 'Uncategorized';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(article);
      return acc;
    },
    {},
  );

  const flatData: AllArticleInterface[] = [];

  Object.entries(grouped).forEach(([category, articles]) => {
    const categoryId = articles[0]?.categoryId || '';
    flatData.push({
      key: `category-${category}`,
      category,
      categoryId,
      isCategoryRow: true,
      title: '',
      content:'',
      status: '',
      statistic: '',
      created: '',
      lastUpdate: '',
    });
    flatData.push(...articles);
  });

  const dropdownMenu = (record: AllArticleInterface) => ({
    items: [
      {
        key: 'view',
        icon: <Image src={icMonitor} width={20} height={20} preview={false} />,
        label: <Typography padding="0 0 0 2px">{t('article-menu.actions.view')}</Typography>,
        onClick: () => console.log('View', record),
      },
      {
        key: 'edit',
        icon: <Image src={icEdit} width={20} height={20} preview={false} />,
        label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
        onClick: () => {
          setArticleData(record);
          setOpenModal(true);
        },
      },
      {
        key: 'remove',
        icon: <Image src={icTrash} width={20} height={20} preview={false} />,
        label: (
          <Typography padding="0 0 0 2px" color="red">
            {t('article-menu.actions.remove')}
          </Typography>
        ),
        onClick: () => {
          setArticleToDelete(record);
          setConfirmDeleteOpen(true);
        },
      },
    ],
  });

  const columns: ColumnsType<AllArticleInterface> = [
    {
      title: t('article-menu.actions.title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) =>
        record.isCategoryRow ? (
          <>
            <span style={{ fontWeight: 600 }}>{t('article-menu.actions.category')}:</span>{' '}
            <Tag color="green" style={{ color: '#1677ff' }}>
              {record.category}
            </Tag>{' '}
            <span>
              {grouped[record.category]?.length || 0}{' '}
              {t('article-menu.actions.articles')}
            </span>
          </>
        ) : (
          <span>{record.title}</span>
        ),
    },
    {
      title: t('article-menu.actions.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, record) =>
        record.isCategoryRow ? null : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Image src={statusIcons[status]} preview={false} />
            <span style={{ textTransform: 'capitalize' }}>{t(`${status}`)}</span>
          </div>
        ),
    },
    {
      title: t('article-menu.actions.statistic'),
      dataIndex: 'statistic',
      key: 'statistic',
      render: (_, record) => (record.isCategoryRow ? null : record.statistic),
    },
    {
      title: t('article-menu.actions.created'),
      dataIndex: 'created',
      key: 'created',
      render: (_, record) => (record.isCategoryRow ? null : record.created),
    },
    {
      title: t('article-menu.actions.last-update'),
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (_, record) => (record.isCategoryRow ? null : record.lastUpdate),
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) =>
        record.isCategoryRow ? null : (
          <Dropdown menu={dropdownMenu(record)} trigger={['click']}>
            <MoreOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
          </Dropdown>
        ),
    },
  ];

  return (
    <>
      <S.TableWrapper>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
          <Table<AllArticleInterface>
            columns={columns}
            dataSource={flatData}
            rowSelection={{ type: 'checkbox' }}
            expandable={{ expandIcon: () => null }}
            rowKey="key"
            pagination={false}
          />
        )}
      </S.TableWrapper>
      <ModalEditArticles
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onStart={() => {}}
        article={articleData}
      />

      <Modal
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        hideHeader
        width={440}
        footer={
          <S.WrappButton>
            <Button onClick={() => setConfirmDeleteOpen(false)}>
              {t('article-menu.cancel')}
            </Button>
            <Button
              type="danger"
              onClick={async () => {
                if (articleToDelete) {
                  try {
                    await deleteHelpdeskArticle(articleToDelete.key);
                    dispatch(removeArticle(articleToDelete.key));
                  } catch (error) {
                    console.error('Failed to delete article:', error);
                  } finally {
                    setConfirmDeleteOpen(false);
                    setArticleToDelete(null);
                  }
                }
              }}
            >
              {t('article-menu.remove')}
            </Button>
          </S.WrappButton>
        }
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <ReactSVG src={icNoitify} />
          <div>
            <Typography fontWeight={fontWeight.semiBold} margin="0 0 12px 0">
              Remove article
            </Typography>
            <Typography color="#5B5B5B">
              Delete article and all its data permanently?
            </Typography>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllArticle;
