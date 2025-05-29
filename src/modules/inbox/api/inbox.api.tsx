import { getRequest } from '@/core/services/requests/getRequest';
import { ConversationListResponse, MessageListResponse } from '../interfaces/inbox';

export const getConversationList = async (
    workspaceId: string,
    page: number = 1,
    limit: number = 10
): Promise<ConversationListResponse> => {
    const response = await getRequest<ConversationListResponse>(
        `/chat/conversations?workspaceId=${workspaceId}&page=${page}&limit=${limit}`
    );
    return response;
};

export const getMessageList = async (
    conversationId: string,
    page: number = 1,
    limit: number = 10
): Promise<MessageListResponse> => {
    const response = await getRequest<MessageListResponse>(
        `/chat/messages?conversationId=${conversationId}&page=${page}&limit=${limit}`
    );
    return response;
};
