import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  width: 100%;
`;

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.div<{
  $active: boolean;
  $completed: boolean;
}>`
  width: ${({ $completed }) => ($completed ? '44px' : '40px')};
  height: ${({ $completed }) => ($completed ? '44px' : '40px')};
  border-radius: 50%;
  color: ${({ $completed, $active }) =>
    $completed ? 'white' : $active ? '#1A73E8' : '#999'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: ${({ $completed }) => ($completed ? '24px' : '20px')};
  background: none;

  img,
  svg {
    width: ${({ $completed }) => ($completed ? '28px' : '20px')};
    height: ${({ $completed }) => ($completed ? '28px' : '20px')};
    transition:
      width 0.2s,
      height 0.2s;
  }
`;

export const CheckIconWrapper = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  img,
  svg {
    width: ${({ $completed }) => ($completed ? '28px' : '20px')};
    height: ${({ $completed }) => ($completed ? '28px' : '20px')};
    transition:
      width 0.2s,
      height 0.2s;
  }
`;

export const Connector = styled.div<{ $active: boolean; $completed?: boolean }>`
  position: absolute;
  width: 224px;
  height: 2px;
  background-color: ${({ $active }) => ($active ? '#2ecc40' : '#E0E0E0')};
  top: 50%;
  left: 162%;
  transform: translateY(-50%);
  z-index: 1;
`;

export const Label = styled.div<{ $active: boolean }>`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ $active }) => ($active ? '#253A8E' : '#757575')};
  font-weight: 600;
`;

export const Content = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #333;
`;
