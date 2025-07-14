// AddOperatorModal.tsx
import Image from 'antd/es/image';
import * as S from './modal.styles';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import addHeader from '@/assets/icons/common/ic-add-header.svg';
import Select from '@/shared/components/common/Select';
import { Form } from 'antd';
import Input from '@/shared/components/common/Input';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  form: any;
  handleFinish: () => void;
  t: (key: string) => string;
};

const AddOperatorModal = ({
  isOpen,
  onClose,
  isLoading,
  form,
  handleFinish,
  t,
}: Props) => (
  <Modal
    isOpen={isOpen}
    title={t('operators.add-operator')}
    description={t('operators.desc')}
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
          onClick={form.submit}
          icon={<Image src={addHeader} preview={false} width={20} height={20} />}
          iconPosition="left"
        >
          {t('operators.add-operator')}
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
      <Form.Item
        name="role"
        label={t('operators.operator-role')}
        rules={[{ required: true, message: t('operators.please-choose-role') }]}
      >
        <Select
          isRequired
          colorLabel="#111"
          placeholder={t('operators.choose-role')}
          options={[
            { label: t('operators.admin'), value: 'admin' },
            { label: t('operators.member'), value: 'developer' },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: t('operators.please-enter-email') },
          { type: 'email', message: t('operators.email-invalid') },
        ]}
      >
        <Input
          label={t('operators.operator-email')}
          isRequired
          placeholder={t('operators.enter-email')}
          type="email"
        />
      </Form.Item>
    </S.FormWrap>
  </Modal>
);

export default AddOperatorModal;
