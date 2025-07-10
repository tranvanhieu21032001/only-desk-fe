import { Tooltip } from 'antd';

import { css, styled } from 'styled-components';

export const ContactTableContainer = styled.section`
  margin-top: 24px;
  height: calc(100% - 74px);
`;

export const TooltipColumn = styled(Tooltip)`
  svg {
    cursor: pointer;
    color: ${(props) => props?.theme?.colors?.newtralLight};
  }
  p {
    font-size: 13px !important;
  }
`;

export const RemoveActionColumn = styled.div`
  svg {
    cursor: pointer;
    color: ${(props) => props?.theme?.colors?.newtralLight};
  }
`;

export const FullNameColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    object-fit: cover;
    border-radius: 100px;
    min-width: 40px;
  }

  p {
    display: inline !important;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const LocationColumn = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ScoreColumn = styled.div`
  .ant-rate-star {
    margin-inline-end: 2px !important;
  }
`;

export const FilterActionWrap = styled.div`
  width: fit-content;
  height: fit-content;
`;

export const FilterAction = styled.div<{ $isRemove?: boolean }>`
  padding: 8px;
  cursor: pointer;
  border-radius: ${(props) => props?.theme?.radius?.smallRadius};

  gap: 6px;
  display: flex;
  align-items: center;

  ${({ $isRemove }) =>
    $isRemove &&
    css`
      svg {
        color: ${(props) => props?.theme?.colors?.errorDark};
      }
    `}

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};
  }

  div {
    height: 24px;
  }
`;

export const SegmentColumn = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Segment = styled.div`
  padding: 2px 8px;
  border-radius: 6px;
  background-color: ${(props) => props?.theme?.colors?.newtralLighter};
  width: fit-content;

  p {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: block !important;
  }
`;
