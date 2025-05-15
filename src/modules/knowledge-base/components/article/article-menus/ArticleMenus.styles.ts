import { Option } from 'antd/es/mentions';

import Select from '@/shared/components/common/Select';

import { css, styled } from 'styled-components';

export const CategoryContainer = styled.section`
  height: 100%;
  padding: 12px;
  border-radius: 8px 0 0 0;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 6px;
  }
`;

export const LabelCategories = styled.div`
  padding: 12px;

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 6px;
  }
`;

export const Categories = styled.div`
  padding: 0 12px 12px;

  gap: 4px;
  display: flex;
  flex-direction: column;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 0 6px;
  }
`;

export const CategoryWrap = styled.div<{ $isActive?: boolean }>`
  padding: 8px;
  cursor: pointer;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${(props) => props?.theme?.colors?.secondaryLight};

      p {
        color: ${(props) => props?.theme?.colors?.secondaryDarker};
        font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
      }
    `}

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};

    p {
      color: ${(props) => props?.theme?.colors?.secondaryDarker};
      font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
    }
  }
`;

export const Count = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props?.theme?.colors?.newtral};
  padding: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
    color: ${(props) => props?.theme?.colors?.newtralLight};
  }
`;

export const ChangeLang = styled(Select)`
  width: 100%;

  margin-bottom: 12px;

  .ant-select-selection-item {
    display: flex !important;

    align-items: center;
    gap: 8px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    margin-bottom: 0%;
  }
`;

export const SkeletonChangeLang = styled.div`
  width: 100%;
  margin-bottom: 12px;

  .ant-skeleton {
    width: 100%;
  }
`;

export const LangOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
