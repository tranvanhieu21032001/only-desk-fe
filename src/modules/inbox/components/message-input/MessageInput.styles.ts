import styled from 'styled-components';

interface IconProps {
  isActive?: boolean;
}
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

// Reminder

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

export const FilePreviewWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const ImagePreviewBox = styled.div`
  position: relative;
  max-width: 70px;
  max-height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

export const ImagePreview = styled.div`
  max-width: 70px;
  max-height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;

export const PdfPreviewBox = styled.div`
  position: relative;
  width: 320px;
  height: 60px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px #eee;
  padding: 8px 16px;
`;

export const PdfIcon = styled.img`
  width: 40px;
  height: 48px;
  margin-right: 12px;
`;

export const PdfInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PdfInfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PdfFileName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

export const RemovePdfButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 12px;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const PdfStatus = styled.div`
  font-size: 13px;
  color: #444;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PdfCheckIcon = styled.img`
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 2px;
`;

export const PdfCompleted = styled.span`
  color: #219653;
  font-weight: 500;
`;

export const TokenBox = styled.div`
  background: #253a8e;
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  font-weight: 400;
  margin-right: 8px;
  gap: 4px;
`;

export const TokenIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

export const InputRow = styled.div`
  display: flex;
  padding: 8px 15px;
  align-items: center;
  background-color: #edf1f8;
  border-radius: 8px;
`;

export const InputIconsWrapper = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
  align-items: center;
  margin-left: 8px;
`;

export const SendMessageModalWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  padding: 20px 24px 16px 24px;
  width: 440px;
`;

export const SendMessageModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

export const SendMessageModalIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 0;
`;

export const SendMessageModalTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

export const SendMessageModalDesc = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding-left: 44px;
`;

export const SendMessageModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 12px;
`;

export const FooterPaddingLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
`;

export const SendMessageModalButton = styled.button`
  background: #253a8e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const SendMessageModalCheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SendMessageModalCheckbox = styled.input`
  width: 16px;
  height: 16px;
  appearance: checkbox;
  background: #fff;
  border: 1.5px solid #cfd8dc;
  border-radius: 4px;
  transition: box-shadow 0.2s;
  cursor: pointer;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  box-shadow: 0px 2px 2px 0px rgba(27, 28, 29, 0.12);

  &:checked {
    border: 1.5px solid #253a8e;
    background: #253a8e;
    box-shadow: 0px 2px 2px 0px rgba(27, 28, 29, 0.12);
  }
`;

export const SendMessageModalCheckboxLabel = styled.label`
  font-size: 13px;
  color: #444;
  cursor: pointer;
`;

export const SendMessageModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #233e93;
  font-weight: 600;
`;
