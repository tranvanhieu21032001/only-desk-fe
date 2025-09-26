// KnowledgeBaseTab.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import * as S from '../InboxDetail.styles';
import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { RootState, AppDispatch } from '@/core/store';

interface KnowledgeBaseTabProps {
  t: (key: string) => string;
  knowledgeKeyword?: string;
  setInputValue: (value: string) => void;
  setActiveTab: (tab: string | null) => void;
}

const KnowledgeBaseTab: React.FC<KnowledgeBaseTabProps> = ({
  t,
  knowledgeKeyword,
  setInputValue,
  setActiveTab,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.helpdeskCategory
  );

    
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if(!categories || categories.length ===0){
      dispatch(fetchHelpdeskCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (knowledgeKeyword && knowledgeKeyword.trim().length > 0) {
      setIsFiltering(true);
      const timeout = setTimeout(() => setIsFiltering(false), 300);
      return () => clearTimeout(timeout);
    } else {
      setIsFiltering(false);
    }
  }, [knowledgeKeyword]);

  const allArticles = categories.flatMap((cat) => {
    const catArticles = (cat.articles || []) as any[];
    const sectionArticles =
      (cat.sections?.flatMap((sec) => sec.articles || []) as any[]) || [];
    return catArticles.concat(sectionArticles).map((article) => ({
      ...article,
      categoryName: cat.name,
    }));
  });
  
  const filteredArticles = knowledgeKeyword
    ? allArticles.filter((a) =>
        a.title.toLowerCase().includes(knowledgeKeyword.toLowerCase())
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
              const textToInsert = `<${article?.url} | ${article.title}>`;
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
};

export default KnowledgeBaseTab;
