'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'

import CompanyInfoComp from '@/modules/admin/company-info'

const CompanyInfoPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<CompanyInfoComp />} isScrollable />
}

export default CompanyInfoPage
