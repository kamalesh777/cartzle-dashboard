import React from 'react'

import BrandCollection from './brands/list'
import CategoryCard from './category/list'
import UnitGroupCard from './unit-groups/list'
import UnitsList from './units/list'

const ProductSettingsComp = (): JSX.Element => {
  return (
    <>
      <BrandCollection />
      <CategoryCard />
      <UnitGroupCard />
      <UnitsList />
    </>
  )
}

export default ProductSettingsComp
