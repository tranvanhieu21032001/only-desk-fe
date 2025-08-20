import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Col, Row } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import CommonDrawer from '@/shared/components/common/Drawer/CommonDrawer';
import { updateWorkspace } from '@/modules/admin/store/adminWorkspacesSlice';
import { useAppDispatch } from '@/shared/hooks';

interface Props {
  open: boolean;
  onClose: () => void;
  workspace: any | null;
}

const WorkspaceDrawer: React.FC<Props> = ({ open, onClose, workspace }) => {
  const dispatch = useAppDispatch();
  const [trialEndsAt, setTrialEndsAt] = useState<Dayjs | null>(null);
  const [plan, setPlan] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (!workspace) return;
    setTrialEndsAt(workspace.raw.trialEndsAt ? dayjs(workspace.raw.trialEndsAt) : null);
    setPlan(workspace.raw.plan || '');
    setStatus(workspace.raw.status || '');
  }, [workspace]);

  if (!workspace) return null;

  const handleUpdate = (field: string, value: any) => {
    if (!workspace) return;
    dispatch(
      updateWorkspace({
        workspaceId: workspace.key,
        payload: { [field]: value },
      })
    );
  };

  return (
    <CommonDrawer
      open={open}
      onClose={onClose}
      title="Edit Workspace"
      description="Insert page description here"
      width={600}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Workspace Name">
              <Input value={workspace.raw.name || ''} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Trial Ends At">
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY/MM/DD"
                value={trialEndsAt}
                onChange={(date) => {
                  setTrialEndsAt(date);
                  handleUpdate('trialEndsAt', date?.toISOString());
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Plan">
              <Select
                value={plan}
                onChange={(value) => {
                  setPlan(value);
                  handleUpdate('plan', value);
                }}
                options={[
                  { value: 'essentials', label: 'Essentials' },
                  { value: 'mini', label: 'Mini' },
                  { value: 'free', label: 'Free' },
                  { value: 'plus', label: 'Plus' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status">
              <Select
                value={status}
                onChange={(value) => {
                  setStatus(value);
                  handleUpdate('status', value);
                }}
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'installed', label: 'Installed' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
            </Form.Item>
          </Col>

          {Object.entries(workspace.raw)
            .filter(
              ([key]) =>
                !['_id', '__v', 'status', 'plan', 'name', 'trialEndsAt'].includes(key)
            )
            .map(([key, value]) => {
              if (key === 'owner' && value && typeof value === 'object') {
                const owner = value as {
                  firstName?: string;
                  lastName?: string;
                  email?: string;
                };
                return (
                  <React.Fragment key={key}>
                    <Col span={12}>
                      <Form.Item label="First Name">
                        <Input value={owner.firstName || ''} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Last Name">
                        <Input value={owner.lastName || ''} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Email">
                        <Input value={owner.email || ''} disabled />
                      </Form.Item>
                    </Col>
                  </React.Fragment>
                );
              }

              if (key === 'createdAt' || key === 'updatedAt') {
                return (
                  <Col span={12} key={key}>
                    <Form.Item label={key}>
                      <Input
                        value={
                          value &&
                          (typeof value === 'string' ||
                            typeof value === 'number' ||
                            value instanceof Date)
                            ? dayjs(value).format('YYYY/MM/DD')
                            : '-'
                        }
                        disabled
                      />
                    </Form.Item>
                  </Col>
                );
              }

              return (
                <Col span={12} key={key}>
                  <Form.Item label={key}>
                    <Input value={String(value)} disabled />
                  </Form.Item>
                </Col>
              );
            })}
        </Row>
      </Form>
    </CommonDrawer>
  );
};

export default WorkspaceDrawer;
