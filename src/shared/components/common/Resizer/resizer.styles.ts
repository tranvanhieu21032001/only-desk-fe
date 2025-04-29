import styled from 'styled-components';

export const ResizerBar = styled.div`
  width: 4px;
  background-color: #edf1f8;
  cursor: col-resize;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1890ff;
  }
  
  &.resizing {
    background-color: #1890ff;
  }
`;