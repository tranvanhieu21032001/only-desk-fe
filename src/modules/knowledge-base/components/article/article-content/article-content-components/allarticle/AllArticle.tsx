import React from 'react';
import { Table, Image, Tag, Dropdown, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { MoreOutlined } from '@ant-design/icons';
import * as S from './allarticle.styles';

import icOnline from '@/assets/icons/knowledge-base/ic-online.svg';
import icDraft from '@/assets/icons/knowledge-base/ic-draft.svg';
import icHidden from '@/assets/icons/knowledge-base/ic-hidden.svg';
import icVisible from '@/assets/icons/knowledge-base/ic-visible.svg';
import icMonitor from '@/assets/icons/knowledge-base/ic-monitor.svg';
import icTrash from '@/assets/icons/knowledge-base/ic-trash.svg';
import icEdit from '@/assets/icons/knowledge-base/ic-edit-2.svg';

import Typography from '@/shared/components/common/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';

interface ArticleAPIResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  slug: string;
  translations: Record<string, { title: string; content: string }>;
  defaultLanguage: string;
  categoryId: string;
  tags: string[];
  status: string;
  viewCount: number;
}

interface AllArticleInterface {
  key: string;
  title: string;
  status: string;
  statistic: string;
  created: string;
  lastUpdate: string;
  category: string;
  isCategoryRow: boolean;
}

interface AllArticleProps {
  articles: ArticleAPIResponse[];
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const statusIcons: Record<string, string> = {
  online: icOnline,
  draft: icDraft,
  hidden: icHidden,
  visible: icVisible,
  published: icOnline,
};

const AllArticle: React.FC<AllArticleProps> = ({
  articles,
  currentPage,
  pageSize,
  total,
  onPageChange,
}) => {
  const { t } = useTranslation('knowledgeBase');
  const { categories, loading } = useSelector((state: RootState) => state.helpdeskCategory);

  const getCategoryNameById = (id: string): string => {
    const found = categories.find((cat) => cat.id === id);
    return found ? found.name : 'Uncategorized';
  };

  if (loading || !categories.length) return <Skeleton active />;

  const transformedData: AllArticleInterface[] = articles.map((article) => ({
    key: article.id,
    title: article.translations?.en?.title || article.title,
    status: article.status,
    statistic: article.viewCount.toString(),
    created: article.createdAt.split('T')[0],
    lastUpdate: article.updatedAt.split('T')[0],
    category: getCategoryNameById(article.categoryId),
    isCategoryRow: false,
  }));

  const flatData: AllArticleInterface[] = transformedData.reduce<AllArticleInterface[]>((acc, article) => {
    const categoryKey = `category-${article.category}`;
    const categoryExists = acc.some((item) => item.key === categoryKey);

    if (!categoryExists) {
      acc.push({
        key: categoryKey,
        category: article.category,
        isCategoryRow: true,
        title: '',
        status: '',
        statistic: '',
        created: '',
        lastUpdate: '',
      });
    }

    acc.push(article);
    return acc;
  }, []);

  const dropdownMenu = (record: AllArticleInterface) => ({
    items: [
      {
        key: 'view',
        icon: <Image src={icMonitor} width={24} height={24} preview={false} />,
        label: <Typography padding="0 0 0 2px">{t('article-menu.actions.view')}</Typography>,
        onClick: () => console.log('View', record),
      },
      {
        key: 'edit',
        icon: <Image src={icEdit} width={24} height={24} preview={false} />,
        label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
        onClick: () => console.log('Edit', record),
      },
      {
        key: 'remove',
        icon: <Image src={icTrash} width={24} height={24} preview={false} />,
        label: (
          <Typography padding="0 0 0 2px" color="red">
            {t('article-menu.actions.remove')}
          </Typography>
        ),
        onClick: () => console.log('Remove', record),
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
            </Tag>
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
            <span style={{ textTransform: 'capitalize' }}>{status}</span>
          </div>
        ),
    },
    {
      title: t('article-menu.actions.statistic'),
      dataIndex: 'statistic',
      key: 'statistic',
      render: (_, record) => (record.isCategoryRow ? null : <span>{record.statistic} visit</span>),
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
    <S.TableWrapper>
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
          current: currentPage,
          pageSize,
          total,
          onChange: onPageChange,
          showTotal: (total, range) => (
            <div style={{ marginRight: 50 }}>
              Page {currentPage} of {Math.ceil(total / pageSize)}
            </div>
          ),

        }}

      />
    </S.TableWrapper>
  );
};

export default AllArticle;
