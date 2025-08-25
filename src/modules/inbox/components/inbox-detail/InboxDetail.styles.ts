import styled from 'styled-components';
import { BellOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';
import Button from '@/shared/components/common/Button';

interface IconProps {
  $isActive?: boolean;
}
interface MessageContainerProps {
  $isSidebarOpen: boolean;
}

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    overflow: hidden;
  }
  a{
    text-decoration: underline;
    color:#1677ff;
  }
    a:hover{
    text-decoration: underline;
    color:#0656c5;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
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

export const MarkResolvedButton = styled(Button)`
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
  img {
    padding-right: 4px !important;
  }
`;

export const MarkUnResolvedButton = styled(Button)`
  background: #fa541c;
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
  img {
    padding-right: 4px !important;
  }
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
  width: 100%;
`;

export const WrapperMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

export const MessageBubbleLeft = styled.div`
  background: white;
  padding: 8px 11px;
  border-radius: 12px;
  margin: 0 8px 0 0;
  /* max-width: 70%; */
  word-break: break-word;
  white-space: pre-wrap;
`;

export const MessageBubbleRight = styled(MessageBubbleLeft)`
  background: #eef2f8;
  max-width: 450px;
`;

export const MessageTime = styled.div`
  font-size: 9px;
  margin-right: 8px;
  color: #aaa;
  font-style: italic;
  min-width: 48px; /* Đảm bảo chiều rộng tối thiểu cho time */
  text-align: right;
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

export const MainContent = styled.div<{ $hasOverlay?: boolean }>`
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: ${({ $hasOverlay }) => ($hasOverlay ? 'hidden' : 'auto')};
`;

export const TabOverlay = styled.div<{ $tabtype?: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  width: 100%;
  z-index: 20;
  background: ${({ $tabtype }) =>
    $tabtype === 'Edit' || $tabtype === 'Note' ? 'transparent' : '#fff'};
  box-shadow: ${({ $tabtype }) =>
    $tabtype === 'Edit' || $tabtype === 'Note'
      ? 'none'
      : '0 2px 8px rgba(0,0,0,0.08)'};
  max-height: calc(40vh);
  overflow-y: auto;
  margin-bottom: 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .TabTitle {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
    border-bottom: 1px solid #eee;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

export const MessageContainer = styled.div<MessageContainerProps>`
  flex: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 2 : 1)};
  padding: 16px 2px 16px 16px;
  overflow-y: auto;
  background: #fafafa;
  transition: flex 0.3s;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
    transition: background 0.3s ease;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.primary};
  }
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
  width: 100%;
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

export const TabSubTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
`;

interface ShortcutItemProps {
  $selected?: boolean;
}

export const ShortcutItem = styled.div<ShortcutItemProps>`
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

  background-color: ${({ $selected }) =>
    $selected ? '#1e2f97' : 'transparent'};
  color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
  border-radius: ${({ $selected }) => ($selected ? '8px' : '0')};

  &:hover {
    cursor: pointer;
    background-color: #1e2f97;
    padding: 8px 12px;
    border-radius: 8px;
    color: #fff;
  }
`;

export const KnowBaseItem = styled.div`
  color: #186ade;
  background-color: #e8f0fd;
  border: none;
  padding: 2px 6px;
  width: fit-content;
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
  color: ${({ $isActive }) => ($isActive ? '#1e2f97' : '#aaa')};
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
  bottom: 14px;
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
  padding: 8px 12px;
  border-radius: 12px;
  margin: 0 8px 0 0;
  margin-left: auto;
  margin-right: 8px;
  font-size: 15px;
  line-height: 1.4;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const NoteMeta = styled.div`
  color: #faad14;
  font-size: 12px;
  text-align: right;
  margin-right: 8px;
  margin-bottom: 8px;
  font-style: italic;
`;

export const SystemMessage = styled.div`
  color: #233e93;
  font-size: 13px;
  text-align: center;
  margin: 20px 8px;
  font-style: italic;
`;

export const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* Remove padding that causes broad hover area */
`;

export const ShortcutsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  margin: 12px 0;
`;

export const ShortcutsItem = styled.div`
  cursor: pointer;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;

  p {
    color: #333333;
    font-size: 14px;
    line-height: 23px;
    font-weight: 400;
  }

  span {
    color: #333333;
    font-size: 14px;
    line-height: 23px;
    font-weight: 600;
  }

  &:hover {
    background-color: #253a8e;
    border-radius: 8px;

    p,
    span {
      color: #fff;
    }
  }
`;

// Trong InboxDetail.styles.ts
export const ContextMenu = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e5e5;
  overflow: hidden;
`;

export const ContextMenuItem = styled.div<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.danger ? '#ff4d4f' : '#333')};

  &:hover {
    background: ${(props) => (props.danger ? '#fff2f0' : '#f5f5f5')};
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export const TimeWithIconContainer = styled.div`
  display: flex;
  align-items: center;
  /* Remove padding that causes broad hover area */
`;

export const MessageHoverIconNearTime = styled.div`
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  opacity: 0.7;
  width: 20px; /* Reserve space */
  height: 20px; /* Reserve space */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export const MessageHoverIconPlaceholder = styled.div`
  width: 20px; /* Same size as icon */
  height: 20px;
  /* Invisible placeholder to reserve space */
`;

export const MessageTypeLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 5px;
  overflow: visible;
  background: none;
  flex-shrink: 0;
  margin-top: 8px;
`;

export const ContextMenuSeparator = styled.div`
  height: 1px;
  background-color: #f0f0f0;
  margin: 4px 0;
`;

export const SmallPopupMenu = styled.div`
  position: fixed;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  z-index: 2000;
  min-width: 140px;
`;

export const SmallPopupMenuItem = styled.div`
  padding: 8px 16px;
  font-size: 16px;
  color: #222;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

export const NoShortcutsFound = styled.div`
  text-align: center;
  padding: 12px;
  color: #aaa;
`;

export const AgentMessageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end; /* Change from center to flex-end to align to bottom */
  gap: 8px;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  /* Remove padding that causes broad hover area */
`;

export const GuestMessageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  width: 100%;
  /* Remove padding that causes broad hover area */
`;

export const NoteRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

// Spinner loading more messages at the top of message box
export const InboxSpinner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0 8px 0;
  background: #fafafa;
  z-index: 10;
  position: sticky;
  top: 0;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const DateSeparator = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 12px;
  margin: 16px 0;
`;

export const ImageWrapper = styled.div<{ isOwner?: boolean }>`
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: ${(p) => (p.isOwner ? '10px' : '12px')};
  overflow: hidden;
  width: 200px;
  &:hover div.overlay {
    opacity: 1;
  }
`;

export const StyledImage = styled.img<{ isOwner?: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  border-radius: ${(p) => (p.isOwner ? '10px' : '12px')};
  transition: transform 0.3s ease;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

export const Previewbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  .ant-splitter {
    line-height: unset;
  }
`;

export const MessageInputValue = styled.p`
  border-left: 3px solid #ccc;
  padding-left: 6px;
  margin-top: 10px;
  color: #555;
`;

export const MessageTimeBelow = styled.div`
  color: #aaaaaa;
  font-size: 10px;
  margin-right: 11px;
`;
