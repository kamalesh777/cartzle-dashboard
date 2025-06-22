'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import ProductSettingsComp from '@/modules/settings/product-settings'

const ProductSettingsPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<ProductSettingsComp />} isScrollable />
}

export default ProductSettingsPage
