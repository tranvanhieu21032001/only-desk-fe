import { useEffect, useState } from 'react';
import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/shared/hooks';
import { handleInviteTeam } from '@/modules/auth/api/auth';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import icTrash from '@/assets/icons/common/ic-trash.svg';
import icSetting from '@/assets/icons/auth/ic-setting.svg';
import icAddCircle from '@/assets/icons/common/ic-add-circle.svg';

import * as S from './invite.styles';
import { SignUpStepEnums } from '@/modules/auth/helpers/enums/auth';

interface ModalConfirmDeleteProps {
  title?: string;
  subTitle?: string;
  open: boolean;
  onCancel: () => void;
  isLoading?: boolean;
  // onCopyInviteLink?: () => void;
}

function ModalInvite({
  title,
  open,
  onCancel,
  isLoading,
  // onCopyInviteLink,
}: ModalConfirmDeleteProps) {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoadingInvite, setIsLoadingInvite] = useState(false);

  useEffect(() => {
    form.setFieldValue('invitedDevelopers', [{ email: '' }]);
  }, [form]);

  const handleAddMoreEmail = () => {
    const getEmails = form.getFieldValue('invitedDevelopers') || [];
    form.setFieldValue('invitedDevelopers', [...getEmails, { email: '' }]);
  };

  const handleSendInvite = async (values: any) => {
    setIsLoadingInvite(true);

    const convertInvited = values?.invitedDevelopers?.map(
      (item: any) => item?.email,
    );

    await handleInviteTeam(convertInvited, dispatch, t, () => {
      navigate(`/auth/sign-up/${SignUpStepEnums.COMPANY_SIZE}`);
    });

    setIsLoadingInvite(false);
  };

  return (
    <S.WrapModal>
      <ModalCommon
        title={title}
        open={open}
        onCancel={onCancel}
        showFooter={false}
        isLoading={isLoading}
        width={700}
      >
        <S.ModalHeader>
          <Image src={icSetting} preview={false} />
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('invite-modal.invite-your-developer')}
            </Typography>
            <Typography>{t('invite-modal.invite-developer')}</Typography>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalContent>
          <S.FormWrap form={form} onFinish={handleSendInvite}>
            <Typography margin="0 0 8px 0">
              {t('invite-your-team.email-address')}
              <span style={{ color: 'red' }}> *</span>
            </Typography>

            <S.EmailsWrap>
              <Form.List name="invitedDevelopers">
                {(fields, { remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <S.EmailWrap
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        $isFirst={index === 0}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'email']}
                          rules={[
                            {
                              required: true,
                              message: t('invite-your-team.please-enter-business-email'),
                            },
                            {
                              type: 'email',
                              message: t('email-invalid'),
                            },
                          ]}
                        >
                          <Input
                            placeholder={t('invite-your-team.enter-your-business-email')}
                            type="email"
                          />
                        </Form.Item>

                        {index !== 0 && (
                          <Image
                            src={icTrash}
                            onClick={() => remove(name)}
                            width={16}
                            height={18}
                            preview={false}
                          />
                        )}
                      </S.EmailWrap>
                    ))}
                  </>
                )}
              </Form.List>
            </S.EmailsWrap>

            <S.AddMoreEmailWrap>
              <S.AddMoreEmail onClick={handleAddMoreEmail}>
                <Image src={icAddCircle} preview={false} />
                <Typography
                  color={themeColors?.secondaryDark}
                  fontWeight={fontWeight?.semiBold}
                >
                  {t('invite-your-team.add-more-email')}
                </Typography>
              </S.AddMoreEmail>
            </S.AddMoreEmailWrap>

            <S.ModalBottom>
              <S.ActionWrap>
                <S.BtnCancel>
                  <Button onClick={onCancel}>
                    {t('invite-modal.cancel')}
                  </Button>
                </S.BtnCancel>
                <Button
                  type="primary"
                  htmlType="submit"
                  isLoading={isLoadingInvite}
                >
                  {t('invite-modal.send-invite-and-continue')}
                </Button>
              </S.ActionWrap>
            </S.ModalBottom>
          </S.FormWrap>
        </S.ModalContent>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalInvite;
