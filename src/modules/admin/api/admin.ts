import { getRequest, updateRequest } from '@/core/services/requests';

const prefixBase: string = '';

export const ENDPOINTADMIN = {
  ADMIN_INVOICES: `${prefixBase}/admin/invoices`,
  ADMIN_USERS: `${prefixBase}/admin/users`,
  ADMIN_WORKSPACES: `${prefixBase}/admin/workspaces`,
  ADMIN_SUBSCRIPTIONS: `${prefixBase}/admin/subscriptions`,
};

export const getAdminInvoices = async (
  workspaceId: string,
  page: number = 1,
  limit: number = 20,
) => {
  return getRequest(ENDPOINTADMIN.ADMIN_INVOICES, {
    params: { workspaceId, page, limit },
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};

export const getAdminUsers = async (
  page: number = 1,
  limit: number = 20,
  keyword: string = '',
) => {
  return getRequest(ENDPOINTADMIN.ADMIN_USERS, {
    params: { page, limit, keyword: keyword || undefined },
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};

export const getAdminWorkspaces = async (
  keyword: string = '',
  page: number = 1,
  limit: number = 20,
) => {
  return getRequest(ENDPOINTADMIN.ADMIN_WORKSPACES, {
    params: { keyword: keyword || undefined, page, limit },
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};

export const getAdminSubscriptions = async (
  workspaceId: string,
  page: number = 1,
  limit: number = 20,
) => {
  return getRequest(ENDPOINTADMIN.ADMIN_SUBSCRIPTIONS, {
    params: { workspaceId, page, limit },
    enableFlashMessageSuccess: false,
    enableFlashMessageError: true,
  });
};

interface UpdateWorkspacePayload {
  status?: 'draft' | 'pending' | 'installed' | 'closed';
  plan?: 'free' | 'mini' | 'essentials' | 'plus';
  trialEndsAt?: string;
}
export const updateAdminWorkspace = async (
  workspaceId: string,
  payload: UpdateWorkspacePayload,
) => {
  const data: Partial<UpdateWorkspacePayload> = {};
  if (payload.status !== undefined) data.status = payload.status;
  if (payload.plan !== undefined) data.plan = payload.plan;
  if (payload.trialEndsAt !== undefined) data.trialEndsAt = payload.trialEndsAt;

  return updateRequest(`${ENDPOINTADMIN.ADMIN_WORKSPACES}/${workspaceId}`, {
    data,
    messageSuccess: 'Workspace updated successfully!',
  });
};


interface UpdateUserPayload {
  status?: 'active' | 'pending';
}

export const updateAdminUser = async (
  userId: string,
  payload: UpdateUserPayload,
) => {
  const data: Partial<UpdateUserPayload> = {};
  if (payload.status !== undefined) data.status = payload.status;

  return updateRequest(`${ENDPOINTADMIN.ADMIN_USERS}/${userId}`, {
    data,
    messageSuccess: 'User updated successfully!',
  });
};
