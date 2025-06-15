import React, { useState } from 'react';
import { Table, Image, Tag, Dropdown, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import * as S from './AllCategories.styles';
import Typography from '@/shared/components/common/Typography';

import icTrash from '@/assets/icons/knowledge-base/ic-trash.svg';
import icEdit from '@/assets/icons/knowledge-base/ic-edit-2.svg';
import icAdd from '@/assets/icons/knowledge-base/ic-add2.svg';

import { Category, RowItem, Section } from '@/modules/knowledge-base/interface';
import { ActionCategoryFilterEnums } from '@/modules/knowledge-base/helpers/enums/article';
import { useModal } from '@/shared/hooks';
import ModalAddNewCategory from '../modal-add-category/ModalAddNewCategory';
import { deleteHelpdeskCategory, deleteHelpdeskSection } from '@/modules/knowledge-base/api/knowledgebase.api';
import ModalAddASection from '../modal-add-a-section/ModalAddASection';

interface AllCategoriesProps {
  categories: Category[];
  onReload: () => void;
}

const AllCategories = ({ categories, onReload }: AllCategoriesProps) => {
  const { t } = useTranslation('knowledgeBase');

  const {
    visible: isModalEditCategory,
    toggle: handleToggleModalEditCategory,
  } = useModal();
  const {
    visible: isModalAddSection,
    toggle: toggleModalAddSection,
  } = useModal();

  const [categoryToAddSection, setCategoryToAddSection] = useState<Category | null>(null);
  const [sectionToEdit, setSectionToEdit] = useState<Section | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

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

  const handleActionFilterArticle = async (
    actionType: ActionCategoryFilterEnums,
    rowData: RowItem
  ) => {
    switch (actionType) {
      case ActionCategoryFilterEnums.EDIT_A_CATEGORY:
        const selectedCategory = categories.find(
          (cat) => cat.translations?.[cat.defaultLanguage || 'en']?.name === rowData.category
        );
        if (selectedCategory) {
          setCategoryToEdit(selectedCategory);
          handleToggleModalEditCategory();
        }
        return;

      case ActionCategoryFilterEnums.REMOVE_A_CATEGORY:
        const category = categories.find(
          (cat) => cat.translations?.[cat.defaultLanguage || 'en']?.name === rowData.category
        );
        if (category) {
          try {
            await deleteHelpdeskCategory(category.id);
            onReload();
            message.success(t('Xóa danh mục thành công'));
          } catch (error) {
            console.error(error);
            message.error(t('Xóa danh mục thất bại'));
          }
        }
        return;

      case ActionCategoryFilterEnums.REMOVE_A_SECTION:
        const sectionId = rowData.key.replace('section-', '');
        try {
          await deleteHelpdeskSection(sectionId);
          onReload();
        } catch (error) {
          console.error(error);
          message.error(t('Xóa mục thất bại'));
        }
        return;

      case ActionCategoryFilterEnums.ADD_A_NEW_SECTION:
        const targetCategory = categories.find(
          (cat) => cat.translations?.[cat.defaultLanguage || 'en']?.name === rowData.category
        );
        if (targetCategory) {
          setCategoryToAddSection(targetCategory);
          toggleModalAddSection();
        }
        return;

      case ActionCategoryFilterEnums.EDIT_A_SECTION:
        const secId = rowData.key.replace('section-', '');
        const matchedCategory = categories.find((cat) =>
          cat.sections.some((sec) => sec.id === secId)
        );
        const matchedSection = matchedCategory?.sections.find((sec) => sec.id === secId);

        if (matchedCategory && matchedSection) {
          setCategoryToAddSection(matchedCategory);
          setSectionToEdit(matchedSection);
          toggleModalAddSection();
        }
        return;

      default:
        break;
    }
  };

  const getDropdownMenu = (rowData: RowItem) => ({
    items: rowData.isCategoryRow
      ? [
          {
            key: 'add-section',
            icon: <Image src={icAdd} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.add-section')}</Typography>,
            onClick: () =>
              handleActionFilterArticle(ActionCategoryFilterEnums.ADD_A_NEW_SECTION, rowData),
          },
          {
            key: 'edit-category',
            icon: <Image src={icEdit} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
            onClick: () =>
              handleActionFilterArticle(ActionCategoryFilterEnums.EDIT_A_CATEGORY, rowData),
          },
          {
            key: 'remove-category',
            icon: <Image src={icTrash} width={24} height={24} preview={false} />,
            label: (
              <Typography padding="0 0 0 2px" color="red">
                {t('article-menu.actions.remove')}
              </Typography>
            ),
            onClick: () =>
              handleActionFilterArticle(ActionCategoryFilterEnums.REMOVE_A_CATEGORY, rowData),
          },
        ]
      : [
          {
            key: 'edit-section',
            icon: <Image src={icEdit} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
            onClick: () =>
              handleActionFilterArticle(ActionCategoryFilterEnums.EDIT_A_SECTION, rowData),
          },
          {
            key: 'remove-section',
            icon: <Image src={icTrash} width={24} height={24} preview={false} />,
            label: (
              <Typography padding="0 0 0 2px" color="red">
                {t('article-menu.actions.remove')}
              </Typography>
            ),
            onClick: () =>
              handleActionFilterArticle(ActionCategoryFilterEnums.REMOVE_A_SECTION, rowData),
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

      {isModalEditCategory && (
        <ModalAddNewCategory
          open={isModalEditCategory}
          onCancel={handleToggleModalEditCategory}
          onOK={() => {
            handleToggleModalEditCategory();
            onReload();
          }}
          onAddCategory={() => {}}
          categoryToEdit={categoryToEdit}
        />
      )}

      {isModalAddSection && categoryToAddSection && (
        <ModalAddASection
          open={isModalAddSection}
          onCancel={() => {
            toggleModalAddSection();
            setSectionToEdit(null);
          }}
          onOK={() => {
            toggleModalAddSection();
            setSectionToEdit(null);
            onReload();
          }}
          category={categoryToAddSection}
          sectionToEdit={sectionToEdit}
        />
      )}
    </S.TableWrapper>
  );
};

export default AllCategories;
