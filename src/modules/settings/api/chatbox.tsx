import { postRequest } from '@/core/services/requests';
import { getRequest } from '@/core/services/requests';

export const handleCreateShortcut = async ({ workspaceId, shortcut, message, tag }: {
  workspaceId: string;
  shortcut: string;
  message: string;
  tag?: string;
}) => {
  return postRequest('/shortcuts', {
    data: {
      workspaceId,
      shortcut,
      message,
      tag: tag || '',
    },
    messageSuccess: 'Shortcut created successfully!',
    messageError: 'Failed to create shortcut',
  });
};

export const getShortcutsList = async ({ keyword = 'shortcut', page = 1, limit = 10 }: {
  keyword?: string;
  page?: number;
  limit?: number;
}) => {
  return getRequest(`/shortcuts`, {
    params: {
      keyword,
      page: Number(page),
      limit: Number(limit),
    },
  });
};
