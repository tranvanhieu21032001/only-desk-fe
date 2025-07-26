import { useState } from 'react';
import { Table, Image, Tag, Dropdown, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';

import * as S from './AllCategories.styles';
import Typography from '@/shared/components/common/Typography';
import Button from '@/shared/components/common/Button';
import Modal from '@/shared/components/common/Modal';

import icTrash from '@/assets/icons/knowledge-base/ic-trash.svg';
import icEdit from '@/assets/icons/knowledge-base/ic-edit-2.svg';
import icAdd from '@/assets/icons/knowledge-base/ic-add2.svg';
import icNoitify from '@/assets/icons/contact/ic-notify-contact.svg';

import { Category, RowItem, Section } from '@/modules/knowledge-base/interface';
import { ActionCategoryFilterEnums } from '@/modules/knowledge-base/helpers/enums/article';
import { deleteHelpdeskCategory, deleteHelpdeskSection } from '@/modules/knowledge-base/api/knowledgebase.api';

import { useModal } from '@/shared/hooks';
import ModalAddNewCategory from '../modal-add-category/ModalAddNewCategory';
import ModalAddASection from '../modal-add-a-section/ModalAddASection';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { formatDateTime } from '@/modules/knowledge-base/helpers/formatDateTime';

interface AllCategoriesProps {
  categories: Category[];
  onReload: () => void;
}

const AllCategories = ({ categories, onReload }: AllCategoriesProps) => {
  const { t } = useTranslation('knowledgeBase');

  const {
    visible: isModalEditCategory,
    toggle: toggleModalEditCategory,
  } = useModal();
  const {
    visible: isModalAddSection,
    toggle: toggleModalAddSection,
  } = useModal();

  const [categoryToAddSection, setCategoryToAddSection] = useState<Category | null>(null);
  const [sectionToEdit, setSectionToEdit] = useState<Section | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
  const [deleteTargetType, setDeleteTargetType] = useState<'category' | 'section' | null>(null);

  const showConfirmModal = (action: () => void, type: 'category' | 'section') => {
    setConfirmAction(() => action);
    setDeleteTargetType(type);
    setIsConfirmModalOpen(true);
  };


  const categoryTableData: RowItem[] = categories.flatMap((category) => {
    const lang = category.defaultLanguage || 'en';
    const catName = category.translations?.[lang]?.name || category.name;
    const catDesc = category.translations?.[lang]?.desc || category.desc;

    const sectionRows = category.sections.map((section) => {
      const secName = section.translations?.[lang]?.name || section.name;
      return {
        key: `section-${section.id}`,
        title: secName,
        description: '',
        statistic: `${section.articles?.length || 0} articles`,
        createdAt: formatDateTime(section.createdAt || ''),
        updatedAt: formatDateTime(section.updatedAt || ''),
        category: catName,
        isCategoryRow: false,
      };
    });

    return [
      {
        key: `category-${category.id}`,
        title: `Category: ${catName}`,
        description: catDesc || '',
        statistic: '',
        createdAt: '',
        updatedAt: '',
        category: catName,
        isCategoryRow: true,
      },
      ...sectionRows,
    ];
  });

  const handleAction = async (actionType: ActionCategoryFilterEnums, rowData: RowItem) => {
    if (!rowData.key) return;

    if (rowData.isCategoryRow) {
      const categoryId = rowData.key.replace('category-', '');
      const category = categories.find((cat) => cat.id === categoryId);
      if (!category) return;

      const lang = category.defaultLanguage || 'en';
      const catName = category.translations?.[lang]?.name || category.name;

      switch (actionType) {
        case ActionCategoryFilterEnums.EDIT_A_CATEGORY:
          setCategoryToEdit(category);
          toggleModalEditCategory();
          break;

        case ActionCategoryFilterEnums.REMOVE_A_CATEGORY:
        showConfirmModal(async () => {
          await deleteHelpdeskCategory(category.id);
          onReload();
        }, 'category');

          break;

        case ActionCategoryFilterEnums.ADD_A_NEW_SECTION:
          setCategoryToAddSection(category);
          toggleModalAddSection();
          break;
      }
    } else {
      const sectionId = rowData.key.replace('section-', '');
      const category = categories.find((cat) => cat.sections.some((sec) => sec.id === sectionId));
      const section = category?.sections.find((sec) => sec.id === sectionId);
      if (!category || !section) return;

      const lang = category.defaultLanguage || 'en';
      const secName = section.translations?.[lang]?.name || section.name;

      switch (actionType) {
        case ActionCategoryFilterEnums.EDIT_A_SECTION:
          setCategoryToAddSection(category);
          setSectionToEdit(section);
          toggleModalAddSection();
          break;

        case ActionCategoryFilterEnums.REMOVE_A_SECTION:
          showConfirmModal(async () => {
            await deleteHelpdeskSection(sectionId);
            onReload();
          }, 'section');
          break;
      }
    }
  };

  const getDropdownMenu = (rowData: RowItem) => ({
    items: rowData.isCategoryRow
      ? [
          {
            key: 'add-section',
            icon: <Image src={icAdd} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.add-section')}</Typography>,
            onClick: () => handleAction(ActionCategoryFilterEnums.ADD_A_NEW_SECTION, rowData),
          },
          {
            key: 'edit-category',
            icon: <Image src={icEdit} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
            onClick: () => handleAction(ActionCategoryFilterEnums.EDIT_A_CATEGORY, rowData),
          },
          {
            key: 'remove-category',
            icon: <Image src={icTrash} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px" color="red">{t('article-menu.actions.remove')}</Typography>,
            onClick: () => handleAction(ActionCategoryFilterEnums.REMOVE_A_CATEGORY, rowData),
          },
        ]
      : [
          {
            key: 'edit-section',
            icon: <Image src={icEdit} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px">{t('article-menu.actions.edit')}</Typography>,
            onClick: () => handleAction(ActionCategoryFilterEnums.EDIT_A_SECTION, rowData),
          },
          {
            key: 'remove-section',
            icon: <Image src={icTrash} width={24} height={24} preview={false} />,
            label: <Typography padding="0 0 0 2px" color="red">{t('article-menu.actions.remove')}</Typography>,
            onClick: () => handleAction(ActionCategoryFilterEnums.REMOVE_A_SECTION, rowData),
          },
        ],
  });

  const columns: ColumnsType<RowItem> = [
    {
      title: t('article-menu.actions.title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, row) =>
        row.isCategoryRow ? (
          <>
            <span style={{ fontWeight: 600 }}>Category:</span>{' '}
            <Tag color="green" style={{ color: '#1677ff' }}>{row.category}</Tag>
          </>
        ) : (
          row.title
        ),
    },
    {
      title: t('article-menu.actions.description'),
      dataIndex: 'description',
      key: 'description',
      render: (_, row) =>
        row.description ? (
          <span style={row.isCategoryRow ? { fontStyle: 'italic', color: '#888' } : {}}>
            {row.description}
          </span>
        ) : null,
    },
    {
      title: t('article-menu.actions.statistic'),
      dataIndex: 'statistic',
      key: 'statistic',
      render: (_, row) => (!row.isCategoryRow ? row.statistic : null),
    },
    {
      title: t('article-menu.actions.created'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, row) => (!row.isCategoryRow ? row.createdAt : null),
    },
    {
      title: t('article-menu.actions.last-update'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, row) => (!row.isCategoryRow ? row.updatedAt : null),
    },
    {
      title: '',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <Dropdown menu={getDropdownMenu(row)} trigger={['click']}>
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

      {isModalEditCategory && categoryToEdit && (
        <ModalAddNewCategory
          open={isModalEditCategory}
          onCancel={toggleModalEditCategory}
          onOK={() => {
            toggleModalEditCategory();
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
            setCategoryToAddSection(null);
          }}
          onOK={() => {
            toggleModalAddSection();
            setSectionToEdit(null);
            setCategoryToAddSection(null);
            onReload();
          }}
          category={categoryToAddSection}
          sectionToEdit={sectionToEdit}
        />
      )}

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        hideHeader
        width={440}
        footer={
          <S.WrappButton>
            <Button onClick={() => setIsConfirmModalOpen(false)}>{t('article-menu.cancel')}</Button>
            <Button
              type="danger"
              onClick={async () => {
                setIsConfirmModalOpen(false);
                await confirmAction();
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
        Remove {deleteTargetType}
      </Typography>
      <Typography color="#5B5B5B">
        Delete {deleteTargetType} and all its data permanently?
      </Typography>
    </div>
  </div>
      </Modal>
    </S.TableWrapper>
  );
};

export default AllCategories;
