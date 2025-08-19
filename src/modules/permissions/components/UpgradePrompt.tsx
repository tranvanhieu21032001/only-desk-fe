import React, { ReactNode, useState } from 'react';
import { Tooltip, Button, Modal } from 'antd';
import ChoisePlan from '@/modules/settings/components/billing/billing-content/main/change-plan/Content/choise-plan/ChoisePlan';

import styles from './UpgradePrompt.module.css';

interface UpgradePromptProps {
  children: ReactNode;
  message: string;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  children,
  message,
}) => {
  const [open, setOpen] = useState(false);

  const tooltipContent = (
    <div className={styles.tooltipContent}>
      <div className={styles.tooltipMessage}>🔒 {message}</div>
      <Button
        type="primary"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Upgrade
      </Button>
    </div>
  );

  return (
    <>
      <Tooltip
        classNames={{
          root: 'tooltipUpgrade',
          body: 'tooltipBody',
        }}
        title={tooltipContent}
        placement="top"
        color="#fff"
        overlayInnerStyle={{ color: '#000' }}
        autoAdjustOverflow={true}
        getPopupContainer={() => document.body}
      >
        {children}
      </Tooltip>

      <Modal
        title="Upgrade Plan"
        open={open}
        onCancel={() => setOpen(false)}
        footer=""
        width={1300}
        style={{ top: 20 }}
      >
        <ChoisePlan />
      </Modal>
    </>
  );
};
