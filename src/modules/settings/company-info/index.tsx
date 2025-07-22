import React from 'react'

import CompanyProfileComp from './CompanyProfile'
import DomainConfig from './DomainConfig'
import ThemeConfig from './ThemeConfig'

const CompanyInfoComp = (): JSX.Element => {
  return (
    <>
      <ThemeConfig />
      <DomainConfig />
      <CompanyProfileComp />
    </>
  )
}

export default CompanyInfoComp
