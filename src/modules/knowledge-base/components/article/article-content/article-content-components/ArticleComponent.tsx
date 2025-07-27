import { useCallback, useEffect, useState } from 'react';
import AllArticle from './allarticle/AllArticle';
import NoArticle from './no-article/NoArticle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/core/store';
import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { Skeleton } from 'antd';
import { useModal } from '@/shared/hooks';

const ArticleComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { categories, loading } = useSelector(
    (state: RootState) => state.helpdeskCategory,
  );

  const loadCategories = useCallback(() => {
    dispatch(fetchHelpdeskCategories());
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  };

  const hasArticles = categories.some(
    (category) =>
      (category.articles && category.articles.length > 0) ||
      (category.sections &&
        category.sections.some(
          (section) => section.articles && section.articles.length > 0,
        )),
  );

  if (loading) {
    return (
      <div style={{ marginTop: 24 }}>
        <Skeleton active />
      </div>
    );
  }

  return <>{hasArticles ? <AllArticle /> : <NoArticle />}</>;
};

export default ArticleComponent;
