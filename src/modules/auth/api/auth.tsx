import { omit } from "lodash";
import { TFunction } from "i18next";

import { constants } from "@/core/settings";

import { postRequest } from "@/core/services/requests";
import { SignUpStepEnums } from "../helpers/enums/auth";
import { omitSubmitSignUp } from "../helpers/data/signUp";
import webLocalStorage from "@/shared/utils/webLocalStorage";
import { ADMIN_ROUTES, AUTH_ROUTES } from "@/core/routes/constants";
import { actionLogin, actionSignUp } from "../store/features/auth";

const prefixAuth: string = "/auth";

const endpointAuth = {
  SIGN_IN: `${prefixAuth}/login`,
  SIGN_UP: `${prefixAuth}/register`,
  VERIFY_OTP: `${prefixAuth}/verify-code`,
  RESEND_OTP: `${prefixAuth}/resend-code`,
  COMPLETE_SIGN_UP: `${prefixAuth}/complete-register`,
};

const handleSignUp = async (values: any,dispatch:any,replaceState:any, t:TFunction) => {  
   const updateData = omit(values, ["confirmPassword",'policy']);
    dispatch(actionSignUp(true))
    //TODO
   await postRequest(endpointAuth?.SIGN_UP, {
    data: {...updateData,phoneNumber: '0982123456'},
    messageSuccess:t('sign-up-form.sign-up-success'),
    }).then(() =>{
    replaceState({
      type: SignUpStepEnums?.CONFIRM_CODE,
    })
    webLocalStorage.set(constants.SIGN_UP_INFO,{email:values?.email},)
    }).catch((err) =>err)
    .finally(() => dispatch(actionSignUp(false)));
}

const handleVerifyOtp = async(payloads:{
  code:string;
}, dispatch:any,replaceState:any, t:TFunction) =>{
    dispatch(actionSignUp(true))
    const email = webLocalStorage.get(constants.SIGN_UP_INFO)?.email
    
   await postRequest(endpointAuth?.VERIFY_OTP, {
    data: {...payloads, email:email},
    messageSuccess:t('confirm-code.confirmation-code'),
    }).then((res) =>{
    replaceState({
      type: SignUpStepEnums?.ACTIVATING_PRODUCT,
    })
    webLocalStorage.set(constants.ACCESS_TOKEN,res?.token)
    }).catch((err) =>err)
    .finally(() => dispatch(actionSignUp(false)));
}

const handleResendOtp = async(t:TFunction) =>{
    const payloads =webLocalStorage.get(constants.SIGN_UP_INFO)?.email
   await postRequest(endpointAuth?.RESEND_OTP, {
    data: {email:payloads},
    messageSuccess:t('confirm-code.resend-confirmation-code'),
    }).then(() =>{
    }).catch((err) =>err)
}

const handleFinishSignUp = async (values: any, dispatch:any, navigate:any, t:TFunction, replaceState:any) => {
  dispatch(actionSignUp(true))
  const getInfoFromLocal = webLocalStorage.get(constants.SIGN_UP_INFO)
  const updateValues = Object?.keys(values)?.filter((item:string) =>values?.[item])
  const updatePayloads = omit({...getInfoFromLocal,messagingPlatform:updateValues}, omitSubmitSignUp || [])

  await postRequest(endpointAuth?.COMPLETE_SIGN_UP, {
    data: updatePayloads,
    messageSuccess:t('sign-up-form.sign-up-success'),
  }).then(() => {
    replaceState({
      type:'',
    })
    localStorage.removeItem(constants?.SIGN_UP_INFO)

    navigate(AUTH_ROUTES?.SIGN_IN)
  }).catch((err) => err)
  .finally(() => dispatch(actionSignUp(false)));
}

const handleSignInApi = async (values: any, dispatch:any,navigate:any, t:TFunction) => {
  dispatch(actionSignUp(true))
  const updatePayloads = omit(values, ["remember"]);

    await postRequest(endpointAuth?.SIGN_IN, {
    data: updatePayloads,
    messageSuccess:t('sign-in-success'),
  }).then((res) => {
    dispatch(actionLogin({
      isAuth: true,
      rememberMe: values?.remember || false,
      userInfo: {
        userId: res?.userId,
        email:values?.email
      },
      accessToken: res?.token,
    }))

    navigate(ADMIN_ROUTES?.DASHBOARD)
  }).catch((err) => err)
  .finally(() => dispatch(actionSignUp(false)));
}  

export { prefixAuth,endpointAuth,handleSignUp,handleVerifyOtp, handleResendOtp, handleFinishSignUp,handleSignInApi };
