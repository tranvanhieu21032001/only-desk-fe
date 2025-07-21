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
  const updatePayload = {
    resolved: values?.resolved ?? false,
    assignedToId: values?.assignedToId ?? null,
    participantsIds: values?.participantsIds ?? [],
    segments: values?.segments ?? [],
    metadata: values?.metadata ?? {},
  };

  await updateRequest(endpointContact.UPDATE_CONVERSATIONS.replace(':conversationsId', conversationId), {
    data: updatePayload,
    messageSuccess: t('inboxSidebar.updateSuccess'),
  });
};



export { endpointContact, handleUpdateConversation };
