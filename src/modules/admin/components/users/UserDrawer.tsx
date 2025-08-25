import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import Input from '@/shared/components/common/Input';
import Select from '@/shared/components/common/Select';
import CommonDrawer from '@/shared/components/common/Drawer/CommonDrawer';
import { useAppDispatch } from '@/shared/hooks';
import { updateUser } from '../../store/adminUsersSlice';
import avatarDefault from '@/assets/images/avatar-default.png';
import Typography from '@/shared/components/common/Typography';
import { User } from '@/shared/interface/user.interface';

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDrawer: React.FC<Props> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'active' | 'pending'>('active');

  useEffect(() => {
    if (user) {
      setStatus(user.status as 'active' | 'pending');
    }
  }, [user]);

  if (!user) return null;

  const handleUpdate = (value: 'active' | 'pending') => {
    if (!user?.id) return;
    dispatch(updateUser({ userId: user.id, status: value }));
  };

  const fieldsToShow = [
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Created At', isDate: true },
    { key: 'updatedAt', label: 'Updated At', isDate: true },
  ];

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
        <Typography variant="h4">
          {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Guest'}
        </Typography>
      </div>

      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status">
              <Select
                value={status}
                onChange={(value: 'active' | 'pending') => {
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

          {fieldsToShow.map(({ key, label, isDate }) => (
            <Col span={12} key={key}>
              <Form.Item label={label}>
                <Input
                  value={
                    isDate && user[key as keyof User]
                      ? new Date(user[key as keyof User] as string).toLocaleString()
                      : user[key as keyof User] !== null &&
                        user[key as keyof User] !== undefined
                      ? Array.isArray(user[key as keyof User])
                        ? (user[key as keyof User] as string[]).join(', ')
                        : user[key as keyof User]!.toString()
                      : ''
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
