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
    padding:12px;
    margin:24px 0;
`;

export const CreateButton = styled(Button)`
    display:block;
  width: fit-content;
  min-width: 0;
  padding: 8px 16px;

  &:hover {
    background: unset;
    box-shadow: none !important;
    color: inherit;
  }
`;

export const OrDivider = styled.div`
    text-align: center;
    font-weight: ${(props) => props.theme.fontWeight.semiBold};
    text-transform:uppercase
`;

export const UploadStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid ${themeColors?.newtral};
    border-radius: 8px;
    margin-top: 20px;
`;

export const FileInfoRow = styled.div`
  display: flex;
  align-items: center;
`;


export const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const UploadingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UploadingText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatusInfo = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.light};
  color:${themeColors?.primary};
  font-size:12px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ProgressContainer = styled.div`
  margin-top: 8px;
`;