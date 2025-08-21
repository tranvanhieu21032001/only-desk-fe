import React from 'react';
import { Form, Row, Col } from 'antd';
import CommonDrawer from '@/shared/components/common/Drawer/CommonDrawer';
import Input from '@/shared/components/common/Input';

interface Props {
  open: boolean;
  onClose: () => void;
  subscription: any | null;
}

const SubscriptionDrawer: React.FC<Props> = ({ open, onClose, subscription }) => {
  return (
    <CommonDrawer
      open={open}
      onClose={onClose}
      title={'Subscription Detail'}
      description={subscription?.workspace?.name}
      width={600}
    >
      {subscription && (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Workspace">
                <Input value={subscription.workspace.name} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Website">
                <Input value={subscription.workspace.websiteUrl || '-'} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Status">
                <Input value={subscription.status} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Provider">
                <Input value={subscription.provider || '-'} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Created At">
                <Input value={new Date(subscription.createdAt).toLocaleString()} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Updated At">
                <Input
                  value={
                    subscription.updatedAt
                      ? new Date(subscription.updatedAt).toLocaleString()
                      : '-'
                  }
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Period Start">
                <Input
                  value={
                    subscription.periodStartAt
                      ? new Date(subscription.periodStartAt).toLocaleString()
                      : '-'
                  }
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Period End">
                <Input
                  value={
                    subscription.periodEndAt
                      ? new Date(subscription.periodEndAt).toLocaleString()
                      : '-'
                  }
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </CommonDrawer>
  );
};

export default SubscriptionDrawer;
