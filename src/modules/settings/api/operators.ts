import { deleteRequest, postRequest } from '@/core/services/requests';
import { patchRequest } from '@/core/services/requests/patchRequest';
import { TFunction } from 'i18next';

const prefixBase = '';

export const endpointOperatorsSetting = {
  ADD_MEMBER_TO_WORKSPACE: `${prefixBase}/workspaces/members`,
  REMOVE_MEMBER_FROM_WORKSPACE: `${prefixBase}/workspaces/members/:memberId`,
  UPDATE_MEMBER_IN_WORKSPACE: `${prefixBase}/workspaces/members/:memberId`,
};

function replacePathParams(path: string, params: Record<string, string>) {
  return Object.entries(params).reduce(
    (acc, [key, val]) => acc.replace(`:${key}`, val),
    path,
  );
}

export const addMemberToWorkspace = (
  body: { email: string; role: string },
  t: TFunction,
) =>
  postRequest(endpointOperatorsSetting.ADD_MEMBER_TO_WORKSPACE, {
    data: body,
    messageSuccess: t('operators.invite-success'),
  });

export const removeMemberFromWorkspace = (
  memberId: string,
  t: TFunction,
) =>
  deleteRequest(
    replacePathParams(endpointOperatorsSetting.REMOVE_MEMBER_FROM_WORKSPACE, {
      memberId,
    }),
    {
      messageSuccess: t('operators.remove-success'),
    },
  );

export const updateMemberInWorkspace = (
  memberId: string,
  body: { role?: string; status?: string },
  t: TFunction,
) =>
  patchRequest(
    replacePathParams(endpointOperatorsSetting.UPDATE_MEMBER_IN_WORKSPACE, {
      memberId,
    }),
    {
      data: body,
      messageSuccess: t('operators.update-success'),
    },
  );
