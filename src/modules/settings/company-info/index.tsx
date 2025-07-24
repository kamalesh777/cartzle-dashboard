import React from 'react'

import { useSelector } from 'react-redux'

import type { RootState } from '@/store/index'

import BrandConfig from './BrandConfig'
import CompanyProfileComp from './CompanyProfile'
import DomainConfig from './DomainConfig'

const CompanyInfoComp = (): JSX.Element => {
  const { details: data, isLoading } = useSelector((state: RootState) => state.company)

  return (
    <>
      <BrandConfig isLoading={isLoading} data={data} />
      <DomainConfig isLoading={isLoading} data={data} />
      <CompanyProfileComp isLoading={isLoading} data={data} />
    </>
  )
}

export default CompanyInfoComp
