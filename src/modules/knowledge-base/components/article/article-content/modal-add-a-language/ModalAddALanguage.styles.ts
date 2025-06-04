import Select from '@/shared/components/common/Select';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { Option } from 'antd/es/mentions';
import styled from 'styled-components';

export const WrapModal = styled.div``;

export const Warning = styled.div`
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  img {
    width: 64px;
    height: auto;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    padding: 12px;
  }
`;

export const ModalBody = styled.div`
`;

export const ModalHeaderContent = styled.div``;

export const ModalContent = styled.div`
  padding: 24px 48px;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px 24px;
  }
`;

export const ModalDescription = styled.div`
  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
  }
`;

export const ModalFooter = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
    border-top: 1px solid ${(props) => props?.theme?.colors?.newtral};

  button {
    width: fit-content;

    .anticon-plus-circle {
      width: 18px;
      height: 18px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
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

export const FormField = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 4px;
  margin: 24px 48px;
  label {
    font-weight: ${fontWeight.semiBold};
`;

export const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`