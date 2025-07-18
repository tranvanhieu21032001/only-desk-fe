import React from 'react';

import { ChatMessageItemProps } from '../../interfaces/inbox';
import { MessageBaseItem } from './MessageBaseItem';

export const ChatMessageItem: React.FC<ChatMessageItemProps> = (props) => {
  return <MessageBaseItem {...props} isOwner={props.isOwner} avatarAdmin={props.avatarAdmin} />;
}; 