import { Image } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "@/shared/hooks/useRouter";
import { SignUpStepEnums } from "../../helpers/enums/auth";

import Typography from "@/shared/components/common/Typography";

import bannerEmpty from "@/assets/images/auth/banner-empty.png";

import * as S from "./activation-product";

function ActivationProduct() {
  const { t } = useTranslation("auth");
  const { replaceState } = useRouter();

  useEffect(() =>{
    setTimeout(() => {
       replaceState({
      type: SignUpStepEnums?.YOUR_NAME,
    })
    }, 2000);
  },[])

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t("activation.activation-product")}
            </S.Title>

            <Typography margin="4px 0 0 0" textAlign="center">
              {t("activation.we-are-about")}
            </Typography>
          </S.LoginLabelWrap>

          <Image src={bannerEmpty} preview={false} width={200} height={200} />
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default ActivationProduct;
