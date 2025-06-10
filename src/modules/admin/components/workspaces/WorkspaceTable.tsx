import React from 'react';
import { Table, Tag, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import * as S from './WorkspaceTable.styles';

interface Workspace {
  key: string;
  websiteUrl: string;
  websiteID: string;
  contactEmail: string;
  owner: string;
  status: string;
  created: string;
}

interface Props {
  data: Workspace[];
  onRowSelectionChange?: (selectedRows: Workspace[]) => void;
}

const WorkspaceTable: React.FC<Props> = ({ data, onRowSelectionChange }) => {
  const columns = [
    {
      title: 'Website URL',
      dataIndex: 'websiteUrl',
      key: 'websiteUrl',
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: 'Website ID',
      dataIndex: 'websiteID',
      key: 'websiteID',
    },
    {
      title: 'Contact Email',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Dropdown
          overlay={
            <Menu
              items={[
                { key: 'edit', label: 'Edit' },
                { key: 'delete', label: 'Delete' },
              ]}
              onClick={(info) => console.log(info.key)}
            />
          }
          trigger={['click']}
        >
          <S.ActionButton>
            <MoreOutlined />
          </S.ActionButton>
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Workspace[]) => {
      onRowSelectionChange?.(selectedRows);
    },
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowSelection={rowSelection}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default WorkspaceTable;
