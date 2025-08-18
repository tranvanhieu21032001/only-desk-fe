import React, { ReactNode, useState } from 'react';
import { Tooltip, Button, Modal } from 'antd';
import styled from 'styled-components';
import ToastMessage from '@/shared/components/common/ToastMessage';
import { ToastMessageType } from '@/shared/helper/enums/common';
import { toast } from 'react-toastify';
import ChoisePlan from '@/modules/settings/components/billing/billing-content/main/change-plan/Content/choise-plan/ChoisePlan';

interface UpgradePromptProps {
  children: ReactNode;
  message: string;
}

const Wrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;

const TooltipContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #ffff;
  padding:8px 12px;
`;

const TooltipMessage = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  white-space: normal;
`;

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  children,
  message,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    toast(
      React.createElement(ToastMessage, {
        typeToast: ToastMessageType.WARNING,
        message,
      }),
    );
  };

  const tooltipContent = (
    <TooltipContent>
      <TooltipMessage>🔒 {message}</TooltipMessage>
      <Button
        type="primary"
        size="small"
        onClick={(e) => {
          e.stopPropagation(); // không trigger Wrapper click
          setOpen(true); // mở modal
        }}
      >
        Upgrade
      </Button>
    </TooltipContent>
  );

  return (
    <>
      <Tooltip
        title={tooltipContent}
        placement="top"
        color="#fff"
        overlayInnerStyle={{ color: '#000' }}
        autoAdjustOverflow={true}
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement || document.body
        }
      >
        <Wrapper onClick={handleClick}>{children}</Wrapper>
      </Tooltip>

      <Modal
        title="Upgrade Plan"
        open={open}
        onCancel={() => setOpen(false)}
        footer=''
        width={1300}
        style={{ top: 20 }}
      >
        <ChoisePlan/>
      </Modal>
    </>
  );
};
