import { constants } from '@/core/settings';
import { MessageSender } from '@/shared/chat-logic/enums/chat.enums';
import { Message } from '@/shared/chat-logic/interfaces/inbox';

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
  const isAgent = message.sender === MessageSender.AGENT;

  setContextMenu({
    x: 0,
    y: 0,
    visible: true,
    message,
    messageId: message.id,
  });

  requestAnimationFrame(() => {
    const el = document.querySelector('.context-menu') as HTMLElement;
    const heightMenu = el?.getBoundingClientRect().height ?? 0;

    let x, y;
    if (isAgent) {
      x = rect.left - MENU_WIDTH - 5;
      y = rect.top;
    } else {
      x = rect.right + 5;
      y = rect.top;
    }
    if (x + MENU_WIDTH > window.innerWidth) {
      x = window.innerWidth - MENU_WIDTH - 8;
    }
    if (x < 8) {
      x = 8;
    }
    if (y + heightMenu + 100 > window.innerHeight) {
      if (heightMenu > 50) {
        y = window.innerHeight - heightMenu - 100 - 8;
      } else {
        y = window.innerHeight - heightMenu - 110 - 8;
      }
    }
    if (y < 8) {
      y = 8;
    }
    setContextMenu({
      x,
      y,
      visible: true,
      message,
      messageId: message.id,
    });

    setHoveredMessageId(message.id);
  });
}
