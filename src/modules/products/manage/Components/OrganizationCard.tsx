import React, { useEffect, useState } from 'react'

import { Row } from 'antd'

import type { CategoryType } from '../types'

import { getRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'
import { CardWrapper, ColWrapper, FormItemWrapper, SelectWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { getSelectOption } from '@/utils/disableFunction'

const OrganizationCard = (): JSX.Element => {
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([])

  // fetch category
  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      try {
        const res = await getRequest('/api/category-list')
        if (res.data.success) {
          setCategoriesData(res.data.result)
        }
      } catch (error) {
        Toast('error', (error as Error).message)
      }
    }
    fetchCategory()
  }, [])
  return (
    <CardWrapper title={'Organization'} bottomBorder className="mb-3">
      <Row gutter={COMMON_ROW_GUTTER}>
        <ColWrapper md={12}>
          <FormItemWrapper name="category" label="Category" rules={requiredFieldRules}>
            <SelectWrapper options={getSelectOption(categoriesData, ['name', 'id'])} />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="brand" label="Brand">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="supplier" label="Supplier">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="type" label="Product Type">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>
    </CardWrapper>
  )
}

export default OrganizationCard
