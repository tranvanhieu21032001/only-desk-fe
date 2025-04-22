import styled from "styled-components";

interface MessageContainerProps {
  isSidebarOpen: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafafa;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #eee;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Info = styled.div`
  margin-left: 8px;
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

export const MarkResolvedButton = styled.button`
  background: #389e0d;
  height: 36px;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const DateDivider = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 12px;
  margin: 16px 0;
`;

export const MessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
`;

export const MessageRowUser = styled(MessageRow)`
  justify-content: flex-end;
`;

export const MessageAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const MessageColumnView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MessageBubbleLeft = styled.div`
  background: white;
  padding: 8px 12px;
  border-radius: 12px;
  margin: 0 8px 0 0;
  max-width: 300px;
`;

export const MessageBubbleRight = styled(MessageBubbleLeft)`
  background: #eef2f8;
`;

export const MessageTime = styled.div`
  font-size: 10px;
  margin-right: 8px;
  color: #aaa;
`;

export const Footer = styled.div`
  background: white;
  padding: 8px 16px;
  border-top: 1px solid #eee;
`;

export const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  position: relative;
  padding: 0 12px;

  img,
  svg {
    width: 16px;
    height: 16px;
    position: relative;
    top: -3px;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 25%;
    height: 50%;
    width: 1px;
    background: #ccc;
  }
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  background: #eef2f8;
  border-radius: 8px;
  padding: 8px 12px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
`;

export const InputIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputIcon = styled.div`
  cursor: pointer;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleSidebarButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

export const MessageContainer = styled.div<MessageContainerProps>`
  flex: ${({ isSidebarOpen }) => (isSidebarOpen ? 2 : 1)};
  padding: 16px;
  overflow-y: auto;
  background: #fafafa;
  transition: flex 0.3s;
`;

export const Sidebar = styled.div`
  width: 320px;
  background: white;
  border-left: 1px solid #eee;
  padding: 16px;
  overflow-y: auto;
  transition: all 0.3s;
`;

export const MessageAvatarWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const MessageSenderName = styled.div`
  font-size: 12px;
  color: #333333;
  font-weight: 600;
`;
