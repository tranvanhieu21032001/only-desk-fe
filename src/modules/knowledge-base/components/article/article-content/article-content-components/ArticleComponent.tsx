import React, { useEffect, useState } from 'react';
import AllArticle from './allarticle/AllArticle';
import NoArticle from './no-article/NoArticle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/core/store';
import { fetchHelpdeskArticles } from '@/modules/knowledge-base/store/helpdeskArticleSlice';
import { Skeleton } from 'antd';

const ArticleComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { items: articles, total, loading, error } = useSelector(
    (state: RootState) => state.helpdeskArticles
  );

  useEffect(() => {
    dispatch(fetchHelpdeskArticles({ page, limit: pageSize, status: 'published', lang: 'en' }));
    console.log("articles", articles);
    
  }, [dispatch, page, pageSize]);

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  };

  if (loading || error) return <div style={{ marginTop: 24 }}><Skeleton active /></div>;

  return (
    <>
      {articles?.length > 0 ? (
        <AllArticle
          articles={articles}
          currentPage={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
        />
      ) : (
        <NoArticle />
      )}
    </>
  );
};

export default ArticleComponent;
