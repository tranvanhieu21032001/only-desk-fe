import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;

  span {
    color: red;
  }
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ConfirmModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const ConfirmTitle = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
  color: #333333;
`;

export const ConfirmDesc = styled.div`
  color: #666;
  font-size: 12px;
  line-height: 23px;
  font-weight: 400;
`;

export const ConfirmColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ConfirmIconWrap = styled.div`
  display: flex;
  gap: 10px;
`;
