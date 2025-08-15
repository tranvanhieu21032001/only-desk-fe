import { Message } from '@/shared/chat-logic';
import { MessageSender } from '@/shared/chat-logic/enums/chat.enums';

export const getSenderName = (msg: Message): string => {
  if (msg.sender === MessageSender.SYSTEM) return 'Only Chat';

  const firstName = msg.user?.firstName ?? '';
  const lastName = msg.user?.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || 'Guest';
};
