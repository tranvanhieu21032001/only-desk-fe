import styled from 'styled-components';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { Option } from 'antd/es/mentions';
import { Select } from 'antd';

export const WrapModal = styled.div``;

export const ModalHeader = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 12px 12px 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.newtral};

  @media ${(props) => props.theme.breakpoints.mdMax} {
    padding: 12px;
  }
`;

export const ModalHeaderContent = styled.div``;

export const ModalDescription = styled.div`
  p {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

export const ModalBody = styled.div`
  padding: 24px 48px;
`;

export const GroupInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom:24px;
`;

export const ModalFooter = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.colors.newtral};

  > div {
    display: flex;
    align-items: center;
  }

  > div:first-child {
    gap: 8px;
  }

  .button-group {
    gap: 8px;
  }

  .button-group > button {
    width: fit-content;
  }

  .button-group > button > span > span {
    gap: 8px;
  }
`;

export const ChangeLang = styled(Select)`
  width: 100%;
  margin-bottom: 12px;

  .ant-select-selector {
    display: flex !important;
    align-items: center;
    height: 39px !important;
    padding: 0 20px 0 12px !important;
    border-radius: 8px;
  }

  .ant-select-selection-item {
    display: flex !important;
    align-items: center;
    gap: 8px;
    line-height: 1;
  }

  .ant-select-arrow {
    height: 50px;
    display: flex;
    align-items: center;
    top: 0 !important;
    right: 8px !important;
    transform: none !important;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    margin-bottom: 0;
  }
`;



export const LangOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 50%;

  label {
    font-weight: ${fontWeight.semiBold};
  }

  .ant-select-selector {
    padding:12px;
  }
`;

export const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom:8px;
`;
