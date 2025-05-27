import styled from 'styled-components';
import { BellOutlined } from '@ant-design/icons';

interface IconProps {
  isActive?: boolean;
}
interface MessageContainerProps {
  isSidebarOpen: boolean;
}

export const Container = styled.div`
  position: relative;
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
  /* max-width: 70%; */
  word-break: break-word;
  white-space: pre-wrap;
`;

export const MessageBubbleRight = styled(MessageBubbleLeft)`
  background: #eef2f8;
  max-width: 70%;
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
    content: '';
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
  padding: 16px 2px 16px 16px;
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

export const TabPanel = styled.div`
  background: white;
  padding: 4px 16px;
  margin-bottom: 5px;
  border-top: 1px solid #eee;
`;

export const TabTitle = styled.div`
  font-size: 18px;
  line-height: 29px;
  font-weight: 600;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
`;

export const ShortcutItem = styled.div`
  color: #000;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
  font-size: 14px;

  p {
    font-size: 14px;
    line-height: 23px;
    font-weight: 400;
  }

  span {
    font-size: 14px;
    line-height: 23px;
    font-weight: 600;
  }

  &:hover {
    cursor: pointer;
    background-color: #1e2f97;
    padding: 8px 12px;
    border-radius: 8px;
    color: #fff;
  }
`;

export const KnowBaseItem = styled.div`
  width: 67px;
  height: 28px;
  color: #186ade;
  background-color: #e8f0fd;
  border: none;

  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
`;

export const IconProps = styled.div<IconProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  line-height: 20px;
  color: ${({ isActive }) => (isActive ? '#1e2f97' : '#aaa')};
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
    content: '';
    position: absolute;
    right: 0;
    top: 25%;
    height: 50%;
    width: 1px;
    background: #ccc;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const Input = styled.input<{ $hasEdit?: boolean }>`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  padding-left: ${(props) => (props.$hasEdit ? '110px' : '0')};
`;

export const EditToken = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background: #f0f4ff;
  border-radius: 6px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #1d4ed8;

  img {
    width: 14px;
    height: 14px;
  }

  span:first-of-type {
    font-weight: bold;
  }
`;

export const ReminderToken = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  border-radius: 6px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;

  img {
    width: 14px;
    height: 14px;
  }

  span:first-of-type {
    font-weight: bold;
  }
`;

export const ReminderBox = styled.div`
  background: #253a8e;
  border-radius: 6px;
  padding: 2px 8px;
  gap: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #fff;

  img,
  svg {
    width: 14px;
    height: 14px;
    position: relative;
    top: -2px;
  }
`;

export const RemoveTokenIcon = styled.span`
  font-weight: bold;
  cursor: pointer;
  color: #1d4ed8;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 16px;
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 16px;
`;

export const NewMessageNotice = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
`;

export const NewMessageIcon = styled(BellOutlined)`
  font-size: 32px;
  color: #1890ff;
  background: #fff;
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 2px 8px #0001;
  cursor: pointer;
`;

export const NewMessageNoticeButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 124px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #233e93;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px #0001;
  cursor: pointer;
  z-index: 10;
  gap: 8px;
  max-width: 90vw;
  .arrow-icon {
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 18px;
    height: 18px;
  }
`;

export const TypingIndicator = styled.div`
  background-color: #fff;
  color: #233e93;
  margin-bottom: 4px;
  margin-left: 15px;
`;

export const MessageImage = styled.div`
  max-width: 200px;
  max-height: 100%;
  border-radius: 8px;
  display: block;
  overflow: hidden;
  margin-bottom: 4px;
  margin-left: 0;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MessageImageLeft = styled.div`
  max-width: 200px;
  max-height: 100%;
  border-radius: 8px;
  display: block;
  overflow: hidden;
  margin-bottom: 12px;
  margin-left: 8px;
  margin-right: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const NoteBubbleRight = styled.div`
  background: #fef1d7;
  color: #333;
  padding: 10px 16px;
  border-radius: 12px;
  margin-left: auto;
  margin-bottom: 2px;
  max-width: 70%;
  font-weight: 500;
  font-size: 15px;
  display: inline-block;
`;

export const NoteMeta = styled.div`
  color: #faad14;
  font-size: 12px;
  text-align: right;
  margin-right: 8px;
  margin-bottom: 8px;
  font-style: italic;
`;
