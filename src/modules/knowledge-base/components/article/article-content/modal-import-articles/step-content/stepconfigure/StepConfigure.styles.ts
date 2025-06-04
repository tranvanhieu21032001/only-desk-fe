import styled from 'styled-components';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import themeColors from '@/shared/styles/themes/default/colors';

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

export const HelpButton = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 104px;
  height: 23px;
  border-radius: 8px;
  padding: 8px 10px;
  gap: 8px;
  border-top: 1px;
  border-right: 1px ;
  border-left: 1px;
   background-color:#E8F0FD;
  font-weight: ${fontWeight.light};
  font-size: ${(props) => props.theme.fontSize.sm};
  color:${themeColors?.secondary};
   cursor: pointer;
`;

export const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`