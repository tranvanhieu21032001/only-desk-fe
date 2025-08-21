import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import CommonDrawer from '@/shared/components/common/Drawer/CommonDrawer';
import { useAppDispatch } from '@/shared/hooks';
import { updateUser } from '../../store/adminUsersSlice';
import avatarDefault from '@/assets/images/avatar-default.png';
import Typography from '@/shared/components/common/Typography';

interface Props {
  open: boolean;
  onClose: () => void;
  user: any | null;
}

const UserDrawer: React.FC<Props> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (user) {
      setStatus(user.status || '');
    }
  }, [user]);

  if (!user) return null;

  const handleUpdate = (value: any) => {
    if (!user) return;
    dispatch(updateUser({ userId: user.key, status: value }));
  };

  return (
    <CommonDrawer
      open={open}
      onClose={onClose}
      title="User Details"
      width={600}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <img
          src={user.avatar || avatarDefault}
          alt="avatar"
          style={{ width: 48, height: 48, borderRadius: '50%' }}
        />
        <Typography variant="h4">{user.name || 'Guest'}</Typography>
      </div>

      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status">
              <Select
                value={status}
                onChange={(value) => {
                  setStatus(value);
                  handleUpdate(value);
                }}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'pending', label: 'Pending' },
                ]}
              />
            </Form.Item>
          </Col>

          {Object.entries(user)
            .filter(
              ([key]) => !['key', 'avatar', 'name', 'status'].includes(key),
            )
            .map(([key, value]) => (
              <Col span={12} key={key}>
                <Form.Item label={key.charAt(0).toUpperCase() + key.slice(1)}>
                  <Input
                    value={
                      value === null || value === undefined
                        ? ''
                        : typeof value === 'object'
                          ? JSON.stringify(value)
                          : value.toString()
                    }
                    disabled
                  />
                </Form.Item>
              </Col>
            ))}
        </Row>
      </Form>
    </CommonDrawer>
  );
};

export default UserDrawer;
