import styled from 'styled-components';

export const ContextMenu = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
`;

export const ContextMenuItem = styled.div<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ danger }) => (danger ? '#ff4d4f' : '#000')};
    gap:4px;
  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    line-height: unset !important;
  }
  .ant-image {
  display: flex;
  align-items: center;
    line-height: unset !important;
  }

  &:hover {
    background: ${({ danger }) => (danger ? '#fff1f0' : '#f5f5f5')};
  }
`;

export const ContextMenuSeparator = styled.div`
  height: 1px;
  background: #e8e8e8;
  margin: 4px 0;
`;
