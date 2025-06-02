import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { CardWrapper } from '@/components/Wrapper'

const ShopInfoPage = (): JSX.Element => {
  const MainComp = (
    <>
      <CardWrapper id="theme" title="Theme Config" styles={{ body: { height: '200px' } }} />
      <CardWrapper id="shop-details" className="mt-3" title="Brand Config" styles={{ body: { height: '200px' } }} />
    </>
  )
  return <DynamicPageLayout MainComp={MainComp} isScrollable />
}

export default ShopInfoPage
