import { Image } from "antd";
import { useTranslation } from "react-i18next";

import themeColors from "@/styles/themes/default/colors";

import { OptionsInterface } from "@/model/common";
import { langOptions } from "@/helpers/data/signIn";
import Typography from "@/components/common/Typography";
import fontWeight from "@/styles/themes/default/fontWeight";

import * as S from "./sign-in.styles";

import logo from "@/assets/icons/common/ic-logo.svg";

function SignIn() {
  const { t } = useTranslation("auth");

  return (
    <S.SignInWrap>
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
    </S.SignInWrap>
  );
}

export default SignIn;
