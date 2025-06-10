import React, { useState, useEffect } from 'react';
import { Image, Table, Dropdown, Menu } from 'antd';

import { getShortcutsList } from '@/modules/settings/api/chatbox';

import Button from '@/shared/components/common/Button';
import AddShortcutModal from './AddShortcutModal';

import * as S from './MessageShortcuts.styles';

import iconTickCircle from '@/assets/icons/setting/ic-tick.svg';
import EmptyShortcut from '@/assets/images/settings/img-empty-shortcuts.png';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import iconBar from '@/assets/icons/setting/ic-bar.svg';

import type { Shortcut } from '@/modules/settings/models/chatbox.model';

const MessageShortcuts: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    getShortcutsList({})
      .then((res: any) => {
        setShortcuts(res.data || []);
      })
      .catch(() => setShortcuts([]));
  }, []);

  const columns = [
    {
      title: 'Shortcut',
      dataIndex: 'shortcut',
      key: 'shortcut',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: '',
      key: 'actions',
      render: (_: any, _record: Shortcut) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => { /* handle edit */ }}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => { /* handle delete */ }}>
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
              rowKey="id"
              pagination={false}
            />
          )}
        </S.ContentWrapper>
        <AddShortcutModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onSubmit={() => setOpenModal(false)}
        />
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
