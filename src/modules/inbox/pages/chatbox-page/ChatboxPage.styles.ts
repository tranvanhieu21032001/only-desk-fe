import styled from 'styled-components';

export const ChatboxWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f9fb;
`;

export const SettingsSidebar = styled.div`
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const SettingsTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
  padding-left: 32px;
`;

export const SettingsMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SettingsMenuItem = styled.div<{ active?: boolean }>`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#1a56db' : '#374151')};
  background: ${({ active }) => (active ? '#f1f5ff' : 'transparent')};
  border-left: 4px solid ${({ active }) => (active ? '#1a56db' : 'transparent')};
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
`;

export const ChatboxContent = styled.div`
  flex: 1;
  padding: 40px 48px;
  display: flex;
  flex-direction: column;
`;

export const ChatboxHeader = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 16px;
`;

export const ChatboxSubHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 24px;
`;

export const ShortcutBox = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ShortcutEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ShortcutImage = styled.div`
  width: 120px;
  height: 120px;
  background: url('/src/assets/icons/layout/ic-mockup-notification.svg')
    center/contain no-repeat;
  margin-bottom: 8px;
`;

export const ShortcutText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
`;

export const ShortcutDesc = styled.div`
  font-size: 14px;
  color: #9ca3af;
`;

export const AddShortcutButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: #1a56db;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(26, 86, 219, 0.08);
  transition: background 0.2s;
  &:hover {
    background: #174bb7;
  }
`;

export const SidebarWrap = styled.div`
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const ChatboxMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 0 0 0;
`;

export const ChatboxMenuItem = styled.div<{ $isActive?: boolean }>`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? '#1a56db' : '#374151')};
  background: ${({ $isActive }) => ($isActive ? '#f1f5ff' : 'transparent')};
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
  margin-right: 8px;
  &:hover {
    background: #f1f5ff;
    color: #1a56db;
  }
`;
