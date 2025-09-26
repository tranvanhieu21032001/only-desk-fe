import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import AllCategories from '../allcatgories/AllCategories';
import NoCategories from '../nocategories/NoCategories';

import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice';
import { RootState } from '@/core/store';
import { useAppDispatch } from '@/shared/hooks';
import { Skeleton } from 'antd';

const CategoryComponent = () => {
  const dispatch = useAppDispatch();

  const { categories, loading } = useSelector(
    (state: RootState) => state.helpdeskCategory
  );

  const loadCategories = useCallback(() => {
    dispatch(fetchHelpdeskCategories());
  }, [dispatch]);

useEffect(() => {
  if (!categories || categories.length === 0) {
    loadCategories();
  }
}, [categories, loadCategories]);


  if (loading) {
    return <div style={{ marginTop: 12 }}><Skeleton active paragraph={{ rows: 6 }} /></div>;
  }
  return (
    <>
      {categories.length > 0 ? (
        <AllCategories categories={categories} onReload={loadCategories} />
      ) : (
        <NoCategories onReload={loadCategories} />
      )}
    </>
  );
};

export default CategoryComponent;
