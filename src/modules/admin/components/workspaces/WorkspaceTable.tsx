import React, { useState, useMemo } from 'react';
import { Table, Tag, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import * as S from './WorkspaceTable.styles';
import dayjs from 'dayjs';
import WorkspaceDrawer from './components/WorkspaceDrawer';

const TableWrapper = styled.div`
  .ant-table-cell {
    padding: 12px !important;
  }
`;

interface Props {
  data: any[];
  loading: boolean;
  onRowSelectionChange?: (selectedRows: any[]) => void;
}

const WorkspaceTable: React.FC<Props> = ({
  data,
  loading,
  onRowSelectionChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any | null>(null);

  const formattedData = useMemo(() => {
    return (data || []).map((item, idx) => ({
      key: item._id || idx,
      name: item.name || '-',
      websiteUrl: item.websiteUrl || '-',
      websiteID: item.websiteID || '-',
      plan: item.plan ? item.plan.toUpperCase() : '-',
      owner:
        `${item.owner?.firstName || ''} ${item.owner?.lastName || ''}`.trim() ||
        '-',
      status: item.status || 'DRAFT',
      created: item.createdAt
        ? dayjs(item.createdAt).format('YYYY-MM-DD')
        : '-',
      raw: item,
    }));
  }, [data]);

  const handleMenuClick = (record: any, key: string) => {
    if (key === 'edit') {
      setSelectedWorkspace(record);
      setOpen(true);
    } else if (key === 'delete') {
      console.log('Delete:', record);
    }
  };

  const columns = [
    { title: 'Workspace Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Website URL',
      dataIndex: 'websiteUrl',
      key: 'websiteUrl',
      render: (url: string) =>
        url && url !== '-' ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          '-'
        ),
    },
    { title: 'Website ID', dataIndex: 'websiteID', key: 'websiteID' },
    { title: 'Plan', dataIndex: 'plan', key: 'plan' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        switch (status?.toUpperCase()) {
          case 'DRAFT':
            color = 'blue';
            break;
          case 'PENDING':
            color = 'orange';
            break;
          case 'INSTALLED':
            color = 'green';
            break;
          case 'CLOSED':
            color = 'red';
            break;
        }
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    { title: 'Created', dataIndex: 'created', key: 'created' },
    {
      title: '',
      key: 'action',
      render: (_: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                { key: 'edit', label: 'Edit' },
                { key: 'delete', label: 'Delete' },
              ]}
              onClick={(info) => handleMenuClick(record, info.key)}
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
    onChange: (_: React.Key[], selectedRows: any[]) => {
      onRowSelectionChange?.(selectedRows);
    },
  };

  return (
    <TableWrapper>
      <Table
        dataSource={formattedData}
        columns={columns}
        loading={loading}
        rowSelection={rowSelection}
        rowKey="key"
      />
      <WorkspaceDrawer
        open={open}
        onClose={() => setOpen(false)}
        workspace={selectedWorkspace}
      />
    </TableWrapper>
  );
};

export default WorkspaceTable;
