import React from 'react';
import { Image, Tooltip } from 'antd';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import * as S from './InboxDetail.styles';
import { InboxMessageStatus, InboxMessageType } from '@/modules/settings/helpers/enums/inbox.enums';
import { Message } from '../../interfaces/inbox';

import icBarColumn from '@/assets/icons/common/ic-bar-column.svg';

interface ContextMenu {
  x: number;
  y: number;
  visible: boolean;
  message: Message | null;
  messageId?: string;
}

export interface MessageComponentProps {
  msg: Message;
  hoveredMessageId: string | null;
  contextMenu: any;
  handleIconClick: (e: React.MouseEvent, message: Message) => void;
  setHoveredMessageId: (id: string | null) => void;
  formatTime: (date: string) => string;
  pendingImageScroll: boolean;
  setPendingImageScroll: (v: boolean) => void;
  setPendingImageLoads: React.Dispatch<React.SetStateAction<number>>;
  scrollToBottom: () => void;
  avatarAdmin: string;
  justLoadedMore: boolean;
}

export { OutgoingMessage } from './OutgoingMessage';
export { IncomingMessage } from './IncomingMessage'; 