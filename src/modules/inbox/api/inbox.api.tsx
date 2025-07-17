import { deleteRequest } from '@/core/services/requests/deleteRequest';
import { getRequest } from '@/core/services/requests/getRequest';

export const deleteConversation = async (conversationId: string) => {
  return deleteRequest(`/chat/${conversationId}`);
};

export const getShortcutsList = async ({
  page = 1,
  limit = 10,
  keyword = '',
}: {
  page?: number;
  limit?: number;
  keyword?: string;
}) => {
  return getRequest(`/shortcuts`, {
    params: { page, limit, keyword },
  });
};
