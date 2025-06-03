'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import ShopInfoComp from '@/modules/settings/shop-info'

const ShopInfoPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<ShopInfoComp />} isScrollable />
}

export default ShopInfoPage
