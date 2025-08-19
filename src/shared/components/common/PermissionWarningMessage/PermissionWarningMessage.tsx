import React from "react";
import styled from "styled-components";
import icWarning from "@/assets/icons/common/ic-warning-message.svg";

interface PermissionWarningMessageProps {
  message?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fff3cd;
  color: #333333;
  padding: 18px 12px;
  border:1px solid #faad14;
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;
  margin-bottom:24px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const PermissionWarningMessage: React.FC<PermissionWarningMessageProps> = ({
  message = "This feature is not available in your current plan",
}) => {
  return (
    <Wrapper role="alert">
      <Icon src={icWarning} alt="warning" />
      <span>{message}</span>
    </Wrapper>
  );
};

export default PermissionWarningMessage;
