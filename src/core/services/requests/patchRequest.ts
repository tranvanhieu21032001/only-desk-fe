import React from 'react';
import { isArray } from 'lodash';
import { toast } from 'react-toastify';

import axiosInstance from '../base/axiosInstance';
import webStorageClient from '@/shared/utils/webStorageClient';
import { RequestOptionsInterface } from '@/core/model/requestOptions';
import { ToastMessageType } from '@/shared/helper/enums/common';

import ToastMessage from '@/shared/components/common/ToastMessage';

const patchRequest = <T = any>(
  url: string,
  options?: RequestOptionsInterface,
): Promise<T> => {
  const {
    data,
    isFormData,
    messageSuccess = '',
    messageError = '',
    enableFlashMessageError = true,
  } = options || {};
  const tokenClient = webStorageClient.getToken();

  // Common request configuration
  const config = {
    headers: {
      ...(tokenClient && { Authorization: `Bearer ${tokenClient}` }),
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  };

  return (axiosInstance as any)
    .patch(url, data, config)
    .then((res: any) => {
      toast(
        React.createElement(ToastMessage, {
          typeToast: ToastMessageType?.SUCCESS,
          message: messageSuccess ? messageSuccess : res.data?.message,
        }),
      );
      return res;
    })
    .catch((err: any) => {
      if (enableFlashMessageError) {
        if (messageError) {
          toast(
            React.createElement(ToastMessage, {
              typeToast: ToastMessageType?.ERROR,
              message: messageError,
            }),
          );
        } else if (isArray(err?.response?.data?.message)) {
          err.response.data.message.forEach((item: any) => {
            toast(
              React.createElement(ToastMessage, {
                typeToast: ToastMessageType?.ERROR,
                message: item,
              }),
            );
          });
        } else if (err?.response?.data?.message) {
          toast(
            React.createElement(ToastMessage, {
              typeToast: ToastMessageType?.ERROR,
              message: err?.response?.data?.message,
            }),
          );
        }
      }
      return Promise.reject(err);
    });
};

export { patchRequest };
