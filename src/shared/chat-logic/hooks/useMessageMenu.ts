import { Message } from '@/shared/chat-logic/interfaces/inbox';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { ToastMessageType } from '@/shared/helper/enums/common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { RelayStoreHelper } from '../helpers/relay-store.helper';

interface UseMessageMenuProps {
  message: Message;
  rawConversationId: string;
  onCloseMenu: () => void;
}

interface UseMessageMenuReturn {
  handleCopyText: () => void;
  handleReply: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export function useMessageMenu({
  message,
  rawConversationId,
  onCloseMenu,
}: UseMessageMenuProps): UseMessageMenuReturn {
  const { t } = useTranslation('inbox');

  const handleCopyText = async () => {
    if (message.content) {
      onCloseMenu();
      try {
        await navigator.clipboard.writeText(message.content);
        toast(
          React.createElement(ToastMessage, {
            typeToast: ToastMessageType.SUCCESS,
            message: t('inboxDetail.textCopiedToClipboard'),
          }),
        );
      } catch (error) {
        toast.error(
          React.createElement(ToastMessage, {
            typeToast: ToastMessageType.ERROR,
            message: t('inboxDetail.failedToCopyTextDesc'),
          }),
        );
      }
    }
  };

  const handleReply = () => console.log('Reply to:', message?.id);
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
