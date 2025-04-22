import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: rgb(235, 241, 246);
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
  padding: 4px;
  background-color: #edf1f8;
  display: flex;
  overflow: hidden;
`;
