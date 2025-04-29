import styled from "styled-components";

import { DEFAULT_RESIZER_CONFIG } from "@/core/settings/constants";

export const InboxWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 0;
  position: relative;
`;

export const InboxList = styled.div<{ width: number }>`
  width: ${props => props.width}px;
  min-width: ${DEFAULT_RESIZER_CONFIG.MIN_WIDTH}px;
  max-width: ${DEFAULT_RESIZER_CONFIG.MAX_WIDTH}px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  transition: width 0.1s ease;
`;

export const InboxDetail = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1rem;
`;

export const InboxProfile = styled.div`
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #ddd;
  padding: 1rem;
  overflow-y: auto;
`;

export const DetailAndSidebarWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 3px;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 320px;
  background: white;
  border-left: 1px solid #eee;
  padding: 16px;
  overflow-y: auto;
  transition: all 0.3s;
`;

export const InboxDetailWrapper = styled.div<{ isSidebarOpen: boolean }>`
  flex: ${({ isSidebarOpen }) => (isSidebarOpen ? 2 : 1)};
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;