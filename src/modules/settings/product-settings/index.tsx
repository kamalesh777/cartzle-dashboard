import React from 'react'

import ShopDetailsComp from './ShopDetails'
import BrandCollection from './brands/list'
import CategoryCard from './category/list'

const ProductSettingsComp = (): JSX.Element => {
  return (
    <>
      <BrandCollection />
      <CategoryCard />
      <ShopDetailsComp />
    </>
  )
}

export default ProductSettingsComp
