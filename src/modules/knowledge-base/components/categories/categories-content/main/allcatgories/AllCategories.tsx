import React from 'react';
import { Table, Image, Tag, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import * as S from './AllCategories.styles';
import Typography from '@/shared/components/common/Typography';

import icTrash from '@/assets/icons/knowledge-base/ic-trash.svg';
import icEdit from '@/assets/icons/knowledge-base/ic-edit-2.svg';
import icAdd from '@/assets/icons/knowledge-base/ic-add2.svg';

import { AllCategoriesInterface } from '@/modules/knowledge-base/models/article.model';

const rawCategoryArticles: AllCategoriesInterface[] = [
  {
    key: '1',
    title: 'Welcome guide',
    description: 'Introductory guide for new users',
    statistic: '100',
    created: '2024-06-01',
    lastUpdate: '2024-06-02',
    category: 'Getting Started',
  },
  {
    key: '2',
    title: 'First Steps',
    description: 'Step-by-step guide to set up your workspace',
    statistic: '25',
    created: '2024-06-02',
    lastUpdate: '2024-06-02',
    category: 'Getting Started',
  },
  {
    key: '3',
    title: 'Advanced search',
    description: 'How to use advanced search filters',
    statistic: '75',
    created: '2024-05-20',
    lastUpdate: '2024-05-25',
    category: 'Automate',
  },
  {
    key: '4',
    title: 'API Access',
    description: 'Enable and manage API usage',
    statistic: '15',
    created: '2024-05-15',
    lastUpdate: '2024-05-20',
    category: 'Automate',
  },
];

const categoryTableData: AllCategoriesInterface[] = rawCategoryArticles.reduce(
  (acc: AllCategoriesInterface[], article) => {
    const categoryKey = `category-${article.category}`;
    const categoryExists = acc.some((item) => item.key === categoryKey);

    if (!categoryExists) {
      acc.push({
        key: categoryKey,
        category: article.category,
        isCategoryRow: true,
        title: `Category: ${article.category}`,
        description: `Description for ${article.category}`, // Mô tả giả lập
        statistic: '',
        created: '',
        lastUpdate: '',
      });
    }

    acc.push({ ...article, isCategoryRow: false });
    return acc;
  },
  [],
);

const getDropdownMenu = (rowData: AllCategoriesInterface, t: any) => {
  if (rowData.isCategoryRow) {
    return {
      items: [
        {
          key: 'add-category',
          icon: <Image src={icAdd} width={24} height={24} preview={false} />,
          label: <Typography padding="0 0 0 2px">{t('article-menu.actions.add-section')}</Typography>,
          onClick: () => console.log('Add Article to Category:', rowData.category),
        },
        {
          key: 'edit-category',
          icon: <Image src={icEdit} width={24} height={24} preview={false} />,
          label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
          onClick: () => console.log('Edit Category:', rowData.category),
        },
        {
          key: 'remove-category',
          icon: <Image src={icTrash} width={24} height={24} preview={false} />,
          label: (
            <Typography padding="0 0 0 2px" color="red">
              {t('article-menu.actions.remove')}
            </Typography>
          ),
          onClick: () => console.log('Remove Category:', rowData.category),
        },
      ],
    };
  }

  return {
    items: [
      {
        key: 'edit-article',
        icon: <Image src={icEdit} width={24} height={24} preview={false} />,
        label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
        onClick: () => console.log('Edit Article:', rowData),
      },
      {
        key: 'remove-article',
        icon: <Image src={icTrash} width={24} height={24} preview={false} />,
        label: (
          <Typography padding="0 0 0 2px" color="red">
            {t('article-menu.actions.remove')}
          </Typography>
        ),
        onClick: () => console.log('Remove Article:', rowData),
      },
    ],
  };
};

const AllCategories = () => {
  const { t } = useTranslation('knowledgeBase');

  const columns: ColumnsType<AllCategoriesInterface> = [
    {
      title: t('article-menu.actions.title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, rowData) =>
        rowData.isCategoryRow ? (
          <>
            <span style={{ fontWeight: 600 }}>Category:</span>{' '}
            <Tag color="green" style={{ color: '#1677ff' }}>
              {rowData.category}
            </Tag>
          </>
        ) : (
          <span>{rowData.title}</span>
        ),
    },
    {
      title: t('article-menu.actions.description'),
      dataIndex: 'description',
      key: 'description',
      render: (_, rowData) =>
        rowData.description ? (
          <span style={rowData.isCategoryRow ? { fontStyle: 'italic', color: '#888' } : {}}>
            {rowData.description}
          </span>
        ) : null,
    },
    {
      title: t('article-menu.actions.statistic'),
      dataIndex: 'statistic',
      key: 'statistic',
      render: (_, rowData) => (rowData.isCategoryRow ? null : rowData.statistic),
    },
    {
      title: t('article-menu.actions.created'),
      dataIndex: 'created',
      key: 'created',
      render: (_, rowData) => (rowData.isCategoryRow ? null : rowData.created),
    },
    {
      title: t('article-menu.actions.last-update'),
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (_, rowData) => (rowData.isCategoryRow ? null : rowData.lastUpdate),
    },
    {
      title: '',
      key: 'actions',
      align: 'right',
      render: (_, rowData) => (
        <Dropdown menu={getDropdownMenu(rowData, t)} trigger={['click']}>
          <MoreOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <S.TableWrapper>
      <Table<AllCategoriesInterface>
        columns={columns}
        dataSource={categoryTableData}
        rowSelection={{ type: 'checkbox' }}
        expandable={{ expandIcon: () => null }}
        rowKey="key"
      />
    </S.TableWrapper>
  );
};

export default AllCategories;
