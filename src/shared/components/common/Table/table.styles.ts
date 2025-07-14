import { Pagination, Skeleton, Table } from 'antd';

import Select from '../Select';
import Button from '../Button';

import styled, { css } from 'styled-components';

export const TableContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TableWrap = styled(Table)<{ $isWidth: string | number }>`
  table {
    border-radius: 0px;
  }
  overflow-y: auto;

  .ant-table-header {
    border-radius: 0 !important;
  }

  .ant-table,
  .ant-table-container,
  .ant-table-content,
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    border-radius: 0 !important;
    border: none !important;
    vertical-align: middle;
  }

  tbody {
    tr,
    td,
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    tr {
      td {
        &.ant-table-cell {
          padding: 12px !important;
        }
      }

      &.ant-table-row-selected {
        /* background-color: ${({ theme }) =>
          theme.colors.secondaryLight} !important; */
      }
    }
  }

  th {
    vertical-align: middle;

    background-color: ${({ theme }) => theme.colors.newtralLighter} !important;
    padding: 12px !important;

    color: ${({ theme }) => theme.colors.primary} !important;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold} !important;
    font-size: ${({ theme }) => theme.fontSize.base} !important;
    line-height: 20px !important;
    letter-spacing: 0.28px;
  }

  .ant-table-column-sorter {
    svg {
      color: ${({ theme }) => theme.colors.newtralLightest};
    }

    .active {
      svg {
        color: ${({ theme }) => theme.colors.primary} !important;
      }
    }
  }

  td {
    vertical-align: middle;
    /* background-color: ${({ theme }) =>
      theme.colors.newtralLightest} !important; */

    font-weight: ${({ theme }) => theme.fontWeight.regular} !important;
    font-size: ${({ theme }) => theme.fontSize.base} !important;
    line-height: 20px !important;
    color: #333333;

    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      cursor: pointer;
    }
  }

  .ant-checkbox {
    &:hover {
      .ant-checkbox-inner {
        border-color: ${({ theme }) => theme?.colors?.secondary} !important;
      }
    }
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner:after {
    background-color: ${({ theme }) => theme?.colors?.primary};
  }

  .ant-checkbox-inner {
    box-shadow: 0px 2px 2px 0px #1b1c1d1f;
    border: 1px solid ${({ theme }) => theme?.colors?.newtral};
    background-color: ${({ theme }) =>
      theme?.colors?.newtralLightest} !important;
  }

  .ant-table-row.ant-table-row-selected > .ant-table-cell {
    background-color: ${({ theme }) => theme.colors.secondaryLight} !important;
  }
`;

export const PaginationWrap = styled.div`
  padding: 12px;

  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-end;
`;

export const PaginationContent = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: end;

  .ant-pagination-item {
    border-radius: ${(props) => props?.theme?.radius?.normalRadius};
    border: 1px solid #e4e8ee;
    background: ${(props) => props?.theme?.colors?.newtralLightest};
    min-width: 39px;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: #5c5c5c;
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme?.fontWeight?.regular};
    }
  }

  .ant-pagination-item-active {
    background: #253a8e;
    border-color: #253a8e !important;

    a {
      font-weight: ${({ theme }) => theme?.fontWeight?.semiBold};
      color: ${(props) => props?.theme?.colors?.newtralLightest};
    }

    &:hover {
      a {
        color: ${(props) => props?.theme?.colors?.newtralLightest};
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    display: none;
  }
`;

export const PageSizeWrap = styled(Select)`
  height: 32px;
  width: 130px !important;

  .ant-select-selector {
    border-color: ${(props) => props?.theme?.colors?.newtralLight} !important;

    .ant-select-selection-item {
      color: ${(props) => props?.theme?.colors?.primary} !important;
    }
  }
`;

export const SkeletonInput = styled(Skeleton.Input)<{
  $width?: number | string;
}>`
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;

export const JumpToPageWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const JumpToPage = styled(Button)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: none;
  box-shadow: none;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: ${(props) => props?.theme?.radius?.normalRadius};
    background-color: rgba(0, 0, 0, 0.06) !important;
    box-shadow: none !important;
  }
`;

export const PagePercentPageSize = styled.div`
  margin-right: 24px;

  p {
    color: #5c5c5c;
  }
`;
