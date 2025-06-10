
import Button from '@/shared/components/common/Button';
import styled from 'styled-components';
import { css } from 'styled-components';

export const UserAdminContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;


export const ContactsContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 12px;

  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const FilterWrap = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterPopoverWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const InputSearch = styled.div`
  width: 100%;
`;

export const ButtonFilter = styled(Button)`
  padding: 8px 12px;
  height: fit-content;
`;

export const ButtonAction = styled(Button)`
  padding: 8px 12px;
  height: fit-content;
`;

export const FilterActionWrap = styled.div``;

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
      p {
        color: ${(props) => props?.theme?.colors?.errorDark};
      }

      svg {
        color: ${(props) => props?.theme?.colors?.errorDark} !important;
      }
    `}

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};
  }

  div {
    height: 24px;

    svg {
      color: ${(props) => props?.theme?.colors?.newtralLight};
    }
  }
`;

export const ActionButton = styled.div`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  &:hover {
    background: #f5f5f5;
  }
`;