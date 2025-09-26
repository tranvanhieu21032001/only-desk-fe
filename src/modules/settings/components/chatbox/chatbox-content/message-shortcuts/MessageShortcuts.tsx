import React, { useState, useEffect } from 'react';
import { Image, Dropdown, Menu } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks';

import { getShortcutsList, handleDeleteShortcut } from '@/modules/settings/api/chatbox';

import Button from '@/shared/components/common/Button';
import AddShortcutModal from './AddShortcutModal';
import EditShortcutModal from './EditShortcutModal';
import CustomModal from '@/shared/components/common/Modal';
import Table from '@/shared/components/common/Table';

import * as S from './MessageShortcuts.styles';

import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';
import EmptyShortcut from '@/assets/images/settings/img-empty-shortcuts.png';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import iconBar from '@/assets/icons/setting/ic-bar.svg';

import type { Shortcut, ShortcutsList } from '@/modules/settings/models/chatbox.model';
import { KEY_PAGE } from '@/shared/constant/common';
import { constants } from '@/core/settings';

const MessageShortcuts: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingShortcut, setDeletingShortcut] = useState<Shortcut | null>(null);
  const [searchParams] = useSearchParams();
  const { currentObjHistory } = useAppSelector((state) => state.historyRoute);
  const page =
    Number(
      (currentObjHistory || []).find((item: { key: string; value: any }) => item.key === KEY_PAGE)?.value
    ) ||
    Number(searchParams.get(KEY_PAGE)) ||
    1;

  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    if (page === 1) {
      const cached = localStorage.getItem(constants.SHORTCUTS_PAGE);
      if (cached) {
        const parsed = JSON.parse(cached) as ShortcutsList;
        return parsed.data || [];
      }
    }
    return [];
  });

  const [totalDocs, setTotalDocs] = useState(() => {
    if (page === 1) {
      const cached = localStorage.getItem(constants.SHORTCUTS_PAGE);
      if (cached) {
        const parsed = JSON.parse(cached) as ShortcutsList;
        return parsed.total || 0;
      }
    }
    return 0;
  });

  const fetchShortcuts = (page = 1, useCache = true) => {
    if (page === 1 && useCache) {
      const cached = localStorage.getItem(constants.SHORTCUTS_PAGE);
      if (cached) {
        const parsed = JSON.parse(cached) as ShortcutsList;
        setShortcuts(parsed.data || []);
        setTotalDocs(parsed.total || 0);
        return;
      }
    }

    getShortcutsList({ page, limit: 10 })
      .then((res: ShortcutsList) => {
        setShortcuts(res.data || []);
        setTotalDocs(res.total || 0);

        if (page === 1) {
          localStorage.setItem(constants.SHORTCUTS_PAGE, JSON.stringify(res));
        }
      })
      .catch(() => {
        setShortcuts([]);
        setTotalDocs(0);
      });
  };

  useEffect(() => {
    fetchShortcuts(page);
  }, [page]);

  const handleDelete = (record: Shortcut) => {
    setDeletingShortcut(record);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingShortcut) {
      await handleDeleteShortcut(deletingShortcut.id);
      setDeleteModalOpen(false);
      setDeletingShortcut(null);
      fetchShortcuts(page, false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingShortcut(null);
  };

  const columns = [
    {
      title: 'Shortcut',
      dataIndex: 'shortcut',
      key: 'shortcut',
      width: 180,
      minWidth: 120,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 300,
      minWidth: 180,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      width: 120,
      minWidth: 80,
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      minWidth: 40,
      render: (_: any, record: Shortcut) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => {
                setEditingShortcut(record);
                setOpenEditModal(true);
              }}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => handleDelete(record)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <img
            src={iconBar}
            alt="actions"
            style={{ cursor: 'pointer', width: 24, height: 24 }}
            onClick={e => e.stopPropagation()}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>Message shortcuts</S.Title>
        </S.Header>
        <S.ContentWrapper>
          <S.SubHeader>
            <S.SubHeaderText>Manage all shortcut</S.SubHeaderText>
            <Button
              type="primary"
              width="auto"
              icon={
                <Image src={addHeader} preview={false} width={20} height={20} />
              }
              iconPosition="left"
              onClick={() => setOpenModal(true)}
            >
              Add A New Shortcut
            </Button>
          </S.SubHeader>
          {shortcuts.length === 0 ? (
            <S.EmptyContent>
              <S.EmptyImage src={EmptyShortcut} alt="No shortcuts" />
              <S.EmptyTitle>You have no shortcut</S.EmptyTitle>
              <S.EmptyDesc>Your shortcuts will appear here.</S.EmptyDesc>
            </S.EmptyContent>
          ) : (
            <Table
              columns={columns}
              dataSource={shortcuts}
              totalDocs={totalDocs}
              rowKey="id"
            />
          )}
        </S.ContentWrapper>
        <AddShortcutModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onSubmit={() => {
            setOpenModal(false);
            fetchShortcuts(page, false);
          }}
        />
        
        <EditShortcutModal
          open={openEditModal}
          onCancel={() => {
            setOpenEditModal(false);
            setEditingShortcut(null);
          }}
          onSubmit={() => {
            setOpenEditModal(false);
            setEditingShortcut(null);
            fetchShortcuts(page, false);
          }}
          shortcutData={editingShortcut}
        />
        <CustomModal
          isOpen={deleteModalOpen}
          onClose={handleCancelDelete}
          title="Delete Shortcut"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button type="default" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button type="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          }
        >
          <div>Are you sure you want to delete shortcut "{deletingShortcut?.shortcut}"?</div>
        </CustomModal>
      </S.Container>

      <S.DiffrentContainer>
        <div></div>
        <S.AutoSaveIndicator>
          <img src={iconTickCircle} alt="auto-save" />
          <p>Automatically saved</p>
        </S.AutoSaveIndicator>
      </S.DiffrentContainer>
    </>
  );
};

export default MessageShortcuts;
