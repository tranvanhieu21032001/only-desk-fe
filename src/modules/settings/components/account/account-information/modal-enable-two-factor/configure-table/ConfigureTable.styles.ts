import styled from 'styled-components';

export const WrapContainer = styled.div`
  margin-top: 24px;
`;

export const ColumnContainer = styled.div`
  padding: 8px 12px;

  height: 100%;

  p {
    height: 100%;

    display: flex;
    align-items: center;
  }

  .ant-image {
    width: 100% !important;
    height: 100% !important;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ThreadContainer = styled.div`
  background-color: ${(props) => props?.theme?.colors?.newtralLighter};
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  .ant-col {
    p {
      padding: 12px;
    }
  }
`;

export const BodyContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;

  .ant-col {
    .ant-form-item {
      margin-bottom: 0px;
    }
  }
`;
