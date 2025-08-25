import React from 'react';
import { Table, Avatar, Button, Tag, Image } from 'antd';
import icView from '@/assets/icons/billing/ic-export.svg';
import styled from 'styled-components';
import avatarDefault from '@/assets/images/avatar-default.png';
import { User } from '@/shared/interfaces/user.interface';

const CustomTable = styled(Table<User>)`
  .ant-table-cell {
    padding: 12px !important;
  }
`;

interface UserTableProps {
  users: User[];
  loading: boolean;
  pagination: any;
  onChange: (pagination: any) => void;
  selectedRowKeys: React.Key[];
  onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
  onRowClick?: (user: User) => void;
  onViewClick?: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  pagination,
  onChange,
  selectedRowKeys,
  onSelectChange,
  onRowClick,
  onViewClick,
}) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'firstName',
      render: (_: any, record: User) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar src={record.avatar || avatarDefault} />
          <span>
            {`${record.firstName || ''} ${record.lastName || ''}`.trim() ||
              'Guest'}
          </span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string | undefined) =>
        status ? (
          <Tag color={status === 'active' ? 'green' : 'red'}>
            {status.toUpperCase()}
          </Tag>
        ) : (
          <Tag color="default">UNKNOWN</Tag>
        ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (createdAt: string | undefined) =>
        createdAt ? new Date(createdAt).toLocaleDateString() : '—',
    },
    {
      title: 'View',
      key: 'view',
      render: (_: any, record: User) => (
        <Button type="link" onClick={() => onViewClick && onViewClick(record)}>
          <Image preview={false} src={icView} height={24} width={24} />
        </Button>
      ),
    },
  ];

  return (
    <CustomTable
      rowSelection={rowSelection}
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: false,
      }}
      onChange={onChange}
      onRow={(record) => ({
        onClick: () => onRowClick && onRowClick(record),
      })}
    />
  );
};

export default UserTable;
