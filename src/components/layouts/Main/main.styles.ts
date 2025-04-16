import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e4edf5;
`;

export const Sidebar = styled.div`
  width: 80px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;
