'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'

import CompanyInfoComp from '@/modules/settings/company-info'

const CompanyInfoPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<CompanyInfoComp />} isScrollable customTitle="Company Info" />
}

export default CompanyInfoPage
