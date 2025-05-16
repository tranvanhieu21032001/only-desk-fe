import styled from 'styled-components';

export const WrapModal = styled.div``;

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

export const ModalBody = styled.div`
  padding: 24px 48px 0;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    padding: 12px;
  }
`;

export const ModalFooter = styled.div`
  padding: 12px 24px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  button {
    width: fit-content;
  }
`;
