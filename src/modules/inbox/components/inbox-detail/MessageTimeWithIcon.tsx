import React from 'react';
import { Tooltip } from 'antd';
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';

import * as S from './InboxDetail.styles';
import icBarColumn from '@/assets/icons/common/ic-bar-column.svg';
import { MessageStatus } from '@/shared/chat-logic/enums/chat.enums';

interface MessageTimeWithIconProps {
  isOwner: boolean;
  hovered: boolean;
  onMenuClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  createdAt: string;
  status: MessageStatus;
  rightIcon?: boolean;
}

const MessageTimeWithIcon: React.FC<MessageTimeWithIconProps> = ({
  hovered,
  onMenuClick,
  onHoverEnter,
  onHoverLeave,
  status,
  rightIcon = false,
}) => {
  const iconNode = hovered ? (
    <S.MessageHoverIconNearTime onClick={onMenuClick}>
      <img src={icBarColumn} alt="menu" />
    </S.MessageHoverIconNearTime>
  ) : (
    <S.MessageHoverIconPlaceholder />
  );

  return (
    <S.TimeWithIconContainer
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      {rightIcon ? <>{iconNode}</> : <>{iconNode}</>}
      {status === MessageStatus.SENDING && (
        <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
      )}
      {status === MessageStatus.FAILED && (
        <Tooltip title="Send failed">
          <CloseCircleTwoTone
            twoToneColor="#ff4d4f"
            style={{ marginLeft: 6, fontSize: 12 }}
          />
        </Tooltip>
      )}
    </S.TimeWithIconContainer>
  );
};

export default MessageTimeWithIcon;
