import React, { useState } from 'react';
import styled from 'styled-components';
import icWarning from '@/assets/icons/common/ic-warning-message.svg';
import { Button, Modal } from 'antd';
import ChoisePlan from '@/modules/settings/components/billing/billing-content/main/change-plan/Content/choise-plan/ChoisePlan';

interface PermissionWarningMessageProps {
  message?: string;
  needUpgrade?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: #fff3cd;
  color: #333333;
  padding: 12px;
  border: 1px solid #faad14;
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;
  margin-bottom: 24px;
`;
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const PermissionWarningMessage: React.FC<PermissionWarningMessageProps> = ({
  message = 'This feature is not available in your current plan',
  needUpgrade = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Wrapper role="alert">
        <ContentWrapper>
          <Icon src={icWarning} alt="warning" />
          <span>{message}</span>
        </ContentWrapper>
        {needUpgrade && (
          <Button
            type="primary"
            size="middle"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Upgrade
          </Button>
        )}
      </Wrapper>
      <Modal
        title="Upgrade Plan"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1300}
        style={{ top: 20 }}
      >
        <ChoisePlan />
      </Modal>
    </>
  );
};

export default PermissionWarningMessage;
