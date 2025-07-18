import React from 'react';
import { Tooltip } from 'antd';

import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import { InboxMessageStatus } from '@/modules/settings/helpers/enums/inbox.enums';

import * as S from './InboxDetail.styles';

import icBarColumn from '@/assets/icons/common/ic-bar-column.svg';

interface MessageTimeWithIconProps {
  isOwner: boolean;
  hovered: boolean;
  onMenuClick: (e: React.MouseEvent) => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  createdAt: string;
  status: InboxMessageStatus;
  formatTime: (date: string) => string;
  rightIcon?: boolean;
  style?: React.CSSProperties;
}

const MessageTimeWithIcon: React.FC<MessageTimeWithIconProps> = ({
  hovered,
  onMenuClick,
  onHoverEnter,
  onHoverLeave,
  createdAt,
  status,
  formatTime,
  rightIcon = false,
  style,
}) => {
  const timeNode = (
    <S.MessageTime style={rightIcon ? { marginRight: 0, marginLeft: 8, ...style } : style}>
      {formatTime(createdAt)}
      {status === InboxMessageStatus.Sending && (
        <LoadingOutlined style={{ marginLeft: 6, fontSize: 12 }} spin />
      )}
      {status === InboxMessageStatus.Failed && (
        <Tooltip title="Send failed">
          <CloseCircleTwoTone
            twoToneColor="#ff4d4f"
            style={{ marginLeft: 6, fontSize: 12 }}
          />
        </Tooltip>
      )}
    </S.MessageTime>
  );

  const iconNode = hovered ? (
    <S.MessageHoverIconNearTime onClick={onMenuClick}>
      <img src={icBarColumn} alt="menu" />
    </S.MessageHoverIconNearTime>
  ) : (
    <S.MessageHoverIconPlaceholder />
  );

  return (
    <S.TimeWithIconContainer onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
      {rightIcon ? (
        <>
          {iconNode}
          {timeNode}
        </>
      ) : (
        <>
          {timeNode}
          {iconNode}
        </>
      )}
    </S.TimeWithIconContainer>
  );
};

export default MessageTimeWithIcon; 