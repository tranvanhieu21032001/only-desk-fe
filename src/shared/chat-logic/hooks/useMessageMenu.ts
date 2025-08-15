import { RelayStoreHelper } from '../helpers/relay-store.helper';
import { Message } from '../interfaces/inbox';

interface UseMessageMenuProps {
  message: Message;
  rawConversationId: string;
  onCloseMenu: () => void;
  onReply: (message: Message) => void;
}

interface UseMessageMenuReturn {
  handleCopyText: (
    onSuccess?: () => void,
    onError?: (error: any) => void,
  ) => void;
  handleReply: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export function useMessageMenu({
  message,
  rawConversationId,
  onCloseMenu,
    onReply,
}: UseMessageMenuProps): UseMessageMenuReturn {
  const handleCopyText = async (
    onSuccess?: () => void,
    onError?: (error: any) => void,
  ) => {
    if (message.content) {
      onCloseMenu();
      try {
        await navigator.clipboard.writeText(message.content);
        onSuccess?.();
      } catch (error) {
        onError?.(error);
      }
    }
  };

 const handleReply = () => {
    onCloseMenu();
    onReply(message);
  };
  const handleEdit = () => console.log('Edit message:', message?.id);
  const handleDelete = () => {
    onCloseMenu();
    RelayStoreHelper.removeMessage(message?.id, rawConversationId);
  };
  return {
    handleCopyText,
    handleReply,
    handleEdit,
    handleDelete,
  };
}
