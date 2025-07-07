import { Form, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isArray } from 'lodash';

import { constants } from '@/core/settings';
import { useAppSelector } from '@/shared/hooks';
import webLocalStorage from '@/shared/utils/webLocalStorage';
import { companySizes } from '@/modules/auth/helpers/data/signUp';
import { SignUpStepEnums } from '@/modules/auth/helpers/enums/auth';

import icArrowRight from '@/assets/icons/common/ic-arrow-right.svg';
import icTickCircle from '@/assets/icons/common/ic-tick-circle.svg';

import * as S from './CompanySize.styles';

function CompanySize() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  

  const signUpFromLocal = webLocalStorage.get(constants?.SIGN_UP_INFO);
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );

  const initialCompanySize =
    (isArray(currentObjHistory) ? currentObjHistory : [])?.find(
      (item) => item?.key === 'size',
    )?.value || signUpFromLocal?.companySize || '';

  const [companySize, setCompanySize] = useState<string>(initialCompanySize);

  useEffect(() => {
    if (initialCompanySize) {
      setCompanySize(initialCompanySize);
    }
  }, [initialCompanySize]);

  function selectCompanySize(size: string) {
    setCompanySize(size);
  }

  function handleSubmit() {
    webLocalStorage.set(constants?.SIGN_UP_INFO, {
      ...signUpFromLocal,
      companySize: companySize || '',
    });

    navigate(`/auth/sign-up/${SignUpStepEnums.CUSTOMER}`);
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleSubmit}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t('company-size.company-size')}
            </S.Title>
          </S.LoginLabelWrap>

          <S.SizeWrap>
            {companySizes?.map((size) => (
              <S.ButtonSize
                key={size?.key}
                onClick={() => selectCompanySize(size?.value)}
                $isActive={size?.value === companySize}
              >
                {size?.value === companySize && (
                  <Image
                    src={icTickCircle}
                    preview={false}
                    width={20}
                    height={20}
                  />
                )}
                {size?.label}
              </S.ButtonSize>
            ))}
          </S.SizeWrap>

          <S.LoginButton
            type="primary"
            onClick={form.submit}
            disabled={!companySize}
          >
            {t('website.continue')}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default CompanySize;
