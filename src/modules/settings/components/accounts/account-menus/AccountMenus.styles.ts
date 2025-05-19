import { css, styled } from 'styled-components';

export const CategoryContainer = styled.section`
  padding: 24px;
  height: 100%;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px 12px;
    margin-bottom: 0px;
  }
`;

export const Categories = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    flex-direction: row;
    flex-wrap: wrap;
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
        font-weight: ${(props) =>
          props?.theme?.fontWeight?.semiBold} !important;
      }
    `}

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};

    p {
      color: ${(props) => props?.theme?.colors?.secondaryDarker};
      font-weight: ${(props) => props?.theme?.fontWeight?.semiBold} !important;
    }
  }
`;
