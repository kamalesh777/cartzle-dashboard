/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React from 'react'

import { Form, Tabs } from 'antd'

import type { ProductFormValueTypes } from '../types'

import type { PositionType } from './types'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, CardWrapper } from '@/components/Wrapper'
import { PRODUCT_LIST_ROUTE } from '@/constants/AppConstant'

import { useUnwantedReload } from '@/hook/useUnwantedReload'

import GeneralTab from './Components/GeneralTab'
import VariationTab from './Components/VariationTab'

// Product manage component
const ProductManageComp = (): JSX.Element => {
  const { setIsValueChanged } = useUnwantedReload()

  const [form] = Form.useForm()

  const tabsArray = [
    {
      label: 'General',
      key: 'general',
      children: <GeneralTab form={form} />,
    },
    {
      label: 'Variation',
      key: 'variation',
      children: <VariationTab form={form} />,
    },
  ]

  /** Form submit handler
   * @param formValue - Form values
   * @returns void
   * @description This function is called when the form is submitted
   */
  const formSubmitHandler = async (formValue: ProductFormValueTypes): Promise<void> => {
    const payload = {
      ...formValue,
    }
    console.log('===formValue', payload)
  }

  /** Operations slot */
  const OperationsSlot: Record<PositionType, React.ReactNode> = {
    left: <ButtonWrapper className="tabs-extra-demo-button">Cancel</ButtonWrapper>,
    right: <ButtonWrapper type="primary">Save</ButtonWrapper>,
  }

  /** Main component */
  const MAIN_COMP = (
    <>
      <Form layout="vertical" form={form} onFinish={formSubmitHandler} onValuesChange={() => setIsValueChanged(true)}>
        <CardWrapper>
          <Tabs centered defaultActiveKey="general" items={tabsArray} tabBarExtraContent={OperationsSlot} />
        </CardWrapper>
      </Form>
    </>
  )
  return <DynamicPageLayout MainComp={MAIN_COMP} goBackUrl={PRODUCT_LIST_ROUTE} hideTitle />
}

export default ProductManageComp
