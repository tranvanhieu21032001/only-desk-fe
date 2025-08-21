import React from 'react';
import { Table, Avatar, Button, Tag, Image } from 'antd';
import icView from '@/assets/icons/billing/ic-export.svg';
import styled from 'styled-components';
import avatarDefault from '@/assets/images/avatar-default.png';

const CustomTable = styled(Table)`
  .ant-table-cell {
    padding: 12px !important;
  }
`;

interface UserTableProps {
  users: any[];
  loading: boolean;
  pagination: any;
  onChange: (pagination: any) => void;
  selectedRowKeys: React.Key[];
  onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
  onRowClick?: (user: any) => void;
  onViewClick?: (user: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  pagination,
  onChange,
  selectedRowKeys,
  onSelectChange,
  onRowClick,
  onViewClick
}) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar src={record.avatar || avatarDefault} />
          <span>{record.name}</span>
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
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created',
    },
    {
      title: 'View',
      key: 'view',
      render: (_: any, record: any) => (
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
      rowKey="key"
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
