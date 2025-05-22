import React from 'react';
import { isArray } from 'lodash';
import { toast } from 'react-toastify';

import axiosInstance from '../base/axiosInstance';
import webStorageClient from '@/shared/utils/webStorageClient';
import { ToastMessageType } from '@/shared/helper/enums/common';
import { RequestOptionsInterface } from '@/core/model/requestOptions';

import ToastMessage from '@/shared/components/common/ToastMessage';

const deleteRequest = <T = any>(
  url: string,
  options?: RequestOptionsInterface,
): Promise<T> => {
  const {
    data,
    messageSuccess = '',
    messageError = '',
    enableFlashMessageError = true,
    enableFlashMessageSuccess = true,
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
      enableFlashMessageSuccess &&
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

export { deleteRequest };
