'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'

import StoreInfoComp from '@/modules/settings/company-info'

const CompanyInfoPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<StoreInfoComp />} isScrollable customTitle="Store Info" />
}

export default CompanyInfoPage
