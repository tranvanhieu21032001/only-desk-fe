import React, { useEffect, useState, useRef, useCallback } from 'react';
import { List, Spin } from 'antd';

import { getShortcutsList } from '@/modules/settings/api/chatbox';
import type { Shortcut } from '@/modules/settings/models/chatbox.model';

import * as S from './ShortcutsList.styles';

interface ShortcutsListProps {
  keyword?: string;
  onSelectShortcut: (shortcut: Shortcut) => void;
}

const ShortcutsList: React.FC<ShortcutsListProps> = ({ keyword = '', onSelectShortcut }) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const fetchShortcuts = useCallback(async (pageNum: number, searchKeyword: string) => {
    try {
      setLoading(true);
      const response = await getShortcutsList({
        page: pageNum,
        limit: 10,
        keyword: searchKeyword,
      });
      
      if (pageNum === 1) {
        setShortcuts(response.data);
      } else {
        setShortcuts(prev => [...prev, ...response.data]);
      }
      
      setHasMore(response.hasNextPage);
    } catch (error) {
      console.error('Error fetching shortcuts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setShortcuts([]);
    fetchShortcuts(1, keyword);
  }, [keyword, fetchShortcuts]);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
        fetchShortcuts(page + 1, keyword);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, keyword, fetchShortcuts]);

  return (
    <S.ShortcutsListContainer>
      <List
        dataSource={shortcuts}
        renderItem={(item, index) => (
          <List.Item
            ref={index === shortcuts.length - 1 ? lastElementRef : undefined}
            onClick={() => onSelectShortcut(item)}
          >
            <S.ShortcutItem>
              <S.ShortcutText>{item.shortcut}</S.ShortcutText>
              <S.ShortcutMessage>{item.message}</S.ShortcutMessage>
            </S.ShortcutItem>
          </List.Item>
        )}
      />
      {loading && (
        <S.LoadingContainer>
          <Spin size="small" />
        </S.LoadingContainer>
      )}
    </S.ShortcutsListContainer>
  );
};

export default ShortcutsList; 