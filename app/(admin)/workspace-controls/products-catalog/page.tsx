'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import ProductSettingsComp from '@/modules/admin/product-settings'

const ProductSettingsPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<ProductSettingsComp />} isScrollable customTitle="Product Catalog" />
}

export default ProductSettingsPage
