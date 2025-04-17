import React from "react";
import { Image } from "antd";
import { useTranslation } from "react-i18next";

import { OptionsInterface } from "@/model/common";
import { langOptions } from "@/helpers/data/signIn";
import themeColors from "@/styles/themes/default/colors";
import fontWeight from "@/styles/themes/default/fontWeight";

import Typography from "@/components/common/Typography";

import logo from "@/assets/icons/common/ic-logo.svg";

import * as S from "./auth.styles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("auth");

  return (
    <S.WrapAuthLayout>
      <S.AuthLayout className="container box-container">
        <S.HeaderWrap>
          <S.Logo src={logo} />
          <S.MultipleLangWrap>
            <S.NeedHelp
              fontWeight={`${fontWeight?.semiBold}`}
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
        <S.ChildrenWrap>{children}</S.ChildrenWrap>
      </S.AuthLayout>
    </S.WrapAuthLayout>
  );
}
