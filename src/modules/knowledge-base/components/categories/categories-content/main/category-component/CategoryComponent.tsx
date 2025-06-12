import React from 'react'
import AllCategories from '../allcatgories/AllCategories'
import NoCategories from '../nocategories/NoCategories'

const CategoryComponent = () => {
  return (
    <>
      {!true?<AllCategories/>:<NoCategories/>}
    </>
  )
}

export default CategoryComponent
