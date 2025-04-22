import { useAppDispatch } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { actionLogout } from "@/core/store/features/auth";
import { AUTH_ROUTES } from "@/core/routes/constants";

import Button from "@/shared/components/common/Button";
import Typography from "@/shared/components/common/Typography";

import * as S from "./forbidden.styles";

function Forbidden() {
  const { t } = useTranslation("permissionManagement");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Content>
        <Typography variant="h3" margin="0 0 40px 0">
          {t("common.notPermission")}
        </Typography>
        <S.ButtonWrap>
          <Button onClick={() => navigate(-1)}>{t("common.back")}</Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch(actionLogout());
              navigate(AUTH_ROUTES.SIGN_IN);
            }}
          >
            {t("common.logout")}
          </Button>
        </S.ButtonWrap>
      </S.Content>
    </S.Wrapper>
  );
}

export default Forbidden;
