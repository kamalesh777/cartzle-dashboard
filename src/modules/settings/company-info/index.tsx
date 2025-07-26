import React from 'react'

import { useSelector } from 'react-redux'

import type { RootState } from '@/store/index'

import BrandConfig from './BrandConfig'
import CompanyProfileComp from './CompanyProfile'
import DomainConfig from './DomainConfig'

const CompanyInfoComp = (): JSX.Element => {
  const { details, isLoading } = useSelector((state: RootState) => state.company)

  return (
    <>
      <BrandConfig isLoading={isLoading} data={details?.company} />
      <DomainConfig isLoading={isLoading} data={details?.company} />
      <CompanyProfileComp isLoading={isLoading} data={details?.company} />
    </>
  )
}

export default CompanyInfoComp
