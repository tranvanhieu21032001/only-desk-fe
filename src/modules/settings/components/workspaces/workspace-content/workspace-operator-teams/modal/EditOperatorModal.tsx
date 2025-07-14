import { useEffect } from 'react';
import Image from 'antd/es/image';
import * as S from './modal.styles';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import Select from '@/shared/components/common/Select';
import { Form } from 'antd';
import Input from '@/shared/components/common/Input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  form: any;
  handleFinish: () => void;
  operator: { email: string; role: string; status: string } | null;
  t: (key: string) => string;
}

const EditOperatorModal = ({
  isOpen,
  onClose,
  isLoading,
  form,
  handleFinish,
  operator,
  t,
}: Props) => {
  useEffect(() => {
    if (isOpen && operator) {
      form.setFieldsValue({
        email: operator.email,
        role: operator.role === 'ADMIN' ? 'admin' : 'developer',
        status:
          operator.status === 'APPROVED'
            ? 'approved'
            : operator.status === 'PENDING'
            ? 'pending'
            : 'rejected',
      });
    }
  }, [isOpen, operator, form]);

  return (
    <Modal
      isOpen={isOpen}
      title={t('operators.edit-title')}
      description={t('operators.edit-desc')}
      onClose={onClose}
      footer={
        <S.ModalEmptyFooter>
          <Button type="default" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            type="primary"
            width="180px"
            isLoading={isLoading}
            onClick={() => form.submit()}
            icon={<Image src={addHeader} preview={false} width={20} height={20} />}
            iconPosition="left"
          >
            {t('operators.save')}
          </Button>
        </S.ModalEmptyFooter>
      }
    >
      <S.FormWrap
        form={form}
        validateTrigger="onSubmit"
        onFinish={handleFinish}
        initialValues={{ role: 'developer' }}
      >
        {/* ROLE */}
        <Form.Item
          name="role"
          label={t('operators.role-label')}
          rules={[{ required: true, message: t('operators.please-choose-role') }]}
        >
          <Select
            isRequired
            colorLabel="#111"
            placeholder={t('operators.role-placeholder')}
            options={[
              { label: t('operators.admin'), value: 'admin' },
              { label: t('operators.member'), value: 'developer' },
            ]}
          />
        </Form.Item>

        {/* STATUS */}
        <Form.Item
          name="status"
          label={t('operators.status-label')}
          rules={[{ required: true, message: t('operators.please-choose-status') }]}
        >
          <Select
            isRequired
            colorLabel="#111"
            placeholder={t('operators.status-placeholder')}
            options={[
              { label: t('operators.invited'), value: 'pending' },
              { label: t('operators.active'), value: 'approved' },
              { label: t('operators.rejected'), value: 'rejected' },
            ]}
          />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('operators.please-enter-email') },
            { type: 'email', message: t('operators.email-invalid') },
          ]}
        >
          <Input
            label={t('operators.email-label')}
            isRequired
            placeholder={t('operators.email-placeholder')}
            type="email"
            disabled
          />
        </Form.Item>
      </S.FormWrap>
    </Modal>
  );
};

export default EditOperatorModal;
