import React from 'react';
import { Table, Image, Tag, Dropdown } from 'antd';
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

import { AllArticleInterface } from '@/modules/knowledge-base/models/article.model';
import Typography from '@/shared/components/common/Typography';

const rawArticles: AllArticleInterface[] = [
  {
    key: '1',
    title: 'Welcome guide',
    status: 'online',
    statistic: '100',
    created: '2024-06-01',
    lastUpdate: '2024-06-02',
    category: 'Getting Started',
  },
  {
    key: '2',
    title: 'First Steps',
    status: 'draft',
    statistic: '25',
    created: '2024-06-02',
    lastUpdate: '2024-06-02',
    category: 'Getting Started',
  },
  {
    key: '3',
    title: 'Advanced search',
    status: 'visible',
    statistic: '75',
    created: '2024-05-20',
    lastUpdate: '2024-05-25',
    category: 'Automate',
  },
  {
    key: '4',
    title: 'API Access',
    status: 'hidden',
    statistic: '15',
    created: '2024-05-15',
    lastUpdate: '2024-05-20',
    category: 'Automate',
  },
];

const statusIcons: Record<string, string> = {
  online: icOnline,
  draft: icDraft,
  hidden: icHidden,
  visible: icVisible,
};

const AllArticle = () => {
  const { t } = useTranslation('knowledgeBase');

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

  const flatData: AllArticleInterface[] = rawArticles.reduce(
    (acc: AllArticleInterface[], article) => {
      const categoryKey = `category-${article.category}`;
      const categoryExists = acc.some((item) => item.key === categoryKey);

      if (!categoryExists) {
        acc.push({
          key: categoryKey,
          category: article.category,
          isCategoryRow: true,
          title: '',
          status: 'online',
          statistic: '',
          created: '',
          lastUpdate: '',
        });
      }

      acc.push({
        ...article,
        isCategoryRow: false,
      });

      return acc;
    },
    []
  );

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
            <span> 10 {t('article-menu.actions.articles')}</span>
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
            <span style={{ textTransform: 'capitalize' }}>
              {t(`status.${status}`)}
            </span>
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
      />
    </S.TableWrapper>
  );
};

export default AllArticle;
