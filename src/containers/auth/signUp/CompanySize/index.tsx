import { Form, Image } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { isArray } from "lodash";

import { useAppSelector } from "@/hooks";
import { useRouter } from "@/hooks/useRouter";
import { companySizes } from "@/helpers/data/signUp";
import { SignUpStepEnums } from "@/helpers/enums/auth";

import icArrowRight from "@/assets/icons/common/ic-arrow-right.svg";
import icTickCircle from "@/assets/icons/common/ic-tick-circle.svg";

import * as S from "./sign-up.styles";

function CompanySize() {
  const { t } = useTranslation("auth");
  const [search] = useSearchParams();
  const { currentObjHistory } = useAppSelector((state) => state?.historyRoute);

  const companySize =
    (isArray(currentObjHistory) ? currentObjHistory : [])?.find(
      (item) => item?.key === "size"
    )?.value || search.get("size");

  const [form] = Form.useForm();

  const { replaceState } = useRouter();

  function handleSignUp() {
    replaceState({
      type: SignUpStepEnums?.INVITE_YOUR_TEAM,
      size: "",
    });
  }

  function handleSelectSize(size: string) {
    replaceState({
      size: size,
    });
  }

  return (
    <S.SignInWrap>
      <S.SignInForm className="center-column-auth">
        <S.FormWrap form={form}>
          <S.LoginLabelWrap>
            <S.Title variant="h2" textAlign="center">
              {t("company-size.company-size")}
            </S.Title>
          </S.LoginLabelWrap>

          <S.SizeWrap>
            {companySizes?.map((size) => (
              <S.ButtonSize
                key={size?.key}
                onClick={() => handleSelectSize(size?.value)}
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
            onClick={handleSignUp}
            disabled={!companySize}
          >
            {t("website.continue")}
            <Image src={icArrowRight} preview={false} />
          </S.LoginButton>
        </S.FormWrap>
      </S.SignInForm>
    </S.SignInWrap>
  );
}

export default CompanySize;
