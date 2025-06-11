import { postRequest } from '@/core/services/requests';
import { getRequest } from '@/core/services/requests';
import { updateRequest } from '@/core/services/requests/putRequest';
import { deleteRequest } from '@/core/services/requests/deleteRequest';

export const handleCreateShortcut = async ({
  shortcut,
  message,
  tag,
}: {
  shortcut: string;
  message: string;
  tag?: string;
}) => {
  return postRequest('/shortcuts', {
    data: {
      shortcut,
      message,
      tag: tag || '',
    },
    messageSuccess: 'Shortcut created successfully!',
    messageError: 'Failed to create shortcut',
  });
};

export const getShortcutsList = async ({
  keyword = 'shortcut',
  page = 1,
  limit = 10,
}: {
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

export const handleUpdateShortcut = async ({
  id,
  shortcut,
  message,
  tag,
}: {
  id: string;
  shortcut: string;
  message: string;
  tag?: string;
}) => {
  return updateRequest(`/shortcuts/${id}`, {
    data: {
      shortcut,
      message,
      tag: tag || '',
    },
    messageSuccess: 'Shortcut updated successfully!',
    messageError: 'Failed to update shortcut',
  });
};

export const handleDeleteShortcut = async (id: string) => {
  return deleteRequest(`/shortcuts/${id}`, {
    messageSuccess: 'Shortcut deleted successfully!',
    messageError: 'Failed to delete shortcut',
  });
};
