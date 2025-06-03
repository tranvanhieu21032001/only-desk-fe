import styled from 'styled-components';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

export const WrapModal = styled.div``;

export const ModalHeader = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 12px 12px 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.newtral};

  @media ${(props) => props.theme.breakpoints.mdMax} {
    padding: 12px;
  }
`;

export const ModalHeaderContent = styled.div``;

export const ModalDescription = styled.div`
  p {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

export const ModalBody = styled.div`
`;

export const ModalStepContent = styled.div`
  padding:0 48px
`;

export const ModalStepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 173px;
  position: relative;
`;

export const StepItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 0 10px;
  cursor: pointer;

  font-weight: ${({ active }) => (active ? fontWeight.semiBold : fontWeight.medium)};
  color: ${({ active, theme }) => (active ? '#253A8E' : theme.colors.newtralLight)};

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 16px;
    left: 100%;
    width: 100px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.newtral};
    z-index: 0;
  }

  &:not(:first-child)::before {
    content: "";
    position: absolute;
    top: 16px;
    right: 100%;
    width: 100px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.newtral};
    z-index: 0;
  }
`;

export const ModalFooter = styled.div`
  padding: 12px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.colors.newtral};

  > div {
    display: flex;
    align-items: center;
  }

  > div:first-child {
    gap: 8px;
  }

  .button-group {
    gap: 8px;
  }

  .button-group > button {
    width: fit-content;
  }

  .button-group > button > span >span {
    gap: 8px;
  }
`;


