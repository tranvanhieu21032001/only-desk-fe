import styled from 'styled-components';

export const CardFileUploadCsvContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: 12px;
  padding: 16px 16px 14px;

  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const InfoFileLeft = styled.div`
  display: flex;
  gap: 12px;

  width: 100%;
  max-width: 70%;
`;

export const InfoFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ant-image {
    width: 16px;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    margin-top: -8px;
  }
`;

export const Remove = styled.div`
  img {
    cursor: pointer;
  }
`;
