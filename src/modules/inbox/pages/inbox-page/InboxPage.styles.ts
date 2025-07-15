import styled from "styled-components";

export const InboxWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 0;
  position: relative;
`;

export const CustomSplitter = styled.div`
  height: 100%;
  width: 100%;

  .ant-splitter-horizontal
    > .ant-splitter-bar
    .ant-splitter-bar-dragger::after {
    height: 0px;
    width: 0px;
    display: none !important;
  }
`;

export const InboxList = styled.div`
  height: 100%;
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
  height: 100%;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Skeleton styled components
export const SkeletonMessageRow = styled.div<{ $isAgent: boolean }>`
  display: flex;
  margin-bottom: 16px;
  justify-content: ${({ $isAgent }) => $isAgent ? 'flex-end' : 'flex-start'};
`;

export const SkeletonAgentMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const SkeletonAgentBubble = styled.div`
  max-width: 280px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 18px 18px 4px 18px;
  margin-bottom: 4px;
`;

export const SkeletonGuestMessage = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

export const SkeletonGuestAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

export const SkeletonGuestContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SkeletonGuestBubble = styled.div`
  max-width: 280px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 18px 18px 18px 4px;
  margin-bottom: 4px;
`;

export const SkeletonText = styled.div<{ $width?: string; $backgroundColor?: string }>`
  width: ${({ $width }) => $width || '100px'};
  height: 14px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#ddd'};
  border-radius: 2px;
`;

export const SkeletonTime = styled.div`
  font-size: 12px;
  color: #999;
`;