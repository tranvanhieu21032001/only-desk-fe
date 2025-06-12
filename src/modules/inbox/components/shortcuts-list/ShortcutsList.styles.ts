import styled from 'styled-components';

export const ShortcutsListContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
`;

export const ShortcutItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ShortcutText = styled.div`
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
`;

export const ShortcutMessage = styled.div`
  color: #666;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
`; 