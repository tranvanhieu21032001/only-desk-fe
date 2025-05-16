import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalAddContact.styles';

interface ModalAddContactProps {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  isLoading?: boolean;
}

function ModalAddContact({
  open,
  onCancel,
  onOk,
  isLoading,
}: ModalAddContactProps) {
  const { t } = useTranslation('contacts');

  const [form] = Form.useForm();

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        isLoading={isLoading}
        width={700}
      >
        <S.ModalHeader>
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-add-contact.new-contact')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-add-contact.please-insert-modal-description-here')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalBody>
          <Form form={form} onFinish={onOk}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: t(
                    'modal-add-contact.please-enter-name-of-the-contact',
                  ),
                },
              ]}
            >
              <Input
                isRequired
                label={t('modal-add-contact.name-of-the-contact')}
                placeholder={t('modal-add-contact.enter-name-of-the-contact')}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t(
                    'modal-add-contact.please-enter-email-of-the-contact',
                  ),
                },
                {
                  type: 'email',
                  message: t('modal-add-contact.email-invalid'),
                },
              ]}
            >
              <Input
                isRequired
                label={t('modal-add-contact.email-of-the-contact')}
                placeholder={t('modal-add-contact.enter-email-of-the-contact')}
              />
            </Form.Item>
          </Form>
        </S.ModalBody>

        <S.ModalFooter>
          <Button type="primary" onClick={form.submit} isLoading={isLoading}>
            {t('modal-add-contact.add-contact')}
          </Button>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalAddContact;
