import React from 'react';
import { Table, Avatar, Dropdown, Menu, Button, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  pagination,
  onChange,
  selectedRowKeys,
  onSelectChange,
}) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: '',
      dataIndex: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
      width: 50,
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
    />
  );
};

export default UserTable;
