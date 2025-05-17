import { styled } from 'styled-components';

export const Container = styled.section`
  padding: 12px;
  margin-top: 12px;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
`;

export const Header = styled.div`
  margin-bottom: 8px;
  padding: 11px 8px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContentWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    padding: 10px 8px 10px 0px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-of-type {
    min-width: 120px;
  }

  .ant-form-item {
    width: 100%;
    height: 39px;
    margin-bottom: 0px;

    display: flex;
    align-items: center;

    .ant-row {
      width: 100%;
    }

    .ant-select-selector {
      min-height: 39px;
      height: 39px;
    }

    .ant-select-arrow {
      margin-top: -10px;
    }
  }
`;
