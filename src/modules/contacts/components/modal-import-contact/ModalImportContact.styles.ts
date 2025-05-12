import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';
import { ImportProgressEnums } from '../../helpers/contact.enums';

export const WrapModal = styled.div``;

export const Warning = styled.div`
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  img {
    width: 64px;
    height: auto;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 24px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    padding: 12px;
  }
`;

export const ModalHeaderContent = styled.div``;

export const ModalContent = styled.div`
  padding: 24px 48px;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px 24px;
  }
`;

export const ModalDescription = styled.div`
  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
  }
`;

export const ModalFooter = styled.div`
  padding: 12px 24px;
  margin-top: 12px;
  border-top: 1px solid ${(props) => props?.theme?.colors?.newtral};

  button {
    width: fit-content;

    .anticon-plus-circle {
      width: 18px;
      height: 18px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

export const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IcProgress = styled.div<{
  $isActive?: ImportProgressEnums;
}>`
  .progress-icon {
    width: 32px;
    height: 32px;

    border-radius: 100px;
    border: 1px solid ${(props) => props?.theme?.colors?.newtral};

    display: flex;
    align-items: center;
    justify-content: center;

    div {
      height: 20px;
    }

    svg {
      color: ${(props) => props?.theme?.colors?.newtralLight};
    }
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      .progress-icon {
        border: none;
        background-color: ${(props) => props?.theme?.colors?.secondaryLight};
      }
    `}
`;

export const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 70%;
`;

export const Progress = styled.div<{
  $isDiver?: boolean;
  $isActive?: ImportProgressEnums;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  ${({ $isDiver }) =>
    $isDiver &&
    css`
      min-width: 25%;
      border-radius: 100px;
      border: 2px solid ${({ theme }) => theme.colors.newtral};

      margin-top: -22px;
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      p {
        color: #253a8e;
      }
    `}
`;

export const Description = styled.div`
  margin-top: 24px;

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    margin-top: 12px;
  }
`;
