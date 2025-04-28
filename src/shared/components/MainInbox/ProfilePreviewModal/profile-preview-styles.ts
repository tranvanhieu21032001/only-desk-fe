import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

export const Panel = styled.div`
  position: fixed;
  padding: 12px 24px;
  top: 0;
  right: 24px;
  width: 660px;
  height: calc(100vh - 24px);
  margin-top: 12px;
  margin-bottom: 12px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const Header = styled.div`
  position: relative;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
`;

export const Title = styled.p`
  font-size: 18px;
  line-height: 29px;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
`;

export const ModalColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: #999;
  margin: 4px 0 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  font-size: 22px;
  border: none;
  cursor: pointer;
  color: #666;
`;

export const Body = styled.div`
  padding: 10px 0;
  flex: 1;
  overflow-y: auto;
`;

export const Footer = styled.div`
  border-top: 1px solid #eee;
  padding: 12px;
  display: flex;
  justify-content: end;
  gap: 8px;
`;

export const BackButton = styled.button`
  flex: 1;
  background: #f3f3f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #333;

  &:hover {
    background: #e6e6e6;
  }
`;

export const PrimaryButton = styled.button`
  flex: 1;
  background: #1e40af;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #1a3a9d;
  }
`;
