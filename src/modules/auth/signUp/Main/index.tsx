import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "@/shared/hooks";
import { SignUpStepEnums } from "../../helpers/enums/auth";

import YourName from "../YourName";
import Customer from "../Customer";
import StartForFree from "../FormSignUp";
import ConfirmCode from "../ConfirmCode";
import CompanySize from "../CompanySize";
import WebsiteAddress from "../WebsiteAddress";
import InviteYourTeam from "../InviteYourTeam";
import ConnectOnlyChat from "../connectOnlyChat";
import ActivationProduct from "../ActivationProduct";

import * as S from "./sign-up.styles";

function SignUp() {
  const [search] = useSearchParams();
  const { currentObjHistory }:any = useAppSelector((state) => state?.historyRoute);

  const signUpType = (currentObjHistory || [])?.find((item:any) => item?.key === "type")?.value ||
    search.get("type");

  const renderContentSignUp = useMemo(() => {
    switch (signUpType) {
      case SignUpStepEnums?.SIGN_UP:
        return <StartForFree />;
      case SignUpStepEnums?.CONFIRM_CODE:
        return <ConfirmCode />;
      case SignUpStepEnums?.ACTIVATING_PRODUCT:
        return <ActivationProduct />;  
      case SignUpStepEnums?.YOUR_NAME:
        return <YourName />;
      case SignUpStepEnums?.WEBSITE_ADDRESS:
        return <WebsiteAddress />;
      case SignUpStepEnums?.CONNECT_ONLY_CHAT:
        return <ConnectOnlyChat />;
      case SignUpStepEnums?.COMPANY_SIZE:
        return <CompanySize />;
      case SignUpStepEnums?.INVITE_YOUR_TEAM:
        return <InviteYourTeam />;
      case SignUpStepEnums?.CUSTOMER:
        return <Customer />;
      default:
        return <StartForFree />;
    }
  }, [signUpType]);

  return <S.SignInWrap>{renderContentSignUp}</S.SignInWrap>;
}

export default SignUp;
