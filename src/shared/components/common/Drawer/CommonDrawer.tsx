import React from 'react';
import { Drawer } from 'antd';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { createGlobalStyle } from 'styled-components';

export const GlobalDrawerWrapperStyles = createGlobalStyle`
  .ant-drawer-content-wrapper {
    padding: 12px !important;
    box-shadow: unset !important;
  }

  .ant-drawer-content {
    border-radius: 16px;
  }

  .ant-drawer-header-title {
    flex-direction: row-reverse;
  }

  .ant-picker{
  height:47px;
  }
`;

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  width?: number;
}

const CommonDrawer: React.FC<Props> = ({
  open,
  onClose,
  title,
  description,
  children,
  width = 500,
}) => {
  return (
    <>
      <GlobalDrawerWrapperStyles />
      <Drawer
        title={
          <>
            <Typography
              fontWeight={fontWeight?.semiBold}
              variant="body-text-larger"
            >
              {title}
            </Typography>
            {description && (
              <Typography
                fontWeight={fontWeight?.light}
                color={themeColors?.newtralLight}
              >
                {description}
              </Typography>
            )}
          </>
        }
        placement="right"
        width={width}
        onClose={onClose}
        open={open}
      >
        {children}
      </Drawer>
    </>
  );
};

export default CommonDrawer;
