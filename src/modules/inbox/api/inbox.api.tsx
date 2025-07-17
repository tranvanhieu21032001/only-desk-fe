import { deleteRequest } from '@/core/services/requests/deleteRequest';


export const deleteConversation = async (conversationId: string) => {
  return deleteRequest(`/chat/${conversationId}`);
};
