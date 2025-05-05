import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";

import { constants } from "@/core/settings";
import { websiteRegex } from "@/shared/regex";
import { useRouter } from "@/shared/hooks/useRouter";
import { SignUpStepEnums } from "../../helpers/enums/auth";
import webLocalStorage from "@/shared/utils/webLocalStorage";

import Input from "@/shared/components/common/Input";

import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";

import * as S from "./sign-up.styles";
import { useEffect } from "react";

function WebsiteAddress() {
  const { t } = useTranslation("auth");

  const [form] = Form.useForm();
  const { replaceState } = useRouter();

  const signUpFromLocal = webLocalStorage.get(constants?.SIGN_UP_INFO)

  useEffect(() =>{
    if(signUpFromLocal?.websiteUrl){
      form.setFieldsValue({
        websiteUrl: signUpFromLocal?.websiteUrl || ''
      })
    }
  },[signUpFromLocal?.websiteUrl])

  function handleSignUp(values:any) {
    webLocalStorage.set(constants?.SIGN_UP_INFO,{...signUpFromLocal, websiteUrl:values?.websiteUrl} )
    
    replaceState({
      type: SignUpStepEnums?.CONNECT_ONLY_CHAT,
    });
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form} onFinish={handleSignUp} validateTrigger="onSubmit">
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center" margin="0 0 4px 0">
              {t("website.whats-the-website")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.FormItem
            name="websiteUrl"
            rules={[
              {
                required: true,
                message: t("website.please-enter-website-address"),
              },{
                pattern: websiteRegex,
                message: t("website.website-address-not-valid"),
                }
            ]}
          >
            <Input
              isRequired
              placeholder={t("website.enter-your-website")}
              type="email"
              allowClear
            />
          </S.FormItem>

          <S.LoginButton type="primary" onClick={form.submit}>
            {t("website.continue")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default WebsiteAddress;
