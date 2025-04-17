import styled from "styled-components";

export const MenuContainer = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  background: #fafafa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MenuTitle = styled.p`
  font-size: 18px;
  line-height: 29px;
  font-weight: 600;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 6px 0;
`;

export const Badge = styled.div`
  background: #e0e0e0;
  color: #555;
  font-size: 12px;
  border-radius: 12px;
  padding: 2px 6px;
  margin-left: auto;
`;

export const Underline = styled.div`
  border-top: 1px solid #ddd;
  margin: 6px 0;
`;

export const Divider = styled.div`
  border-top: 1px dashed #ddd;
  margin: 6px 0;
`;
