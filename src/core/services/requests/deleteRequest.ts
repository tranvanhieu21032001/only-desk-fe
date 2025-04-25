import { message } from "antd";

import axiosInstance from "../base/axiosInstance";
import i18n from "@/core/services/i18n";
import webStorageClient from "@/shared/utils/webStorageClient";
import { RequestOptionsInterface } from "@/core/model/requestOptions";

const deleteRequest = <T = any>(
  url: string,
  options?: RequestOptionsInterface
): Promise<T> => {
  const {
    data,
    enableFlashMessageSuccess = false,
    enableFlashMessageError = true,
  } = options || {};
  const tokenClient = webStorageClient.getToken();

  // Common request configuration
  const config = {
    data,
    headers: {
      ...(tokenClient && { Authorization: `Bearer ${tokenClient}` }),
    },
  };

  return (axiosInstance as any)
    .delete(url, config)
    .then((res: any) => {
      if (enableFlashMessageSuccess && res.data?.message) {
        message.success(
          i18n.t(`messages:messages.${res.data?.message}`, {
            defaultValue: res.data?.message || "",
          })
        );
      }
      return res;
    })
    .catch((err: any) => {
      if (enableFlashMessageError && err?.response?.data?.errors?.length > 0) {
        err.response.data.errors.forEach((item: any) => {
          message.error(
            i18n.t(`messages:messages.${item.detail}`, {
              defaultValue: item.detail || "",
            })
          );
        });
      }
      return Promise.reject(err);
    });
};

export { deleteRequest };
