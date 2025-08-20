// ShortcutsTab.tsx
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import * as S from '../InboxDetail.styles';
interface ShortcutItemType {
  id: string;
  shortcut: string;
  message: string;
}

interface ShortcutsTabProps {
  shortcuts: ShortcutItemType[];
  shortcutsLoading: boolean;
  shortcutsListRef: React.RefObject<HTMLDivElement | null>;
  setInputValue: (value: string) => void;
  setActiveTab: (tab: string | null) => void;
}

const ShortcutsTab: React.FC<ShortcutsTabProps> = ({
  shortcuts,
  shortcutsLoading,
  shortcutsListRef,
  setInputValue,
  setActiveTab,
}) => {
  return (
    <S.TabPanel data-tab-panel="true">
      <S.TabTitle>Shortcuts</S.TabTitle>
      <S.ShortcutsList ref={shortcutsListRef}>
        {shortcuts.map((item) => (
          <S.ShortcutsItem
            key={item.id}
            onClick={() => {
              setInputValue(item.message);
              setActiveTab(null);
            }}
          >
            <span>{item.shortcut}</span>
            <p>{item.message}</p>
          </S.ShortcutsItem>
        ))}
        {shortcutsLoading && (
          <S.NoShortcutsFound>
            <LoadingOutlined spin style={{ fontSize: 16, color: '#666' }} />
          </S.NoShortcutsFound>
        )}
        {!shortcutsLoading && shortcuts.length === 0 && (
          <S.NoShortcutsFound>No shortcuts found</S.NoShortcutsFound>
        )}
      </S.ShortcutsList>
    </S.TabPanel>
  );
};

export default ShortcutsTab;
