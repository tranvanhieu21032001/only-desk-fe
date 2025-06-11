import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

import { handleUpdateShortcut } from '@/modules/settings/api/chatbox';
import type { Shortcut } from '@/modules/settings/models/chatbox.model';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';

interface EditShortcutModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  shortcutData: Shortcut | null;
}

const EditShortcutModal: React.FC<EditShortcutModalProps> = ({ open, onCancel, onSubmit, shortcutData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (shortcutData) {
      form.setFieldsValue({
        shortcut: shortcutData.shortcut,
        message: shortcutData.message,
        tag: shortcutData.tag,
      });
    } else {
      form.resetFields();
    }
  }, [shortcutData, form]);

  const handleFinish = async (values: any) => {
    if (!shortcutData) return;
    await handleUpdateShortcut({
      id: shortcutData.id,
      shortcut: values.shortcut,
      message: values.message,
      tag: values.tag,
    });
    onSubmit();
  };

  const footer = (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button type="default" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="primary" onClick={() => form.submit()}>
        Save
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={onCancel}
      title="Edit Shortcut"
      footer={footer}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Shortcut"
          name="shortcut"
          rules={[{ required: true, message: 'Please input shortcut!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input message!' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditShortcutModal; 