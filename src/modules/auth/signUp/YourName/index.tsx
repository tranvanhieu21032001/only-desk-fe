import { useEffect } from "react";
import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { constants } from "@/core/settings";
import { useRouter } from "@/shared/hooks/useRouter";
import { SignUpStepEnums } from "../../helpers/enums/auth";
import webLocalStorage from "@/shared/utils/webLocalStorage";

import Input from "@/shared/components/common/Input";

import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";

function YourName() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const signUpFromLocal = webLocalStorage.get(constants?.SIGN_UP_INFO)

  const { replaceState } = useRouter();

  useEffect(() =>{
    if(signUpFromLocal?.name){
      form.setFieldValue('name', signUpFromLocal?.name)
    }
  },[signUpFromLocal?.name])

  function handleSignUp({name}:any) {
   webLocalStorage.set(constants?.SIGN_UP_INFO,{...signUpFromLocal, name:name} )
    replaceState({
      type: SignUpStepEnums?.WEBSITE_ADDRESS,
    });
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleSignUp}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("your-name.whats-your-name")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="name"
            rules={[
              {
                required: true,
                message: t("your-name.please-enter-your-name"),
              },
            ]}
          >
            <Input
              isRequired
              placeholder={t("your-name.enter-your-name")}
              type="email"
              allowClear
            />
          </S.FormItem>

          <S.LoginButton type="primary" onClick={form.submit}>
            {t("your-name.continue")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default YourName;
