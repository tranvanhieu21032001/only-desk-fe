import { styled } from 'styled-components';

export const ChatboxWorkspaceContainer = styled.div`
  padding: 24px;
  height: 100%;
  border-radius: 8px 0 0 8px;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px;
    margin-bottom: 0px;
  }
`;

export const ChatboxMenuItem = styled.div<{ $isActive?: boolean }>`
  padding: 8px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  
  ${({ $isActive, theme }) =>
    $isActive &&
    `
      background-color: ${theme?.colors?.secondaryLight};
      p {
        color: ${theme?.colors?.secondaryDarker};
        font-weight: ${theme?.fontWeight?.semiBold} !important;
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
