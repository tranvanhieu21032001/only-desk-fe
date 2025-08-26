import React from 'react';
import { Modal, Avatar, Table, Divider } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { Message } from '@/shared/chat-logic/interfaces/inbox';
import Typography from '@/shared/components/common/Typography';
import { toast } from 'react-toastify';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { ToastMessageType } from '@/shared/helper/enums/common';
import { getSenderName } from '@/shared/chat-logic/helpers/chat.helper';
import { SystemAvatar } from '@/shared/components/common/ProfileCard/SystemAvatar';
import defaultAvatar from '@/assets/images/avatar-default.png';
import { MessageSender } from '@/shared/chat-logic';
import styled from 'styled-components';

interface MessageInfoModalProps {
  visible: boolean;
  message: Message | null;
  onClose: () => void;
}

const WrapTable = styled.div`
  .ant-table-wrapper .ant-table-tbody > tr > td {
    border-bottom: unset;
  }
`;

const MessageInfoModal: React.FC<MessageInfoModalProps> = ({
  visible,
  message,
  onClose,
}) => {
  if (!message) return null;
  const senderName = getSenderName(message);
  console.log('message', message);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.id);
    toast(
      <ToastMessage
        typeToast={ToastMessageType?.SUCCESS}
        message="Copy Identifier Successfully"
      />,
    );
  };

  const renderAvatar = () => {
    if (message.sender === MessageSender.SYSTEM) {
      return <SystemAvatar avatarSize={22} />;
    }
    if (message.user?.avatar) {
      return <Avatar src={message.user.avatar} size="small" />;
    }
    return <Avatar src={defaultAvatar} size="small" />;
  };

  const messageDetails = [
    {
      key: 'id',
      label: 'Identifier',
      value: (
        <div style={{ display: 'flex' }}>
          <Typography variant="caption-small">{message.id}</Typography>
          <CopyOutlined
            style={{ cursor: 'pointer', marginLeft: 8 }}
            onClick={handleCopy}
          />
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Sent on date',
      value: new Date(message.createdAt).toLocaleString(),
    },
  ];

  const senderDetails = [
    {
      key: 'sentBy',
      label: 'Sent by',
      value: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {renderAvatar()}
          {senderName}
        </div>
      ),
    },
    {
      key: 'origin',
      label: 'Origin',
      value: 'Chat',
    },
  ];

  // Table 3: Status details
  const statusDetails = [
    { key: 'type', label: 'Type', value: message.type },
    {
      key: 'delivered',
      label: 'Delivered',
      value: message.status === 'delivered' ? 'Yes' : 'No',
    },
    {
      key: 'notDelivered',
      label: 'Not delivered',
      value: message.status === 'failed' ? 'Yes' : 'No',
    },
    { key: 'read', label: 'Read', value: 'No' },
    {
      key: 'edited',
      label: 'Edited',
      value: message.updatedAt !== message.createdAt ? 'Yes' : 'No',
    },
    { key: 'translated', label: 'Translated', value: 'No' },
    {
      key: 'automated',
      label: 'Automated',
      value: message.type === 'reminder' ? 'Yes' : 'No',
    },
    message.metadata?.reminderTime && {
      key: 'reminderTime',
      label: 'Reminder time',
      value: message.metadata.reminderTime,
    },
  ].filter(Boolean);

  const columns = [
    { title: 'Field', dataIndex: 'label', key: 'label', width: 150 },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title="Message information"
      width={600}
    >
      <WrapTable>
        <Table
          dataSource={messageDetails}
          columns={columns}
          pagination={false}
          showHeader={false}
          size="small"
        />
        <Divider style={{ margin: '12px 0' }} />
        <Table
          dataSource={senderDetails}
          columns={columns}
          pagination={false}
          showHeader={false}
          size="small"
        />
        <Divider style={{ margin: '12px 0' }} />
        <Table
          dataSource={statusDetails as any}
          columns={columns}
          pagination={false}
          showHeader={false}
          size="small"
        />
      </WrapTable>
    </Modal>
  );
};

export default MessageInfoModal;
