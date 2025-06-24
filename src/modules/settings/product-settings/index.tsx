import React from 'react'

import BrandCollection from './brands/list'
import CategoryCard from './category/list'
import UnitTypeCard from './unit-types/list'
import UnitsList from './units/list'

const ProductSettingsComp = (): JSX.Element => {
  return (
    <>
      <BrandCollection />
      <CategoryCard />
      <UnitTypeCard />
      <UnitsList />
    </>
  )
}

export default ProductSettingsComp
