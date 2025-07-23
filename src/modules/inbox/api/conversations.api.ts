import { updateRequest } from '@/core/services/requests';

const prefixContact: string = '';

const endpointContact = {
  UPDATE_CONVERSATIONS: `${prefixContact}/chat/conversations/:conversationsId`,
};

const handleUpdateConversation = async (
  conversationId: string,
  values: any,
  t: (key: string) => string
) => {
  const updatePayload = Object.fromEntries(
    Object.entries(values).filter(([_, v]) => v !== undefined)
  );
  await updateRequest(
    endpointContact.UPDATE_CONVERSATIONS.replace(':conversationsId', conversationId),
    {
      data: updatePayload,
      messageSuccess: t('inboxSidebar.updateSuccess'),
    }
  );
};

export { endpointContact, handleUpdateConversation };
