import { deleteRequest, postRequest } from '@/core/services/requests';
import { patchRequest } from '@/core/services/requests/patchRequest';
import { TFunction } from 'i18next';

const prefixBase = '';

export const endpointOperatorsSetting = {
  ADD_MEMBER_TO_WORKSPACE: `${prefixBase}/workspaces/:workspaceId/members`,
  REMOVE_MEMBER_FROM_WORKSPACE: `${prefixBase}/workspaces/:workspaceId/members/:memberId`,
  UPDATE_MEMBER_IN_WORKSPACE: `${prefixBase}/workspaces/:workspaceId/members/:memberId`,
};

function replacePathParams(path: string, params: Record<string, string>) {
  return Object.entries(params).reduce(
    (acc, [key, val]) => acc.replace(`:${key}`, val),
    path,
  );
}

export const addMemberToWorkspace = (
  workspaceId: string,
  body: { email: string; role: string },
  t: TFunction,
) =>
  postRequest(
    replacePathParams(endpointOperatorsSetting.ADD_MEMBER_TO_WORKSPACE, {
      workspaceId,
    }),
    {
      data: body,
      messageSuccess: t('operators.invite-success'),
    },
  );

export const removeMemberFromWorkspace = (
  workspaceId: string,
  memberId: string,
  t: TFunction,
) =>
  deleteRequest(
    replacePathParams(endpointOperatorsSetting.REMOVE_MEMBER_FROM_WORKSPACE, {
      workspaceId,
      memberId,
    }),
    {
      messageSuccess: t('operators.remove-success'),
    },
  );

export const updateMemberInWorkspace = (
  workspaceId: string,
  memberId: string,
  body: { role?: string; status?: string },
  t: TFunction,
) =>
  patchRequest(
    replacePathParams(endpointOperatorsSetting.UPDATE_MEMBER_IN_WORKSPACE, {
      workspaceId,
      memberId,
    }),
    {
      data: body,
      messageSuccess: t('operators.update-success'),
    },
  );
