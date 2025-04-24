import { Image } from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
  objectHistoryInterface,
  OptionsInterface,
} from "@/modules/auth/model/common";
import { useAppSelector } from "@/shared/hooks";
import { useRouter } from "@/shared/hooks/useRouter";
import themeColors from "@/shared/styles/themes/default/colors";
import { langOptions } from "@/modules/auth/helpers/data/signIn";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import { SignUpStepEnums } from "@/modules/auth/helpers/enums/auth";

import Typography from "@/shared/components/common/Typography";

import logo from "@/assets/icons/common/ic-logo.svg";
import back from "@/assets/icons/auth/ic-arrow-left.svg";

import * as S from "./auth.styles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("auth");
  const [search] = useSearchParams();
  const { replaceState } = useRouter();
  const { currentObjHistory } = useAppSelector((state) => state?.historyRoute);

  const signUpType =
    (currentObjHistory || [])?.find((item: objectHistoryInterface) => item?.key === "type")?.value ||
    search.get("type") ||
    SignUpStepEnums?.SIGN_UP;

  const showInprogress = useMemo(() => {
    const currentPath = window.location.pathname;
    return currentPath.includes(SignUpStepEnums?.SIGN_UP);
  }, [window.location.pathname]);

  function handleBack() {
    switch (signUpType) {
      case SignUpStepEnums?.SIGN_UP:
        return window.history.back();
      case SignUpStepEnums?.CONFIRM_CODE:
        return replaceState({type: SignUpStepEnums?.SIGN_UP});  
      case SignUpStepEnums?.YOUR_NAME:
        return replaceState({type: SignUpStepEnums?.CONFIRM_CODE});   
      case SignUpStepEnums?.WEBSITE_ADDRESS:
        return replaceState({type: SignUpStepEnums?.YOUR_NAME});    
      case SignUpStepEnums?.CONNECT_ONLY_CHAT:
        return replaceState({type: SignUpStepEnums?.WEBSITE_ADDRESS});
      case SignUpStepEnums?.COMPANY_SIZE:
        return replaceState({type: SignUpStepEnums?.CONNECT_ONLY_CHAT});    
      case SignUpStepEnums?.INVITE_YOUR_TEAM:
        return replaceState({type: SignUpStepEnums?.COMPANY_SIZE});   
      case SignUpStepEnums?.CUSTOMER:
        return replaceState({type: SignUpStepEnums?.INVITE_YOUR_TEAM});        
      default:
        return window.history.back();
    }
  }

  return (
    <S.WrapAuthLayout>
      <S.AuthLayout className="box-container">
        <S.HeaderWrap>
          <S.Logo src={logo} />
          <S.MultipleLangWrap>
            <S.NeedHelp
              fontWeight={fontWeight?.semiBold}
              color={`${themeColors?.secondary}`}
            >
              {t("need-help")}
            </S.NeedHelp>
            <S.Divider />
            <S.ChangeLang
              defaultValue={langOptions?.[0]?.value}
              popupClassName="auth-lang"
            >
              {langOptions?.map((lang: OptionsInterface) => (
                <S.LangOption key={lang?.key}>
                  <Image src={lang?.flag as string} preview={false} />
                  <Typography>{t(`language.${lang?.label}`)}</Typography>
                </S.LangOption>
              ))}
            </S.ChangeLang>
          </S.MultipleLangWrap>
        </S.HeaderWrap>

        {showInprogress && (
          <S.Inprogress>
            <S.Back onClick={handleBack}>
              <Image src={back} preview={false} />
              <Typography
                color={themeColors?.secondary}
                fontWeight={fontWeight?.semiBold}
              >
                {t("back")}
              </Typography>
            </S.Back>

            <S.LineProgressWrap>
              {Object.values(SignUpStepEnums)?.map(
                (key: string, index: number) => {
                  const currentIndex = Object.values(SignUpStepEnums).indexOf(
                    signUpType as SignUpStepEnums
                  );
                  let lineColor = "";

                  if (index < currentIndex) {
                    lineColor = "old";
                  } else if (index === currentIndex) {
                    lineColor = "current";
                  }
                  return <S.Line key={key} $color={lineColor} />;
                }
              )}
            </S.LineProgressWrap>
          </S.Inprogress>
        )}
        <S.ChildrenWrap>{children}</S.ChildrenWrap>
      </S.AuthLayout>
    </S.WrapAuthLayout>
  );
}
