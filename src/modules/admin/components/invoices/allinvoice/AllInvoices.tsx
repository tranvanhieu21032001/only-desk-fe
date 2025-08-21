import { useState } from 'react';
import { Table, Tag, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import icView from '@/assets/icons/billing/ic-export.svg';
import icUpcoming from '@/assets/icons/billing/ic-upcoming.svg';
import icTick from '@/assets/icons/billing/ic-tick.svg';
import InvoiceDrawer from '../invoice-drawer/InvoiceDrawer';
import styled from 'styled-components';

const CustomTable = styled(Table<InvoiceAdmin>)`
  .ant-table-cell {
    padding: 12px !important;
  }
  .ant-table-row {
    cursor: pointer;
  }
`;

interface InvoiceAdmin {
  key: string;
  invoiceId: string;
  workspace: string;
  websiteURL: string;
  amount: string;
  status: 'Paid' | 'Upcoming';
  paidAt: string;
  provider: string;
}

interface AllInvoicesProps {
  invoices: any[];
}

const AllInvoices = ({ invoices }: AllInvoicesProps) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceAdmin | null>(
    null,
  );

  const showDrawer = (record: InvoiceAdmin) => {
    setSelectedInvoice(record);
    setDrawerVisible(true);
  };

  const tableData: InvoiceAdmin[] = invoices.map((inv) => ({
    key: inv._id,
    invoiceId: `#${inv._id}`,
    workspace: inv.workspace?.name || '—',
    websiteURL: inv.workspace?.websiteUrl || '—',
    amount: `${inv.amount} ${inv.currency?.toUpperCase()}`,
    status: inv.status.toLowerCase() === 'paid' ? 'Paid' : 'Upcoming',
    paidAt: inv.paidAt ? dayjs(inv.paidAt).format('MMM DD, YYYY HH:mm') : '—',
    provider: inv.provider || '—',
  }));

  const columns: ColumnsType<InvoiceAdmin> = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
    },
    {
      title: 'Workspace',
      dataIndex: 'workspace',
      key: 'workspace',
    },
    {
      title: 'Website',
      dataIndex: 'websiteURL',
      key: 'websiteURL',
      render: (websiteURL: string) =>
        websiteURL !== '—' ? (
          <a
            href={`https://${websiteURL}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1890ff', textDecoration: 'underline' }}
            onClick={(e) => e.stopPropagation()}
          >
            {websiteURL}
          </a>
        ) : (
          '—'
        ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let icon = null;
        if (status === 'Upcoming') {
          icon = (
            <Image preview={false} src={icUpcoming} height={20} width={20} />
          );
        }
        if (status === 'Paid') {
          icon = <Image preview={false} src={icTick} height={20} width={20} />;
        }

        return (
          <Tag style={{ padding: '6px 10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {icon}
              {status}
            </span>
          </Tag>
        );
      },
    },
    {
      title: 'Paid At',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
    {
      title: 'Payment',
      dataIndex: 'provider',
      key: 'provider',
      render: (provider) =>
        provider.charAt(0).toUpperCase() + provider.slice(1),
    },
    {
      title: 'View',
      key: 'view',
      render: (_, record) => (
        <Button
          type="link"
          onClick={(e) => {
            e.stopPropagation();
            showDrawer(record);
          }}
        >
          <Image preview={false} src={icView} height={24} width={24} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={tableData}
        pagination={false}
        onRow={(record) => ({
          onClick: () => showDrawer(record),
        })}
      />
      <InvoiceDrawer
        open={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
        invoice={selectedInvoice}
      />
    </>
  );
};

export default AllInvoices;
