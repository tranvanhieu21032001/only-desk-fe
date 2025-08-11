import { getRequest, postRequest, deleteRequest } from '@/core/services/requests';

const prefixBase = '';

export const ENDPOINT = {
  GET_ALL_PLAN: `${prefixBase}/plans`,
  CHECKOUT: `${prefixBase}/checkout`,
  INSTALL_PLUGIN: `${prefixBase}/plugins`,
  UNINSTALL_PLUGIN: `${prefixBase}/plugins`,
  GET_INVOICES: `${prefixBase}/checkout/invoices`,
};

export const getAllPlans = async () => {
  return getRequest(ENDPOINT.GET_ALL_PLAN, {
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};

export const checkoutPlan = async (planKey: string, provider: string = 'stripe') => {
  return postRequest(ENDPOINT.CHECKOUT, {
    data: {
      planKey,
      provider,
    },
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};

export const getInvoices = async () => {
  return getRequest(ENDPOINT.GET_INVOICES, {
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};
