import React from "react";
import { isArray } from "lodash";
import { toast } from "react-toastify";

import i18n from "@/core/services/i18n";
import { constants } from "@/core/settings";
import axiosInstance from "../base/axiosInstance";
import webLocalStorage from "@/shared/utils/webLocalStorage";
import { ToastMessageType } from "@/shared/helper/enums/common";
import { RequestOptionsInterface } from "@/core/model/requestOptions";

import ToastMessage from "@/shared/components/common/ToastMessage";

const postRequest = <T = any>(
  url: string,
  options?: RequestOptionsInterface
): Promise<T> => {
  const {
    data,
    isFormData=false,
    messageSuccess = "",
    messageError = "",
  } = options || {};
  const tokenClient = webLocalStorage.get(constants?.ACCESS_TOKEN);

  // Common request configuration
  const config = {
    headers: {
      ...(tokenClient && { Authorization: `Bearer ${tokenClient}` }),
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      "Accept-Language": i18n.language,
    },
  };

  return (axiosInstance as any)
    .post(url, data, config)
    .then((res: any) => {
          toast(React.createElement(ToastMessage, {
            typeToast: ToastMessageType?.SUCCESS,
            message: messageSuccess ? messageSuccess: res.data?.message
        }));
      return res;
    })
    .catch((err: any) => {
      if(messageError){
        toast(React.createElement(ToastMessage, {
            typeToast: ToastMessageType?.ERROR,
            message:messageError
        }));
      }else if (isArray(err?.response?.data?.message)) {
        err.response.data.message.forEach((item: any) => {
           toast(React.createElement(ToastMessage, {
            typeToast: ToastMessageType?.ERROR,
            message:item
        }));
        });
      }else if(err?.response?.data?.message){
           toast(React.createElement(ToastMessage, {
            typeToast: ToastMessageType?.ERROR,
            message:err?.response?.data?.message
        }));
      }

      return Promise.reject(err);
    });
};

export { postRequest };
