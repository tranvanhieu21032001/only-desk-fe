import { useState } from 'react';
import { Table, Tag, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import icView from '@/assets/icons/billing/ic-export.svg';
import icUpcoming from '@/assets/icons/billing/ic-upcoming.svg';
import icTick from '@/assets/icons/billing/ic-tick.svg';
import InvoiceDrawer from '../invoice-drawer/InvoiceDrawer';
import styled from 'styled-components';

const CustomTable = styled(Table<Invoice>)`
  .ant-table-cell {
    padding: 12px !important;
  }
`;

interface Invoice {
  key: string;
  dueDate: string;
  description: string;
  status: 'Paid' | 'Upcoming';
  total: string;
}

interface AllInvoicesProps {
  invoices: any[];
}

const AllInvoices = ({ invoices }: AllInvoicesProps) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const showDrawer = (record: Invoice) => {
    setSelectedInvoice(record);
    setDrawerVisible(true);
  };

  const tableData: Invoice[] = invoices.map((inv) => ({
    key: inv._id,
    dueDate: dayjs(inv.paidAt || inv.createdAt).format('MM/DD/YYYY'),
    description: inv.description || 'No description',
    status: inv.status.toLowerCase() === 'paid' ? 'Paid' : 'Upcoming',
    total: `$${inv.amount.toFixed(2)}`,
  }));

  const columns: ColumnsType<Invoice> = [
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: '33%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '33%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '13%',
      render: (status) => {
        let icon = null;
        if (status === 'Upcoming') {
          icon = <Image preview={false} src={icUpcoming} height={20} width={20} />;
        }
        if (status === 'Paid') {
          icon = <Image preview={false} src={icTick} height={20} width={20} />;
        }

        return (
          <Tag style={{ padding: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{icon}{status}</span>
          </Tag>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: '7%',
    },
    {
      title: 'View',
      key: 'view',
      width: '4%',
      render: (_, record) => (
        <Button type="link" onClick={() => showDrawer(record)}>
          <Image preview={false} src={icView} height={24} width={24} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <CustomTable columns={columns} dataSource={tableData} pagination={false} />
      <InvoiceDrawer open={isDrawerVisible} onClose={() => setDrawerVisible(false)} invoice={selectedInvoice} />
    </>
  );
};

export default AllInvoices;
