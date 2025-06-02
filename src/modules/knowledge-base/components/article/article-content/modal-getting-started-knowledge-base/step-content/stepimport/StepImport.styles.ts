import styled from 'styled-components';
import themeColors from '@/shared/styles/themes/default/colors';
import Button from '@/shared/components/common/Button';

export const ModalDescription = styled.div`
  margin-bottom: 24px;

  p {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

export const CreateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 1px dashed ${themeColors?.newtral};
    padding:32px 12px;
    margin:24px 0;
`;

export const CreateButton = styled(Button)`
  width: fit-content;
  min-width: 0;
  padding: 8px 16px;

  &:hover {
    background: unset;
    box-shadow: none !important;
    color: inherit;
  }
`;

