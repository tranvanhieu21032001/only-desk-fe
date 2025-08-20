import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { TabContentProps } from '../../interfaces/inbox';

import * as S from './InboxDetail.styles';
import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/core/store';

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  INBOX_TABS,
  shortcuts,
  shortcutsLoading,
  shortcutsListRef,
  setInputValue,
  setActiveTab,
  inputRef,
  inputValue,
  setSelectedReminder,
  t,
  knowledgeKeyword,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  switch (activeTab) {
    case INBOX_TABS.SHORTCUTS:
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

    case INBOX_TABS.NOTE:
      return null;

    case INBOX_TABS.REMINDER:
      return (
        <S.TabPanel data-tab-panel="true">
          <S.TabTitle>{t('inboxDetail.reminder')}</S.TabTitle>
          <S.ShortcutItem>
            <p>{t('inboxDetail.reminder1')}</p>
          </S.ShortcutItem>
          <S.ShortcutItem>
            <p>{t('inboxDetail.reminder2')}</p>
          </S.ShortcutItem>
          <S.ShortcutItem
            onClick={() => {
              const reminderText = '12:00 20/04/2025';
              setInputValue((prev) => prev + reminderText);
              setSelectedReminder('12:00 20/04/2025');
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.selectionStart =
                    inputRef.current.selectionEnd = (
                      inputValue + reminderText
                    ).length;
                }
              }, 0);
            }}
          >
            <p>{t('inboxDetail.reminderTomorrow')}</p>
          </S.ShortcutItem>
        </S.TabPanel>
      );

    case INBOX_TABS.KNOWLEDGE_BASE:
      useEffect(() => {
        dispatch(fetchHelpdeskCategories());
      }, [dispatch]);

      const { categories, loading: categoriesLoading } = useSelector(
        (state: RootState) => state.helpdeskCategory,
      );

      const allArticles = categories.flatMap((cat) => {
        const catArticles = (cat.articles || []) as any[];
        const sectionArticles =
          (cat.sections?.flatMap((sec) => sec.articles || []) as any[]) || [];
        return catArticles.concat(sectionArticles).map((article) => ({
          ...article,
          categoryName: cat.name,
        }));
      });

      const [isFiltering, setIsFiltering] = useState(false);

      useEffect(() => {
        if (activeTab === INBOX_TABS.KNOWLEDGE_BASE) {
          if (knowledgeKeyword && knowledgeKeyword.trim().length > 0) {
            setIsFiltering(true);
            const timeout = setTimeout(() => {
              setIsFiltering(false);
            }, 300);
            return () => clearTimeout(timeout);
          } else {
            setIsFiltering(false);
          }
        }
      }, [knowledgeKeyword, activeTab]);
      const filteredArticles = knowledgeKeyword
        ? allArticles.filter((a) =>
            a.title.toLowerCase().includes(knowledgeKeyword.toLowerCase()),
          )
        : allArticles;

      return (
        <S.TabPanel data-tab-panel="true">
          <S.TabTitle>{t('inboxDetail.knowledgeBase')}</S.TabTitle>

          {(categoriesLoading || isFiltering) && (
            <S.NoShortcutsFound>
              <LoadingOutlined spin style={{ fontSize: 16, color: '#666' }} />
            </S.NoShortcutsFound>
          )}

          {!categoriesLoading &&
            !isFiltering &&
            filteredArticles.map((article) => (
              <S.ShortcutItem
                key={article.id}
                onClick={() => {
                  const textToInsert = `${article.title} - <https://example.com|Example website>`;
                  setInputValue(textToInsert);
                  setActiveTab(null);
                }}
              >
                <S.KnowBaseItem>{article.categoryName}</S.KnowBaseItem>
                <p>{article.title}</p>
              </S.ShortcutItem>
            ))}

          {!categoriesLoading &&
            !isFiltering &&
            filteredArticles.length === 0 && (
              <S.NoShortcutsFound>No articles found</S.NoShortcutsFound>
            )}
        </S.TabPanel>
      );

    default:
      return null;
  }
};

export default TabContent;
