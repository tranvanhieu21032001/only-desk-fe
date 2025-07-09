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

import Typography from '@/shared/components/common/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { deleteHelpdeskArticle } from '@/modules/knowledge-base/api/knowledgebase.api';
import { fetchHelpdeskArticles } from '@/modules/knowledge-base/store/helpdeskArticleSlice';
import ModalEditArticles from '../../modal-edit-articles/ModalEditArticles';

export interface AllArticleInterface {
  key: string;
  title: string;
  content:string;
  status: string;
  statistic: string;
  created: string;
  lastUpdate: string;
  category: string;
  categoryId: string;
  isCategoryRow?: boolean;
}

const statusIcons: Record<string, string> = {
  archived: icArchived,
  draft: icDraft,
  published: icPublished,
};

const AllArticle = () => {
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.helpdeskCategory);
  const { items: articles, loading: articlesLoading, limit, page, total } = useSelector((state: RootState) => state.helpdeskArticles);
  const dispatch = useDispatch();
  const { t } = useTranslation('knowledgeBase');
  console.log("articles", articles);
  

  const isLoading = categoriesLoading || articlesLoading || categories.length === 0 || articles.length === 0;

  const [openModal, setOpenModal] = useState(false);
  const [articleData, setArticleData] = useState<AllArticleInterface | null>(null);

  const categoryMap = categories.reduce((acc: Record<string, string>, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const grouped = articles.reduce((acc: Record<string, AllArticleInterface[]>, article) => {
    const categoryName = categoryMap[article.categoryId] || 'Uncategorized';
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push({
      key: article.id,
      title: article.title,
      content:article?.content,
      status: article.status,
      statistic: article.viewCount?.toString() || '0',
      created: new Date(article.createdAt).toLocaleDateString(),
      lastUpdate: new Date(article.updatedAt).toLocaleDateString(),
      category: categoryName,
      categoryId: article.categoryId,
      isCategoryRow: false,
    });
    return acc;
  }, {});

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
      status: 'published',
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
        onClick: async () => {
          try {
            await deleteHelpdeskArticle(record?.key);
            dispatch(fetchHelpdeskArticles());
          } catch (error) {
            console.error('Failed to delete article:', error);
          }
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
            <span>{grouped[record.category]?.length || 0} {t('article-menu.actions.articles')}</span>
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
            rowSelection={{
              type: 'checkbox',
            }}
            expandable={{
              expandIcon: () => null,
            }}
            rowKey="key"
            pagination={{
              // onChange: onPageChange,
              showTotal: () => (
                <div style={{ marginRight: 50 }}>
                  Page {page} of {Math.ceil(total / limit)}
                </div>
              ),

            }}
          />
        )}
      </S.TableWrapper>
      <ModalEditArticles
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onStart={() => {
          // setOpenModal(false);
        }}
        article={articleData}
        />
      </>
  );
};

export default AllArticle;
