import { useState } from 'react';
import { ModalProps } from 'antd';
import {
  CloseOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';

import Button from '../Button';
import Typography from '../Typography';

import * as S from './modal.styles';

export interface ModalInterface extends ModalProps {
  onSubmit?: () => void;
  showFooter?: boolean;
  textBtnCancel?: string;
  isScroll?: boolean;
  textBtnSubmit?: string;
  isLoading?: boolean;
  isDisabledSubmit?: boolean;
  isDisabledCancel?: boolean;
  onCancel?: (e?: any) => void;
  fullScreen?: boolean;
  rootClassName?: string;
}

export default function ModalCommon({
  title,
  width = 590,
  centered = true,
  children,
  showFooter = true,
  textBtnCancel,
  textBtnSubmit,
  isScroll = false,
  onCancel,
  onSubmit,
  isLoading,
  isDisabledSubmit = false,
  isDisabledCancel = false,
  fullScreen = false,
  rootClassName,
  ...rest
}: ModalInterface) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    false || fullScreen,
  );

  return (
    <S.ModalCustom
      onCancel={onCancel}
      title={null}
      width={width}
      footer={null}
      centered={centered}
      $isFullScreen={isFullScreen}
      rootClassName={rootClassName}
      {...rest}
    >
      {title && (
        <S.Header>
          <Typography variant="h3" color={themeColors.primary}>
            {title}
          </Typography>
          <S.WrapIcons>
            {isFullScreen ? (
              <FullscreenExitOutlined
                onClick={() => setIsFullScreen(!isFullScreen)}
              />
            ) : (
              <FullscreenOutlined
                onClick={() => setIsFullScreen(!isFullScreen)}
              />
            )}
            <CloseOutlined onClick={onCancel} />
          </S.WrapIcons>
        </S.Header>
      )}
      <S.Content $isScroll={isScroll}>{children}</S.Content>
      {showFooter && (
        <S.Footer>
          {textBtnCancel && (
            <Button
              type="primary"
              width="100px"
              onClick={onCancel}
              isCancel
              disabled={isDisabledCancel}
            >
              {textBtnCancel}
            </Button>
          )}
          {textBtnSubmit && (
            <Button
              type="primary"
              width="100px"
              onClick={onSubmit}
              isLoading={isLoading}
              disabled={isDisabledSubmit}
            >
              {textBtnSubmit}
            </Button>
          )}
        </S.Footer>
      )}
    </S.ModalCustom>
  );
}
