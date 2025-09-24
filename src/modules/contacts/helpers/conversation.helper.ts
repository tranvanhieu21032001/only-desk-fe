import { useMutation } from 'react-relay';
import { createConversationForContactMutation } from '@/relay/CreateConversationForContactMutation';
import { useNavigate } from 'react-router-dom';

export function useCreateConversation() {
  const [commitCreateConversation, isInFlight] = useMutation(
    createConversationForContactMutation
  );
  const navigate = useNavigate();

  const createConversation = (contactId: string) => {
    return new Promise<string>((resolve, reject) => {
      commitCreateConversation({
        variables: { contactId },
        onCompleted: (response: any) => {
          const newConversationId = response.createConversationForContact.id;
          navigate(`/inbox?conversationId=${newConversationId}`);
          resolve(newConversationId);
        },
        onError: (error) => {
          console.error('Error creating new conversation:', error);
          reject(error);
        },
      });
    });
  };

  return { createConversation, isInFlight };
}
