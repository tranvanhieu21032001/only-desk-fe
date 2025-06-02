import styled from 'styled-components';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { Option } from 'antd/es/mentions';
import Select from '@/shared/components/common/Select';

export const ModalDescription = styled.div`
  margin-bottom: 24px;

  p {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

export const FormField = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
  label {
    font-weight: ${fontWeight.semiBold};
  }

  input {
    font-size: ${(props) => props.theme.fontSize.base};
    padding: 12px;
    border-radius:8px;
    border-top: 1px solid ${(props) => props.theme.colors.newtral};
  }
`;

export const ChangeLang = styled(Select)`
  width: 100%;

  margin-bottom: 12px;

  .ant-select-selection-item {
    display: flex !important;

    align-items: center;
    gap: 8px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    margin-bottom: 0%;
  }
`;

export const LangOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
