import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { constants } from '@/core/settings';
import { websiteRegex } from '@/shared/regex';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { SignUpStepEnums } from '@/modules/auth/helpers/enums/auth';

import Input from '@/shared/components/common/Input';

import icArrowRight from '@/assets/icons/common/ic-arrow-right.svg';

import * as S from './WebsiteAddress.styles';
import { handleSetWebsite } from '@/modules/auth/api/auth';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

function WebsiteAddress() {
  const { isLoading } = useAppSelector((state) => state?.auth);
  const { t } = useTranslation('auth');

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signUpFromLocal = webLocalStorage.get(constants?.SIGN_UP_INFO);

  useEffect(() => {
    if (signUpFromLocal?.websiteUrl) {
      form.setFieldsValue({
        websiteUrl: signUpFromLocal?.websiteUrl || '',
      });
    }
  }, [signUpFromLocal?.websiteUrl]);

  async function handleSignUp(values: any) {
    webLocalStorage.set(constants?.SIGN_UP_INFO, {
      ...signUpFromLocal,
      websiteUrl: values?.websiteUrl,
    });

    const signUpData = webLocalStorage.get(constants?.SIGN_UP_INFO);

    const payload = {
      workspaceName: signUpData?.workspaceName,
      websiteUrl: signUpData?.websiteUrl,
      companySize: '',
      messagingPlatform: [],
    };

    try {
      const res: any = await handleSetWebsite(payload, dispatch, t);

      if (res?.websiteID) {
        webLocalStorage.set(constants?.SIGN_UP_INFO, {
          ...signUpFromLocal,
          websiteUrl: values?.websiteUrl,
          websiteID: res.websiteID,
        });
      }

      navigate(`/auth/sign-up/${SignUpStepEnums.CONNECT_ONLY_CHAT}`);
    } catch (err) {
      console.error('Error setting website info:', err);
    }
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap
          form={form}
          onFinish={handleSignUp}
          validateTrigger="onSubmit"
        >
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t('website.whats-the-website')}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="websiteUrl"
            rules={[
              {
                required: true,
                message: t('website.please-enter-website-address'),
              },
              {
                pattern: websiteRegex,
                message: t('website.website-address-not-valid'),
              },
            ]}
          >
            <Input
              isRequired
              placeholder={t('website.enter-your-website')}
              type="email"
              allowClear
            />
          </S.FormItem>

          <S.LoginButton
            type="primary"
            onClick={form.submit}
            isLoading={isLoading}
          >
            {t('website.continue')}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default WebsiteAddress;
