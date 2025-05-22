import { styled } from 'styled-components';

export const Container = styled.section`
  padding: 12px;
  margin-top: 12px;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
`;

export const Header = styled.div`
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

export const HeaderWrap = styled.div`
  margin-bottom: 8px;
  padding: 11px 8px;

  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }
`;

export const HeaderActionWrap = styled.div`
  margin-bottom: 8px;
  padding: 11px 8px;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }

  svg {
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }
`;

export const Body = styled.div`
  margin-top: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  max-height: 180px;
  overflow-y: scroll;
`;

export const ContentWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    padding: 10px 8px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-of-type {
    min-width: 120px;
  }
`;

export const DataWrapContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DataWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .ant-select {
    height: 39px !important;

    .ant-select-selector {
      height: 39px !important;
      min-height: 39px !important;
    }
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  img {
    cursor: pointer;
  }
`;
