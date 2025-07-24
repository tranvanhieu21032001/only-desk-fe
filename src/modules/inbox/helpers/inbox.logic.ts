import { constants } from '@/core/settings';
import { v4 as uuidv4 } from 'uuid';
import {
  InboxMessageType,
  InboxMessageStatus,
  InboxSender,
} from '@/modules/settings/helpers/enums/inbox.enums';
import { Message, Conversation } from '../interfaces/inbox';

export function createAgentMessage({
  content,
  type = InboxMessageType.Text,
  metadata = {},
  currentUserId,
  user,
}: {
  content: string;
  type?: InboxMessageType;
  metadata?: any;
  currentUserId: string;
  user: any;
}): Message {
  const now = new Date();
  return {
    id: uuidv4(),
    content,
    sender: InboxSender.Agent,
    user: user
      ? {
          id: currentUserId,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          email: user.email,
        }
      : null,
    type,
    status: InboxMessageStatus.Sending,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    metadata,
  };
}

export const uploadFile = async (
  file: File,
  onProgress?: (percent: number) => void,
) => {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise<{ fileUrl?: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${constants.API_SERVER}/file-upload/file`);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    };
    xhr.onerror = reject;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(formData);
  });
};

export function handleIconClickLogic(
  e: React.MouseEvent,
  message: Message,
  setContextMenu: (ctx: any) => void,
  setHoveredMessageId: (id: string) => void,
  MENU_WIDTH: number,
) {
  e.preventDefault();
  e.stopPropagation();

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const isAgent = message.sender === InboxSender.Agent;

  let x, y;

  if (isAgent) {
    x = rect.left - MENU_WIDTH - 5;
    y = rect.top;
  } else {
    x = rect.right + 5;
    y = rect.top;
  }

  // Check horizontal bounds
  if (x + MENU_WIDTH > window.innerWidth) {
    x = window.innerWidth - MENU_WIDTH - 8;
  }
  if (x < 8) {
    x = 8;
  }

  // Check vertical bounds
  const menuHeight = isAgent ? 200 : 100; // Approximate height based on menu items
  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight - 8;
  }
  if (y < 8) {
    y = 8;
  }

  setContextMenu({
    x: x,
    y: y,
    visible: true,
    message,
    messageId: message.id,
  });

  setHoveredMessageId(message.id);
}

export interface SendMessageParams {
  content: string;
  type?: InboxMessageType;
  metadata?: any;
  rawConversationId: string | null;
  currentUserId: string | null | undefined;
  user: any;
  addMessage: (msg: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, data: Partial<Message>) => void;
  setPendingImageLoads: (fn: (prev: number) => number) => void;
  scrollToShowNewMessage: () => void;
  sendAgentMessage: (payload: any, cb: (res: any) => void) => void;
  setInputValue: (val: string) => void;
  setActiveTab: (val: string | null) => void;
}

export function handleSendMessageLogic({
  content,
  type = InboxMessageType.Text,
  metadata = {},
  rawConversationId,
  currentUserId,
  user,
  addMessage,
  removeMessage,
  updateMessage,
  setPendingImageLoads,
  scrollToShowNewMessage,
  sendAgentMessage,
  setInputValue,
  setActiveTab,
}: SendMessageParams) {
  if ((!content.trim() && type === InboxMessageType.Text) || !rawConversationId)
    return;

  const now = new Date();
  const temp_id = uuidv4();
  const sendTime = Date.now();
  const newMessage: Message = {
    id: temp_id,
    content,
    sender: InboxSender.Agent,
    user:
      currentUserId && user?.firstName && user?.lastName && user?.avatar
        ? {
            id: currentUserId,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            email: user.email,
          }
        : null,
    type:
      type === InboxMessageType.Image
        ? InboxMessageType.Image
        : type === InboxMessageType.Note
          ? InboxMessageType.Note
          : InboxMessageType.Text,
    status: InboxMessageStatus.Sending,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    metadata,
  };

  addMessage(newMessage);

  if (type === InboxMessageType.Image || type === InboxMessageType.Note) {
    setTimeout(() => {
      scrollToShowNewMessage();
    }, 0);
  }

  if (type === InboxMessageType.Image) {
    setPendingImageLoads((prev) => prev + 1);
  }

  sendAgentMessage(
    {
      conversationId: rawConversationId,
      message: {
        content,
        type,
        metadata,
        temp_id,
      },
    },
    (res: any) => {
      const elapsedTime = Date.now() - sendTime;
      const minLoadingTime = 500;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        if (res?.success && res?.messageId) {
          removeMessage(temp_id);

          const realMessage: Message = {
            ...newMessage,
            id: res.messageId,
            status: InboxMessageStatus.Sent,
          };
          addMessage(realMessage);
        } else {
          updateMessage(temp_id, { status: InboxMessageStatus.Failed });
        }
      }, remainingTime);
    },
  );

  setInputValue('');
  setActiveTab(null);
}
