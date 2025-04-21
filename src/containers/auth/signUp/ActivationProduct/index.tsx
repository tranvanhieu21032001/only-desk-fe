import { Image } from "antd";
import { useTranslation } from "react-i18next";

import Typography from "@/components/common/Typography";

import bannerEmpty from "@/assets/images/auth/banner-empty.png";

import * as S from "./activation-product";

function ActivationProduct() {
  const { t } = useTranslation("auth");

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
