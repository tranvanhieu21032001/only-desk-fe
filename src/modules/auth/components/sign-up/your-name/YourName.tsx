import { useEffect } from 'react';
import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { constants } from '@/core/settings';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { SignUpStepEnums } from '@/modules/auth/helpers/enums/auth';

import Input from '@/shared/components/common/Input';

import icArrowRight from '@/assets/icons/common/ic-arrow-right.svg';

import * as S from './YourName.styles';

function YourName() {
  const { t } = useTranslation('auth');

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const signUpFromLocal = webLocalStorage.get(constants?.SIGN_UP_INFO);

  useEffect(() => {
    if (signUpFromLocal?.workspaceName) {
      form.setFieldValue('name', signUpFromLocal?.workspaceName);
    }
  }, [signUpFromLocal]);

  function handleContinue({ name }: any) {
    webLocalStorage.set(constants?.SIGN_UP_INFO, {
      ...signUpFromLocal,
      workspaceName: name,
    });

    navigate(`/auth/sign-up/${SignUpStepEnums.WEBSITE_ADDRESS}`);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap
          form={form}
          onFinish={handleContinue}
          validateTrigger="onSubmit"
        >
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t('your-name.whats-your-name')}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="name"
            rules={[
              {
                required: true,
                message: t('your-name.please-enter-your-name'),
              },
            ]}
          >
            <Input
              isRequired
              placeholder={t('your-name.enter-your-name')}
              allowClear
            />
          </S.FormItem>

          <S.LoginButton type="primary" onClick={form.submit}>
            {t('your-name.continue')}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default YourName;
