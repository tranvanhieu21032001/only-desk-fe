import AllArticle from './allarticle/AllArticle';
import NoArticle from './no-article/NoArticle';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { Skeleton } from 'antd';

const ArticleComponent = () => {

  const { categories, loading } = useSelector(
    (state: RootState) => state.helpdeskCategory,
  );


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
