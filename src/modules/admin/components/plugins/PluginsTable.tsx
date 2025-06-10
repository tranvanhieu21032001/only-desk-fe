import React, { useState } from 'react';
import { Table, Avatar, Dropdown, Menu, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const CustomTable = styled(Table)`
  .ant-table-cell {
    padding: 12px !important;
  }
`;
const PluginsTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Icon',
      dataIndex: 'iconUrl',
      render: (src: string) => <Avatar src={src} shape="square" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Version',
      dataIndex: 'version',
    },
    {
      title: '',
      dataIndex: 'actions',
      render: () => (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="remove">Remove</Menu.Item>
            </Menu>
          }
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
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
      name: 'SEO Optimizer',
      author: 'Plugin Co.',
      version: '1.2.3',
    },
    {
      key: '2',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
      name: 'Analytics Tracker',
      author: 'DevTools',
      version: '2.0.0',
    },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={data}
      rowKey="key"
      rowSelection={rowSelection}
    />
  );
};

export default PluginsTable;
