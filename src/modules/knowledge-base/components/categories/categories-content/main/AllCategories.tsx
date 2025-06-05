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

// ✅ Dữ liệu mẫu
const rawCategoryArticles: AllCategoriesInterface[] = [
  {
    key: '1',
    title: 'Welcome guide',
    statistic: '100',
    created: '2024-06-01',
    lastUpdate: '2024-06-02',
    category: 'Getting Started',
  },
  {
    key: '2',
    title: 'First Steps',
    statistic: '25',
    created: '2024-06-02',
    lastUpdate: '2024-06-02',
    category: 'Getting Started',
  },
  {
    key: '3',
    title: 'Advanced search',
    statistic: '75',
    created: '2024-05-20',
    lastUpdate: '2024-05-25',
    category: 'Automate',
  },
  {
    key: '4',
    title: 'API Access',
    statistic: '15',
    created: '2024-05-15',
    lastUpdate: '2024-05-20',
    category: 'Automate',
  },
];

// ✅ Group theo category (có dòng header cho mỗi category)
const categoryTableData: AllCategoriesInterface[] = rawCategoryArticles.reduce(
  (acc: AllCategoriesInterface[], article) => {
    const categoryKey = `category-${article.category}`;
    const categoryExists = acc.some((item) => item.key === categoryKey);

    if (!categoryExists) {
      acc.push({
        key: categoryKey,
        category: article.category,
        isCategoryRow: true,
        title: '',
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

// ✅ Menu dropdown action
const getDropdownMenu = (rowData: AllCategoriesInterface, t: any) => {
  if (rowData.isCategoryRow) {
    return {
      items: [
        {
          key: 'add-category',
          icon: <Image src={icAdd} width={24} height={24} preview={false} />,
          label: <Typography padding="0 0 0 2px">{t('article-menu.getting-started-knowledge.add')}</Typography>,
          onClick: () => console.log('Add Article to Category:', rowData.category),
        },
        {
          key: 'edit-category',
          icon: <Image src={icEdit} width={24} height={24} preview={false} />,
          label: <Typography padding="0 0 0 2px">{t('article-menu.getting-started-knowledge.edit')}</Typography>,
          onClick: () => console.log('Edit Category:', rowData.category),
        },
        {
          key: 'remove-category',
          icon: <Image src={icTrash} width={24} height={24} preview={false} />,
          label: (
            <Typography padding="0 0 0 2px" color="red">
              {t('article-menu.getting-started-knowledge.remove')}
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
        label: <Typography padding="0 0 0 2px">{t('article-menu.article.edit')}</Typography>,
        onClick: () => console.log('Edit Article:', rowData),
      },
      {
        key: 'remove-article',
        icon: <Image src={icTrash} width={24} height={24} preview={false} />,
        label: (
          <Typography padding="0 0 0 2px" color="red">
            {t('article-menu.article.remove')}
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, rowData) =>
        rowData.isCategoryRow ? (
          <>
            <span style={{ fontWeight: 600 }}>Category:</span>{' '}
            <Tag color="green" style={{ color: '#1677ff' }}>
              {rowData.category}
            </Tag>{' '}
            <span>6 articles</span>
          </>
        ) : (
          <span>{rowData.title}</span>
        ),
    },
    {
      title: 'Statistic',
      dataIndex: 'statistic',
      key: 'statistic',
      render: (_, rowData) => (rowData.isCategoryRow ? null : rowData.statistic),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (_, rowData) => (rowData.isCategoryRow ? null : rowData.created),
    },
    {
      title: 'Last Update',
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
