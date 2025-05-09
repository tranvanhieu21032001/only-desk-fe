import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { passwordRegex } from '@/shared/regex';
import { handleResetPassword } from '@/modules/auth/api/auth';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import Input from '@/shared/components/common/Input';

import * as S from './CreateNewPassword.styles';

function CreateNewPassword() {
  const { t } = useTranslation('auth');
  const { isLoading } = useAppSelector((state) => state?.auth);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();
  const token = search.get('token');

  const passwordWatch = Form.useWatch('password', form);

  function handleCreateNewPass(values: any) {
    if (token) {
      const updateValues = { ...values, token: token };
      handleResetPassword(updateValues, dispatch, navigate, t);
    }
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth center-column-forgot">
        <S.FormWrap
          form={form}
          onFinish={handleCreateNewPass}
          validateTrigger="onSubmit"
        >
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t('forgot.create-new-password')}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="password"
            rules={[
              {
                required: true,
                message: t('please-enter-password'),
              },
              {
                pattern: passwordRegex,
                message: t('sign-up-form.password-invalid'),
              },
            ]}
          >
            <Input
              label={t('password')}
              isRequired
              placeholder={t('sign-up-form.enter-your-password')}
              isPassword
            />
          </S.FormItem>

          <S.FormItem
            name="confirmPassword"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(
                      new Error(
                        t('sign-up-form.please-enter-confirm-password'),
                      ),
                    );
                  } else if (value && value !== passwordWatch) {
                    return Promise.reject(
                      new Error(t('sign-up-form.password-not-match')),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              label={t('sign-up-form.confirm-password')}
              isRequired
              placeholder={t('sign-up-form.enter-your-confirm-password')}
              isPassword
            />
          </S.FormItem>

          <S.LoginButton
            type="primary"
            onClick={form.submit}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {t('forgot.save')}
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default CreateNewPassword;
