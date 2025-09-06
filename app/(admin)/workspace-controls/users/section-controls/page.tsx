import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import SectionControlsComp from '@/modules/admin/user-controls/section-controls/list'

const SectionControlsPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<SectionControlsComp />} />
}

export default SectionControlsPage
