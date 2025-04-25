import { isArray } from "lodash";
import { toast } from "react-toastify";

import i18n from "@/core/services/i18n";
import { constants } from "@/core/settings";
import axiosInstance from "../base/axiosInstance";
import webLocalStorage from "@/shared/utils/webLocalStorage";
import { RequestOptionsInterface } from "@/core/model/requestOptions";

const postRequest = <T = any>(
  url: string,
  options?: RequestOptionsInterface
): Promise<T> => {
  const {
    data,
    isFormData=false,
    enableFlashMessageSuccess = false,
    enableFlashMessageError = true,
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
      if (enableFlashMessageSuccess && res.data?.message) {
        toast.success(
          i18n.t(`messages:messages.${res.data?.message}`, {
            defaultValue: res.data?.message || "",
          })
        );
      }
      return res;
    })
    .catch((err: any) => {
      if (enableFlashMessageError && isArray(err?.response?.data?.message)) {
        err.response.data.message.forEach((item: any) => {
          toast.error(item);
        });
      }else if(enableFlashMessageError && err?.response?.data?.message){
          toast.error(err?.response?.data?.message);
      }

      return Promise.reject(err);
    });
};

export { postRequest };
