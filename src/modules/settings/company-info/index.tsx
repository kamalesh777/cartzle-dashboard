import React, { useEffect } from 'react'

import type { CompanyFormValues } from '../account-settings/types'

import { useGetRequestHandler } from '@/hook/requestHandler'

import CompanyProfileComp from './CompanyProfile'
import DomainConfig from './DomainConfig'
import ThemeConfig from './ThemeConfig'

const CompanyInfoComp = (): JSX.Element => {
  const { fetchData, isLoading, data } = useGetRequestHandler<CompanyFormValues>()

  // fetch company details
  useEffect(() => {
    fetchData('/api/company-details')
  }, [])

  return (
    <>
      <ThemeConfig isLoading={isLoading} data={data} />
      <DomainConfig isLoading={isLoading} data={data} />
      <CompanyProfileComp isLoading={isLoading} data={data} />
    </>
  )
}

export default CompanyInfoComp
