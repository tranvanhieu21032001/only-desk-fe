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
  }

  input {
    height: 47px;
  }

  input[type='color'] {
    width: 100%;
    height: 47px !important;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 4px;
    background: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type='color']::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;


export const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const GroupInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 24px 48px;

  > div {
   margin:0;
    flex: 1; /* Mỗi FormField chiếm 50% */
  }
`;

export const SelectFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height:91px;
  gap: 12px;
  padding: 12px 16px;
  border: 1px dashed ${(props) => props.theme.colors.newtral};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  img {
    width: 24px;
    height: 24px;
  }

`;

export const ImagePreview = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 8px;
    object-fit: cover;
  }
`;

export const ImagePreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #d9363e;
  }
`;
