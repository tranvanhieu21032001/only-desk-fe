import { Popover } from 'antd';

import * as S from './popover.styled';

interface PopoverCommonProps {
  content: React.ReactNode;
  btnContent: React.ReactNode;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  trigger?: 'click' | 'hover' | 'focus' | 'contextMenu';
}

function PopoverAction({
  content,
  btnContent,
  placement,
  trigger,
}: PopoverCommonProps) {
  return (
    <S.PopoverContainer>
      <Popover
        placement={placement || 'bottom'}
        content={content}
        trigger={trigger || 'hover'}
        rootClassName="popover-action"
      >
        {btnContent}
      </Popover>
    </S.PopoverContainer>
  );
}

export default PopoverAction;
