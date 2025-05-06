import Input from '@/shared/components/common/Input';

import styled from 'styled-components';

export const SearchContainer = styled.section``;

export const SearchInputWrap = styled.div`
  height: fit-content;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.newtral};
`;

export const SearchInput = styled(Input)`
  border: none;
  padding: 0px;
  height: 29px;
  border-radius: 0px;

  &:not(:disabled):hover {
    border: none !important;
  }

  &.ant-input-affix-wrapper-focused {
    border: none !important;
  }

  .ant-input-prefix {
    margin-right: 12px;
  }
`;

export const SearchTabs = styled.div`
  position: relative;

  .ant-tabs-nav {
    margin-bottom: 24px;
  }

  .ant-tabs-tab {
    &:not(:first-child) {
      margin-left: 24px;
    }

    &:first-child {
      margin-left: 12px;
    }

    p {
      color: ${({ theme }) => theme?.colors?.newtralDark};
    }

    &:hover {
      p {
        color: ${({ theme }) => theme?.colors?.primary};
      }

      svg path {
        fill: #253a8e;
      }
    }
  }

  .ant-tabs-tab-active {
    p {
      color: ${({ theme }) => theme?.colors?.primary};
    }

    svg path {
      fill: #253a8e;
    }
  }

  .ant-tabs-ink-bar-animated {
    background-color: #253a8e;
  }
`;

export const LabelTab = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  div {
    display: flex;
  }
`;

export const SearchCount = styled.div`
  position: absolute;
  right: 0;
  top: 12px;

  p {
    color: ${({ theme }) => theme?.colors?.newtralDark};
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    position: static;
    margin-top: 12px;
  }
`;
