import { Col } from 'antd';

import styled from 'styled-components';

export const TabAllContainer = styled.section`
  max-height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }
`;

export const TabContent = styled(Col)``;

export const TabWrap = styled.div``;

export const TabSection = styled.div``;

export const TabLabel = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    gap: 6px;
    align-items: center;

    div {
      height: 20px !important;
    }

    svg path {
      fill: #253a8e;
    }
  }
`;

export const CountTab = styled.div``;

export const TabCardContentWrap = styled.div`
  margin-top: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ViewMoreResults = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    cursor: pointer;
    width: fit-content;
    color: ${({ theme }) => theme?.colors?.secondaryDarker};

    &:hover {
      text-decoration: underline;
    }
  }
`;
