import React from "react";
import { TFunction } from "i18next";

import { AuthStatusInstalledCodeEnums } from "./auth.enums";

import Typography from "@/components/common/Typography";

import { Styled } from "styled-components";
import themeColors from "@/styles/themes/default/colors";

const renderStatusInstalled = (
  status: AuthStatusInstalledCodeEnums,
  t: TFunction,
  S: Styled
) => {
  switch (status) {
    case AuthStatusInstalledCodeEnums?.NOT_INSTALLED:
      return (
        <S.StatusWrap>
          <Typography color={themeColors?.errorDark}>
            {t("connect-onlychat.not-installed")}
          </Typography>
        </S.StatusWrap>
      );

    default:
      break;
  }
};

export { renderStatusInstalled };
