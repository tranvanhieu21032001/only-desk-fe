import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';

import { websiteRegex } from '@/shared/regex';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import ModalCommon from '@/shared/components/common/ModalBase';
import Typography from '@/shared/components/common/Typography';

import * as S from './CreateWorkspace.styles';

import add from '@/assets/icons/workspace/ic-add.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOk: (values: any) => void;
  isLoading?: boolean;
}

function CreateWorkspaceModal({ isOpen, onClose, onOk, isLoading }: Props) {
  const { t } = useTranslation('workspaces');

  const [form] = Form.useForm();

  return (
    <S.WrapModal>
      <ModalCommon open={isOpen} onCancel={onClose} width={700} footer={false}>
        <S.ModalHeader>
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('workspaces.title')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('workspaces.description')}
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
                  message: t('workspaces.workspaceName.please-enter'),
                },
              ]}
            >
              <Input
                isRequired
                label={t('workspaces.workspaceName.label')}
                placeholder={t('workspaces.workspaceName.placeholder')}
              />
            </Form.Item>
            <Form.Item
              name="websiteUrl"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error(t('workspaces.websiteDomain.please-enter')),
                      );
                    } else if (!websiteRegex.test(value)) {
                      return Promise.reject(
                        new Error(t('workspaces.websiteDomain.invalid')),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                isRequired
                label={t('workspaces.websiteDomain.label')}
                placeholder={t('workspaces.websiteDomain.placeholder')}
              />
            </Form.Item>
          </Form>
        </S.ModalBody>

        <S.ModalFooter>
          <Button onClick={onClose} disabled={isLoading}>
            {t('workspaces.buttons.cancel')}
          </Button>
          <Button
            type="primary"
            isLoading={isLoading}
            onClick={form.submit}
            icon={<Image src={add} preview={false} width={18} height={18} />}
          >
            {t('workspaces.buttons.create')}
          </Button>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default CreateWorkspaceModal;
