import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import AllCategories from '../allcatgories/AllCategories';
import NoCategories from '../nocategories/NoCategories';

import { fetchHelpdeskCategories } from '@/modules/knowledge-base/store/helpdeskCategorySlice'; // đảm bảo path đúng
import { RootState } from '@/core/store';
import { useAppDispatch } from '@/shared/hooks';

const CategoryComponent = () => {
  const dispatch = useAppDispatch();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.helpdeskCategory
  );

  useEffect(() => {
    dispatch(fetchHelpdeskCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {categories.length > 0 ? <AllCategories /> : <NoCategories />}
    </>
  );
};

export default CategoryComponent;
