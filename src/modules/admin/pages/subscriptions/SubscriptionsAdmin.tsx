import React, { useEffect, useState, useCallback } from 'react';
import { Button, Image, Table as AntTable, Skeleton } from 'antd';
import styled from 'styled-components';
import { getAdminSubscriptions } from '../../api/admin';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { constants } from '@/core/settings';
import icView from '@/assets/icons/billing/ic-export.svg';
import SubscriptionDrawer from '../../components/subscriptions/SubscriptionDrawer';
import Nosubscription from '../../components/subscriptions/Nosubscription';

interface Subscription {
  _id: string;
  workspace: {
    _id: string;
    name: string;
    websiteUrl?: string;
  };
  status: string;
  provider?: string;
  createdAt: string;
  updatedAt?: string;
  periodStartAt?: string;
  periodEndAt?: string;
}

const CustomTable = styled(AntTable<Subscription>)`
  .ant-table-cell {
    padding: 12px !important;
  }
`;

const SkeletonWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
`;

const SubscriptionsAdmin: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  const currentWorkspace = webLocalStorage.get(constants.CURRENT_WORKSPACE);

  const fetchSubscriptions = useCallback(async () => {
    if (!currentWorkspace?.rawId) return;
    setLoading(true);
    try {
      const res = await getAdminSubscriptions(
        currentWorkspace.rawId,
        page,
        limit,
      );
      setSubscriptions(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }, [currentWorkspace?.rawId, page, limit]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleView = (sub: Subscription) => {
    setSelectedSub(sub);
    setDrawerOpen(true);
  };

  const columns = [
    {
      title: 'Workspace Name',
      dataIndex: ['workspace', 'name'],
      key: 'workspaceName',
    },
    {
      title: 'Website URL',
      dataIndex: ['workspace', 'websiteUrl'],
      key: 'websiteUrl',
      render: (url?: string) =>
        url ? (
          <a
            href={url}
            target="_blank"
            style={{ color: '#1890ff', textDecoration: 'underline' }}
            onClick={(e) => e.stopPropagation()}
            rel="noopener noreferrer"
          >
            {url}
          </a>
        ) : (
          '-'
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
    },
    {
      title: 'View',
      key: 'view',
      render: (_: any, record: Subscription) => (
        <Button type="link" onClick={() => handleView(record)}>
          <Image preview={false} src={icView} height={24} width={24} />
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <SkeletonWrapper>
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            active
            paragraph={{ rows: 2 }}
            title={false}
            style={{ marginBottom: 16 }}
          />
        ))}
      </SkeletonWrapper>
    );
  }
  if (!loading && subscriptions.length === 0) {
    return <Nosubscription />;
  }

  return (
    <div style={{ width: '100%' }}>
      <CustomTable
        dataSource={subscriptions.map((sub) => ({ ...sub, key: sub._id }))}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: (p) => setPage(p),
        }}
        onRow={(record) => ({
          onClick: () => handleView(record),
        })}
      />

      <SubscriptionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        subscription={selectedSub}
      />
    </div>
  );
};

export default SubscriptionsAdmin;
