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
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  .ant-form-item {
    margin-bottom: 0px;
    width: 100%;

    .ant-select {
      height: fit-content;

      .ant-select-selector {
        height: 39px;
        min-height: 39px;
      }
    }
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    padding: 0 8px;
    background-color: ${(props) => props?.theme?.colors?.newtralLighter};
  }
`;
