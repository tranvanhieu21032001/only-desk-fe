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

interface Section {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  translations: { [key: string]: { name: string } };
}

interface Category {
  id: string;
  name: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  translations: { [key: string]: { name: string; desc: string } };
  defaultLanguage: string;
  sections: Section[];
}

interface RowItem {
  key: string;
  title: string;
  description: string;
  statistic: string;
  created: string;
  lastUpdate: string;
  category: string;
  isCategoryRow: boolean;
}

const AllCategories = ({ categories }: { categories: Category[] }) => {
  const { t } = useTranslation('knowledgeBase');

  const categoryTableData: RowItem[] = categories.flatMap((category) => {
    const lang = category.defaultLanguage || 'en';
    const catName = category.translations?.[lang]?.name || category.name;
    const catDesc = category.translations?.[lang]?.desc || category.desc;

    const catRow: RowItem = {
      key: `category-${category.id}`,
      title: `Category: ${catName}`,
      description: catDesc || '',
      statistic: '',
      created: '',
      lastUpdate: '',
      category: catName,
      isCategoryRow: true,
    };

    const sectionRows: RowItem[] = category.sections.map((section) => {
      const secName = section.translations?.[lang]?.name || section.name;
      return {
        key: `section-${section.id}`,
        title: secName,
        description: '',
        statistic: '',
        created: new Date(section.createdAt).toLocaleDateString(),
        lastUpdate: new Date(section.updatedAt).toLocaleDateString(),
        category: catName,
        isCategoryRow: false,
      };
    });

    return [catRow, ...sectionRows];
  });

  const getDropdownMenu = (rowData: RowItem) => ({
    items: rowData.isCategoryRow
      ? [
          {
            key: 'add-category',
            icon: <Image src={icAdd} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.add-section')}</Typography>,
            onClick: () => console.log('Add Section to Category:', rowData.category),
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
        ]
      : [
          {
            key: 'edit-article',
            icon: <Image src={icEdit} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
            onClick: () => console.log('Edit Section:', rowData),
          },
          {
            key: 'remove-article',
            icon: <Image src={icTrash} width={24} height={24} preview={false} />,
            label: (
              <Typography padding="0 0 0 2px" color="red">
                {t('article-menu.actions.remove')}
              </Typography>
            ),
            onClick: () => console.log('Remove Section:', rowData),
          },
        ],
  });

  const columns: ColumnsType<RowItem> = [
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
        <Dropdown menu={getDropdownMenu(rowData)} trigger={['click']}>
          <MoreOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <S.TableWrapper>
      <Table<RowItem>
        columns={columns}
        dataSource={categoryTableData}
        rowSelection={{ type: 'checkbox' }}
        expandable={{ expandIcon: () => null }}
        rowKey="key"
        pagination={false}
      />
    </S.TableWrapper>
  );
};

export default AllCategories;
