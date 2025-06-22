import React from 'react'

import ShopDetailsComp from './ShopDetails'
import CategoryCardComp from './CategoryCardComp'
import BrandCollection from './BrandCollection'

const ProductSettingsComp = (): JSX.Element => {
  return (
    <>
      <BrandCollection />
      <CategoryCardComp />
      <ShopDetailsComp />
    </>
  )
}

export default ProductSettingsComp
