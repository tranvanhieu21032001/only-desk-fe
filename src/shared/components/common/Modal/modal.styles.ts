import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.p`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const ModalDescription = styled.p`
  font-size: 12px;
  line-height: 20px;
  color: #888;
  font-weight: 400;
`;

export const Footer = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #e0e0e0;     
  justify-content: flex-end;
`;

export const Button = styled.button`
  background: #1e266d;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ModalChildren = styled.div`
  padding: 14px;    
`;

export const ModalHeader = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;     
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;

export const CancelButton = styled.button`
  background: white;
  border: 1px solid #ccc;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  margin-right: 8px;
  cursor: pointer;
`;

export const OkButton = styled.button`
  background: #1677ff;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
`;

