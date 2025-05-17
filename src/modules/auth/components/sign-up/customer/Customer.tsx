import { Form, Image, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { useRouter } from '@/shared/hooks/useRouter';
import { handleFinishSignUp } from '@/modules/auth/api/auth';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { chatWithCustomers } from '@/modules/auth/helpers/data/signUp';
import { chatWithCustomersInterface } from '@/modules/auth/models/auth';

import Typography from '@/shared/components/common/Typography';

import * as S from './Customer.styles';

function Customer() {
  const { t } = useTranslation('auth');

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { navigate } = useRouter();
  const { replaceState } = useRouter();

  const { isLoading } = useAppSelector((state) => state?.auth);

  function handleInviteYourTeam(values: any) {
    handleFinishSignUp(values, dispatch, navigate, t, replaceState);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleInviteYourTeam}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t('chat-with-customer.where-do-you-chat-with-customer')}
            </S.Title>
          </S.LoginLabelWrap>

          <S.SocialChatWrap>
            {chatWithCustomers?.map((social: chatWithCustomersInterface) => (
              <S.SocialChat key={social?.key}>
                <S.LogoChatWrap>
                  <Image src={social?.icon as string} preview={false} />
                  <Typography fontWeight={fontWeight?.extraBold}>
                    {t(`chat-with-customer.${social?.label}`)}
                  </Typography>
                </S.LogoChatWrap>

                <Form.Item name={`${social?.key}`} valuePropName="checked">
                  <Switch />
                </Form.Item>
              </S.SocialChat>
            ))}
          </S.SocialChatWrap>

          <S.LoginButton
            type="primary"
            onClick={form.submit}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {t('chat-with-customer.submit')}
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default Customer;
