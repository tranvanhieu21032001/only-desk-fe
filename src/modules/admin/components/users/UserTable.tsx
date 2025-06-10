import React, { useState } from 'react';
import { Table, Avatar, Dropdown, Menu, Button, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import * as S from './UserTable.styles';

const UserTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
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

  const data = [
    {
      key: '1',
      avatar: 'https://i.pravatar.cc/40',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      created: '2023-01-01',
    },
    {
      key: '2',
      avatar: 'https://i.pravatar.cc/41',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'inactive',
      created: '2023-02-01',
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      rowKey="key"
    />
  );
};

export default UserTable;
